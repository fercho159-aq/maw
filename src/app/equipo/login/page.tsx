
'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';
import Logo from '@/components/logo';
import { useAuth } from '@/lib/auth-provider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    const result = await login({ username, password });

    if ('error' in result) {
        toast({
            title: 'Error de Autenticación',
            description: result.error,
            variant: 'destructive',
        });
        setIsLoading(false);
    } else {
        toast({
            title: 'Inicio de Sesión Exitoso',
            description: `Accediendo como ${result.name}.`,
        });
        router.push('/equipo/dashboard');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                 <Logo />
            </div>
          <CardTitle>Acceso al Dashboard</CardTitle>
          <CardDescription>Introduce tus credenciales para continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuario</Label>
              <Input 
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="tu.usuario"
                required
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input 
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-foreground"></div>
                ) : (
                    <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Iniciar Sesión
                    </>
                )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
