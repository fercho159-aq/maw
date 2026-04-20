'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import {
  Plus,
  Search,
  Globe,
  MessageSquareText,
  Users,
  CheckCircle2,
  Clock,
  Loader2,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { feedbackAdminApi } from '@/lib/feedback-admin-api';
import { createProjectSchema } from '@/lib/validations/feedback';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';

type CreateProjectData = z.infer<typeof createProjectSchema>;

interface Project {
  id: number;
  name: string;
  siteUrl: string;
  status: string;
  pendingCount?: number;
  resolvedCount?: number;
  totalComments?: number;
  clientCount?: number;
  createdAt: string;
}

const statusLabels: Record<string, string> = {
  active: 'Activo',
  paused: 'Pausado',
  completed: 'Completado',
};

const statusColors: Record<string, string> = {
  active: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
  paused: 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
  completed: 'bg-zinc-500/15 text-zinc-700 dark:text-zinc-400 border-zinc-500/30',
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Link href={`/equipo/dashboard/feedback/${project.id}`}>
        <Card className="h-full hover:shadow-md transition-shadow cursor-pointer group">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="text-base line-clamp-1 group-hover:text-primary transition-colors">
                {project.name}
              </CardTitle>
              <Badge
                variant="outline"
                className={statusColors[project.status] ?? statusColors.active}
              >
                {statusLabels[project.status] ?? project.status}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-1.5 truncate">
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{project.siteUrl}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-amber-500/10 p-2">
                <Clock className="w-4 h-4 mx-auto text-amber-600 dark:text-amber-400 mb-1" />
                <p className="text-lg font-bold">{project.pendingCount ?? 0}</p>
                <p className="text-[11px] text-muted-foreground">Pendientes</p>
              </div>
              <div className="rounded-lg bg-emerald-500/10 p-2">
                <CheckCircle2 className="w-4 h-4 mx-auto text-emerald-600 dark:text-emerald-400 mb-1" />
                <p className="text-lg font-bold">{project.resolvedCount ?? 0}</p>
                <p className="text-[11px] text-muted-foreground">Resueltos</p>
              </div>
              <div className="rounded-lg bg-blue-500/10 p-2">
                <Users className="w-4 h-4 mx-auto text-blue-600 dark:text-blue-400 mb-1" />
                <p className="text-lg font-bold">{project.clientCount ?? 0}</p>
                <p className="text-[11px] text-muted-foreground">Clientes</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-right">
              {project.totalComments ?? 0} comentarios en total
            </p>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

export default function FeedbackProjectsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);

  const form = useForm<CreateProjectData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: { name: '', siteUrl: '' },
  });

  const fetchProjects = async () => {
    if (!user?.id) return;
    try {
      const res = await feedbackAdminApi.getProjects(user.id);
      setProjects(res.data ?? []);
    } catch {
      toast({ title: 'Error al cargar proyectos', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const filtered = useMemo(
    () =>
      projects.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      ),
    [projects, search]
  );

  const onSubmit = async (values: CreateProjectData) => {
    if (!user?.id) return;
    setCreating(true);
    try {
      const res = await feedbackAdminApi.createProject({
        ...values,
        ownerId: user.id,
      });
      if (!res.success) {
        toast({ title: res.error || 'Error al crear proyecto', variant: 'destructive' });
        return;
      }
      toast({ title: 'Proyecto creado correctamente' });
      form.reset();
      setDialogOpen(false);
      fetchProjects();
    } catch {
      toast({ title: 'Error al crear proyecto', variant: 'destructive' });
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <MessageSquareText className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">Feedback de Clientes</h1>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Buscar proyecto..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquareText className="w-12 h-12 mx-auto text-muted-foreground/40 mb-4" />
          <p className="text-muted-foreground">
            {search
              ? 'No se encontraron proyectos con ese nombre.'
              : 'Aún no tienes proyectos de feedback. Crea tu primer proyecto.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Nuevo proyecto de feedback</DialogTitle>
            <DialogDescription>
              Crea un proyecto para recopilar feedback visual de un sitio web.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del proyecto</FormLabel>
                    <FormControl>
                      <Input placeholder="Mi sitio web" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="siteUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL del sitio</FormLabel>
                    <FormControl>
                      <Input placeholder="https://ejemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={creating}>
                  {creating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Crear proyecto
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
