'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
  Eye,
  Loader2,
  Plus,
  Search,
  Trash2,
  RefreshCw,
  KeyRound,
  Save,
} from 'lucide-react';
import Link from 'next/link';

import { useAuth } from '@/lib/auth-provider';
import { useToast } from '@/hooks/use-toast';
import { feedbackAdminApi } from '@/lib/feedback-admin-api';
import {
  createClientAccessSchema,
  updateProjectSchema,
  updateCommentSchema,
} from '@/lib/validations/feedback';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import StatusBadge from '@/components/feedback/StatusBadge';
import PriorityBadge from '@/components/feedback/PriorityBadge';
import PositionPreview from '@/components/feedback/PositionPreview';
import CredentialsDialog from '@/components/feedback/CredentialsDialog';

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface Project {
  id: number;
  name: string;
  siteUrl: string;
  status: string;
  ownerId: string;
  createdAt: string;
}

interface Comment {
  id: number;
  content: string;
  pageUrl: string;
  positionX: number;
  positionY: number;
  scrollY: number;
  viewportWidth: number;
  viewportHeight: number;
  status: 'pending' | 'in_progress' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high';
  adminNotes: string | null;
  clientName: string;
  clientEmail: string;
  clientAccessId: number;
  createdAt: string;
}

interface ClientAccess {
  id: number;
  clientName: string;
  email: string;
  isActive: boolean;
  lastLoginAt: string | null;
  createdAt: string;
}

type CreateClientData = z.infer<typeof createClientAccessSchema>;

const projectStatusLabels: Record<string, string> = {
  active: 'Activo',
  paused: 'Pausado',
  completed: 'Completado',
};

const projectStatusColors: Record<string, string> = {
  active:
    'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
  paused:
    'bg-amber-500/15 text-amber-700 dark:text-amber-400 border-amber-500/30',
  completed:
    'bg-zinc-500/15 text-zinc-700 dark:text-zinc-400 border-zinc-500/30',
};

/* ------------------------------------------------------------------ */
/* Helper: random password                                             */
/* ------------------------------------------------------------------ */

function generatePassword(length = 12): string {
  const chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%';
  return Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((b) => chars[b % chars.length])
    .join('');
}

/* ------------------------------------------------------------------ */
/* Comments Tab                                                        */
/* ------------------------------------------------------------------ */

function CommentsTab({ projectId, siteUrl }: { projectId: string; siteUrl?: string }) {
  const { toast } = useToast();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [clientFilter, setClientFilter] = useState('all');
  const [selected, setSelected] = useState<Comment | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const params: Record<string, string> = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (priorityFilter !== 'all') params.priority = priorityFilter;
      const res = await feedbackAdminApi.getComments(projectId, params);
      setComments(res.data ?? []);
    } catch {
      toast({ title: 'Error al cargar comentarios', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [projectId, statusFilter, priorityFilter, toast]);

  useEffect(() => {
    setLoading(true);
    fetchComments();
  }, [fetchComments]);

  const uniqueClients = useMemo(() => {
    const map = new Map<number, string>();
    comments.forEach((c) => map.set(c.clientAccessId, c.clientName));
    return Array.from(map, ([id, name]) => ({ id, name }));
  }, [comments]);

  const filtered = useMemo(
    () =>
      comments.filter((c) => {
        if (
          clientFilter !== 'all' &&
          c.clientAccessId !== Number(clientFilter)
        )
          return false;
        return true;
      }),
    [comments, clientFilter]
  );

  const openSheet = (comment: Comment) => {
    setSelected(comment);
    setEditStatus(comment.status);
    setEditPriority(comment.priority);
    setEditNotes(comment.adminNotes ?? '');
    setSheetOpen(true);
  };

  const handleSave = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await feedbackAdminApi.updateComment(String(selected.id), {
        status: editStatus,
        priority: editPriority,
        adminNotes: editNotes,
      });
      toast({ title: 'Comentario actualizado' });
      setSheetOpen(false);
      fetchComments();
    } catch {
      toast({ title: 'Error al guardar', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selected) return;
    setDeleting(true);
    try {
      await feedbackAdminApi.deleteComment(String(selected.id));
      toast({ title: 'Comentario eliminado' });
      setSheetOpen(false);
      fetchComments();
    } catch {
      toast({ title: 'Error al eliminar', variant: 'destructive' });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los estados</SelectItem>
            <SelectItem value="pending">Pendiente</SelectItem>
            <SelectItem value="in_progress">En progreso</SelectItem>
            <SelectItem value="dismissed">Descartado</SelectItem>
          </SelectContent>
        </Select>

        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Prioridad" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las prioridades</SelectItem>
            <SelectItem value="low">Baja</SelectItem>
            <SelectItem value="medium">Media</SelectItem>
            <SelectItem value="high">Alta</SelectItem>
          </SelectContent>
        </Select>

        <Select value={clientFilter} onValueChange={setClientFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Cliente" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los clientes</SelectItem>
            {uniqueClients.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No hay comentarios con los filtros seleccionados.
        </div>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Comentario</TableHead>
                <TableHead className="hidden md:table-cell">Página</TableHead>
                <TableHead className="hidden sm:table-cell">Cliente</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden sm:table-cell">Fecha</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((comment) => (
                <TableRow
                  key={comment.id}
                  className="cursor-pointer"
                  onClick={() => openSheet(comment)}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {comment.id}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {comment.content}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[150px] truncate text-xs text-muted-foreground">
                    {comment.pageUrl}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {comment.clientName}
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={comment.priority} />
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={comment.status} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">
                    {format(new Date(comment.createdAt), 'd MMM yyyy', {
                      locale: es,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Comment Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Comentario #{selected?.id}</SheetTitle>
            <SheetDescription>
              Por {selected?.clientName} &mdash;{' '}
              {selected &&
                format(new Date(selected.createdAt), "d MMM yyyy 'a las' HH:mm", {
                  locale: es,
                })}
            </SheetDescription>
          </SheetHeader>

          {selected && (
            <div className="space-y-6 mt-6">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Comentario
                </Label>
                <p className="text-sm whitespace-pre-wrap rounded-lg border bg-muted/50 p-3">
                  {selected.content}
                </p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Posición en la página
                </Label>
                <PositionPreview
                  positionX={selected.positionX}
                  positionY={selected.positionY}
                  siteUrl={selected.pageUrl || siteUrl}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Página: {selected.pageUrl}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs mb-1.5 block">Estado</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendiente</SelectItem>
                      <SelectItem value="in_progress">En progreso</SelectItem>
                      <SelectItem value="resolved">Resuelto</SelectItem>
                      <SelectItem value="dismissed">Descartado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-xs mb-1.5 block">Prioridad</Label>
                  <Select value={editPriority} onValueChange={setEditPriority}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Baja</SelectItem>
                      <SelectItem value="medium">Media</SelectItem>
                      <SelectItem value="high">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-xs mb-1.5 block">Notas del admin</Label>
                <Textarea
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Agregar notas internas..."
                  rows={4}
                />
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={handleSave} disabled={saving} className="flex-1">
                  {saving ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Guardar cambios
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="icon">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        ¿Eliminar comentario?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. El comentario se
                        eliminará permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={deleting}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleting && (
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        )}
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Resolved Tab                                                        */
/* ------------------------------------------------------------------ */

interface ResolvedComment {
  id: number;
  originalId: number;
  content: string;
  pageUrl: string;
  positionX: number;
  positionY: number;
  scrollY: number;
  viewportWidth: number;
  viewportHeight: number;
  priority: 'low' | 'medium' | 'high';
  adminNotes: string | null;
  clientName: string;
  clientEmail: string;
  clientAccessId: number;
  resolvedAt: string;
  createdAt: string;
}

function ResolvedTab({ projectId, siteUrl }: { projectId: string; siteUrl?: string }) {
  const { toast } = useToast();
  const [comments, setComments] = useState<ResolvedComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ResolvedComment | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const fetchResolved = useCallback(async () => {
    try {
      const res = await feedbackAdminApi.getResolvedComments(projectId);
      setComments(res.data ?? []);
    } catch {
      toast({ title: 'Error al cargar resueltos', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [projectId, toast]);

  useEffect(() => {
    setLoading(true);
    fetchResolved();
  }, [fetchResolved]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        {comments.length} comentario{comments.length !== 1 ? 's' : ''} resuelto{comments.length !== 1 ? 's' : ''}
      </p>

      {comments.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No hay comentarios resueltos aún.
        </div>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">#</TableHead>
                <TableHead>Comentario</TableHead>
                <TableHead className="hidden md:table-cell">Página</TableHead>
                <TableHead className="hidden sm:table-cell">Cliente</TableHead>
                <TableHead>Prioridad</TableHead>
                <TableHead className="hidden sm:table-cell">Resuelto</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {comments.map((comment) => (
                <TableRow
                  key={comment.id}
                  className="cursor-pointer"
                  onClick={() => { setSelected(comment); setSheetOpen(true); }}
                >
                  <TableCell className="font-mono text-xs text-muted-foreground">
                    {comment.originalId}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {comment.content}
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[150px] truncate text-xs text-muted-foreground">
                    {comment.pageUrl}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-sm">
                    {comment.clientName}
                  </TableCell>
                  <TableCell>
                    <PriorityBadge priority={comment.priority} />
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground whitespace-nowrap">
                    {comment.resolvedAt
                      ? format(new Date(comment.resolvedAt), 'd MMM yyyy', { locale: es })
                      : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Resolved Detail Sheet */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent className="sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Comentario #{selected?.originalId} (Resuelto)</SheetTitle>
            <SheetDescription>
              Por {selected?.clientName} &mdash;{' '}
              {selected &&
                format(new Date(selected.createdAt), "d MMM yyyy 'a las' HH:mm", {
                  locale: es,
                })}
            </SheetDescription>
          </SheetHeader>

          {selected && (
            <div className="space-y-6 mt-6">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Comentario
                </Label>
                <p className="text-sm whitespace-pre-wrap rounded-lg border bg-muted/50 p-3">
                  {selected.content}
                </p>
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block">
                  Posición en la página
                </Label>
                <PositionPreview
                  positionX={selected.positionX}
                  positionY={selected.positionY}
                  siteUrl={selected.pageUrl || siteUrl}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Página: {selected.pageUrl}
                </p>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Estado</Label>
                  <Badge className="bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30">
                    Resuelto
                  </Badge>
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">Prioridad</Label>
                  <PriorityBadge priority={selected.priority} />
                </div>
              </div>

              {selected.adminNotes && (
                <div>
                  <Label className="text-xs text-muted-foreground mb-1 block">
                    Notas del admin
                  </Label>
                  <p className="text-sm whitespace-pre-wrap rounded-lg border bg-muted/50 p-3">
                    {selected.adminNotes}
                  </p>
                </div>
              )}

              {selected.resolvedAt && (
                <p className="text-xs text-muted-foreground text-center">
                  Resuelto el{' '}
                  {format(new Date(selected.resolvedAt), "d MMM yyyy 'a las' HH:mm", {
                    locale: es,
                  })}
                </p>
              )}
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Clients Tab                                                         */
/* ------------------------------------------------------------------ */

function ClientsTab({
  projectId,
  projectName,
}: {
  projectId: string;
  projectName: string;
}) {
  const { toast } = useToast();
  const [clients, setClients] = useState<ClientAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [creating, setCreating] = useState(false);
  const [credDialogOpen, setCredDialogOpen] = useState(false);
  const [credentials, setCredentials] = useState({
    projectName: '',
    loginUrl: '',
    email: '',
    password: '',
  });

  const form = useForm<CreateClientData>({
    resolver: zodResolver(createClientAccessSchema),
    defaultValues: { clientName: '', email: '', password: '' },
  });

  const fetchClients = useCallback(async () => {
    try {
      const res = await feedbackAdminApi.getClients(projectId);
      setClients(res.data ?? []);
    } catch {
      toast({ title: 'Error al cargar clientes', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [projectId, toast]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const onSubmit = async (values: CreateClientData) => {
    setCreating(true);
    try {
      const res = await feedbackAdminApi.createClient(projectId, values);
      if (!res.success) {
        toast({ title: res.error || 'Error', variant: 'destructive' });
        return;
      }
      toast({ title: 'Cliente creado correctamente' });
      setDialogOpen(false);

      setCredentials({
        projectName,
        loginUrl: `${window.location.origin}/feedback/login?project=${projectId}`,
        email: values.email,
        password: values.password,
      });
      setCredDialogOpen(true);

      form.reset();
      fetchClients();
    } catch {
      toast({ title: 'Error al crear cliente', variant: 'destructive' });
    } finally {
      setCreating(false);
    }
  };

  const toggleActive = async (client: ClientAccess) => {
    try {
      await feedbackAdminApi.updateClient(projectId, String(client.id), {
        isActive: !client.isActive,
      });
      toast({
        title: client.isActive ? 'Cliente desactivado' : 'Cliente activado',
      });
      fetchClients();
    } catch {
      toast({ title: 'Error al actualizar cliente', variant: 'destructive' });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {clients.length} cliente{clients.length !== 1 ? 's' : ''}
        </p>
        <Button size="sm" onClick={() => setDialogOpen(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Agregar cliente
        </Button>
      </div>

      {clients.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          No hay clientes en este proyecto.
        </div>
      ) : (
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Activo</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Último login
                </TableHead>
                <TableHead className="hidden sm:table-cell">Creado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">
                    {client.clientName}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {client.email}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={client.isActive ? 'default' : 'outline'}
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => toggleActive(client)}
                    >
                      {client.isActive ? 'Activo' : 'Inactivo'}
                    </Button>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {client.lastLoginAt
                      ? format(new Date(client.lastLoginAt), 'd MMM yyyy', {
                          locale: es,
                        })
                      : 'Nunca'}
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {format(new Date(client.createdAt), 'd MMM yyyy', {
                      locale: es,
                    })}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Create client dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Agregar cliente</DialogTitle>
            <DialogDescription>
              Crea credenciales para que un cliente acceda al portal de feedback.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Juan Pérez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="cliente@ejemplo.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input type="text" placeholder="Min. 6 caracteres" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        title="Generar contraseña"
                        onClick={() =>
                          form.setValue('password', generatePassword(), {
                            shouldValidate: true,
                          })
                        }
                      >
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
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
                  {creating && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Crear cliente
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Credentials dialog */}
      <CredentialsDialog
        open={credDialogOpen}
        onOpenChange={setCredDialogOpen}
        credentials={credentials}
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Settings Tab                                                        */
/* ------------------------------------------------------------------ */

function SettingsTab({
  project,
  onUpdate,
}: {
  project: Project;
  onUpdate: () => void;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [deletingProject, setDeletingProject] = useState(false);
  const [name, setName] = useState(project.name);
  const [siteUrl, setSiteUrl] = useState(project.siteUrl);
  const [status, setStatus] = useState(project.status);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await feedbackAdminApi.updateProject(String(project.id), {
        name,
        siteUrl,
        status,
      });
      if (!res.success) {
        toast({ title: res.error || 'Error', variant: 'destructive' });
        return;
      }
      toast({ title: 'Proyecto actualizado' });
      onUpdate();
    } catch {
      toast({ title: 'Error al guardar', variant: 'destructive' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeletingProject(true);
    try {
      await feedbackAdminApi.deleteProject(String(project.id));
      toast({ title: 'Proyecto eliminado' });
      router.push('/equipo/dashboard/feedback');
    } catch {
      toast({ title: 'Error al eliminar', variant: 'destructive' });
    } finally {
      setDeletingProject(false);
    }
  };

  return (
    <div className="space-y-6 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">General</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-xs mb-1.5 block">Nombre del proyecto</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs mb-1.5 block">URL del sitio</Label>
            <Input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} />
          </div>
          <div>
            <Label className="text-xs mb-1.5 block">Estado</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Activo</SelectItem>
                <SelectItem value="paused">Pausado</SelectItem>
                <SelectItem value="completed">Completado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Guardar cambios
          </Button>
        </CardContent>
      </Card>

      <Card className="border-red-500/30">
        <CardHeader>
          <CardTitle className="text-base text-red-600 dark:text-red-400">
            Zona de peligro
          </CardTitle>
          <CardDescription>
            Acciones irreversibles sobre este proyecto.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar proyecto
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                <AlertDialogDescription>
                  Se eliminarán todos los comentarios y accesos de cliente. Esta
                  acción no se puede deshacer.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deletingProject}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deletingProject && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Eliminar proyecto
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Page                                                           */
/* ------------------------------------------------------------------ */

export default function FeedbackProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const { toast } = useToast();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProject = useCallback(async () => {
    try {
      const res = await feedbackAdminApi.getProject(projectId);
      setProject(res.data ?? null);
    } catch {
      toast({ title: 'Error al cargar el proyecto', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  }, [projectId, toast]);

  useEffect(() => {
    fetchProject();
  }, [fetchProject]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Proyecto no encontrado.</p>
        <Button asChild variant="outline" className="mt-4">
          <Link href="/equipo/dashboard/feedback">Volver a proyectos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/equipo/dashboard/feedback">
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{project.name}</h1>
              <Badge
                variant="outline"
                className={
                  projectStatusColors[project.status] ??
                  projectStatusColors.active
                }
              >
                {projectStatusLabels[project.status] ?? project.status}
              </Badge>
            </div>
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:underline flex items-center gap-1"
            >
              {project.siteUrl}
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
        <Button variant="outline" size="sm" asChild>
          <a
            href={`/feedback/login?project=${project.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver como cliente
          </a>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="comments">
        <TabsList>
          <TabsTrigger value="comments">Comentarios</TabsTrigger>
          <TabsTrigger value="resolved">
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            Resueltos
          </TabsTrigger>
          <TabsTrigger value="clients">Clientes</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="comments" className="mt-4">
          <CommentsTab projectId={projectId} siteUrl={project.siteUrl} />
        </TabsContent>

        <TabsContent value="resolved" className="mt-4">
          <ResolvedTab projectId={projectId} siteUrl={project.siteUrl} />
        </TabsContent>

        <TabsContent value="clients" className="mt-4">
          <ClientsTab projectId={projectId} projectName={project.name} />
        </TabsContent>

        <TabsContent value="settings" className="mt-4">
          <SettingsTab project={project} onUpdate={fetchProject} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
