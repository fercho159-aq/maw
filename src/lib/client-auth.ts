import { SignJWT, jwtVerify } from 'jose';

export interface ClientTokenPayload {
  clientAccessId: number;
  projectId: number;
  clientName: string;
}

const getSecret = () => {
  const secret = process.env.CLIENT_JWT_SECRET;
  if (!secret) throw new Error('CLIENT_JWT_SECRET is not set');
  return new TextEncoder().encode(secret);
};

export async function generateClientToken(payload: ClientTokenPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(getSecret());
}

export async function verifyClientToken(token: string): Promise<ClientTokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return {
      clientAccessId: payload.clientAccessId as number,
      projectId: payload.projectId as number,
      clientName: payload.clientName as string,
    };
  } catch {
    return null;
  }
}

export async function getClientFromRequest(req: Request): Promise<ClientTokenPayload | null> {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;
  const token = authHeader.slice(7);
  return verifyClientToken(token);
}
