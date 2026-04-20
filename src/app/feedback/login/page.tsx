'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { MessageSquare, Loader2 } from 'lucide-react';
import { loginSchema } from '@/lib/validations/feedback';
import { feedbackApi } from '@/lib/feedback-api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type LoginFormValues = z.infer<typeof loginSchema>;

function FeedbackLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const projectId = searchParams.get('project');
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      projectId: projectId ? Number(projectId) : undefined,
    },
  });

  if (!projectId) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="w-full max-w-md border-zinc-800 bg-zinc-900">
            <CardContent className="pt-6 text-center">
              <MessageSquare className="mx-auto mb-4 h-12 w-12 text-zinc-500" />
              <p className="text-zinc-400">
                Enlace invalido. Contacta a tu agencia para obtener el enlace
                correcto de acceso.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  const onSubmit = async (data: LoginFormValues) => {
    setError(null);
    try {
      const result = await feedbackApi.login({
        email: data.email,
        password: data.password,
        projectId: data.projectId,
      });

      if (!result.success) {
        setError(result.error || 'Credenciales inválidas');
        return;
      }

      localStorage.setItem('feedback_token', result.data.token);
      localStorage.setItem('feedback_client', JSON.stringify(result.data.client));
      router.push('/feedback/review');
    } catch {
      setError('Error de conexion. Intenta de nuevo.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md"
      >
        <Card className="border-zinc-800 bg-zinc-900 shadow-2xl">
          <CardHeader className="items-center space-y-3 pb-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <MessageSquare className="h-5 w-5 text-amber-500" />
              </div>
              <span className="text-xl font-bold tracking-tight text-zinc-100">
                MAW Feedback
              </span>
            </div>
            <CardTitle className="text-lg text-zinc-200">
              Accede a tu proyecto
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Ingresa tus credenciales para revisar y comentar tu sitio web.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...register('projectId')} />

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Correo electronico
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-zinc-300">
                  Contrasena
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  autoComplete="current-password"
                  className="border-zinc-700 bg-zinc-800 text-zinc-100 placeholder:text-zinc-500 focus:border-amber-500/50 focus:ring-amber-500/20"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 text-zinc-950 hover:bg-amber-400 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Iniciar sesion
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

export default function FeedbackLoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center text-white">Cargando...</div>}>
      <FeedbackLoginContent />
    </Suspense>
  );
}
