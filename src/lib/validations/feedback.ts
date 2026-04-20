import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(1, 'La contraseña es requerida'),
  projectId: z.coerce.number().int().positive(),
});

export const createProjectSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido').max(255),
  siteUrl: z.string().url('URL inválida'),
});

export const updateProjectSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  siteUrl: z.string().url().optional(),
  status: z.enum(['active', 'paused', 'completed']).optional(),
});

export const createClientAccessSchema = z.object({
  clientName: z.string().min(1, 'El nombre es requerido').max(255),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

export const createCommentSchema = z.object({
  content: z.string().min(1, 'El comentario es requerido').max(2000, 'Máximo 2000 caracteres'),
  pageUrl: z.string().min(1),
  positionX: z.number().min(0).max(100),
  positionY: z.number().min(0).max(50000), // absolute px from document top
  scrollY: z.number().min(0),
  viewportWidth: z.number().int().positive(),
  viewportHeight: z.number().int().positive(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
});

export const updateCommentSchema = z.object({
  status: z.enum(['pending', 'in_progress', 'resolved', 'dismissed']).optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  adminNotes: z.string().max(5000).optional(),
});
