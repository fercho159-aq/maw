
'use client';

import React, { useState, useMemo, useEffect, startTransition } from 'react';
import {
    Table,
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { useAuth } from '@/lib/auth-provider';
import { Button } from '@/components/ui/button';
import { PlusCircle, CalendarIcon, Plus, ChevronRight, Lightbulb, Kanban, List, Edit, Facebook, Bot, Youtube, Linkedin, Forward, Trash2, X, CheckCircle, MoreHorizontal, SlidersHorizontal, Check, ChevronsUpDown, Search } from 'lucide-react';
import type { PendienteMaw, Client, RecordingEvent, Colaborador, ClientFinancialProfile } from '@/lib/db/schema';
import { getPendientes, addPendiente, updatePendiente, deletePendientes, updateClientFinancialProfile, updateClientPublicaciones } from './_actions';
import { getClients } from '../clientes/_actions';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { teamMembers } from '@/lib/team-data';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ScheduleRecordingDialog } from '@/components/schedule-recording-dialog';
import { motion } from 'framer-motion';
import { Progress } from '@/components/ui/progress';
import { TikTokIcon } from '@/components/icons/tiktok-icon';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useIsMobile } from '@/hooks/use-mobile';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';


const statusColors: Record<string, string> = {
    "Pendiente del cliente": "bg-orange-500",
    "Trabajando": "bg-blue-500",
    "Recurrente": "bg-purple-500",
    "Reporte": "bg-cyan-500",
};

const priorityColors: Record<string, string> = {
    "Urgente": "bg-red-500",
    "Media": "bg-orange-500",
    "Baja": "bg-green-500",
};

const categoryColors: Record<string, string> = {
    "Contenido": "bg-blue-500",
    "Ads": "bg-orange-500",
    "Web": "bg-green-500",
    "General": "bg-purple-500",
};

const AddPendienteDialog = ({ clients, onAdd, children }: { clients: Client[], onAdd: (data: Omit<PendienteMaw, 'id' | 'createdAt'>) => void, children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const [clientId, setClientId] = useState<string>('');
    const [clientSearch, setClientSearch] = useState('');
    const [clientPopoverOpen, setClientPopoverOpen] = useState(false);
    const [ejecutor, setEjecutor] = useState<string>('');
    const [ejecutorSearch, setEjecutorSearch] = useState('');
    const [ejecutorPopoverOpen, setEjecutorPopoverOpen] = useState(false);
    const [categoria, setCategoria] = useState<string>('');
    const [pendientePrincipal, setPendientePrincipal] = useState<string>('');
    const [status, setStatus] = useState<string>('Trabajando');

    const filteredClients = useMemo(() => {
        if (!clientSearch.trim()) return clients;
        const search = clientSearch.toLowerCase();
        return clients.filter(c => c.name.toLowerCase().includes(search));
    }, [clients, clientSearch]);

    const filteredTeamMembers = useMemo(() => {
        if (!ejecutorSearch.trim()) return teamMembers;
        const search = ejecutorSearch.toLowerCase();
        return teamMembers.filter(m => m.name.toLowerCase().includes(search));
    }, [ejecutorSearch]);

    const resetForm = () => {
        setClientId('');
        setClientSearch('');
        setEjecutor('');
        setEjecutorSearch('');
        setCategoria('');
        setPendientePrincipal('');
        setStatus('Trabajando');
    }

    const handleSave = () => {
        const client = clients.find(c => c.id === parseInt(clientId));
        if (!client || !ejecutor || !categoria || !pendientePrincipal) {
            toast({ title: "Error", description: "Todos los campos son obligatorios.", variant: "destructive" });
            return;
        }

        onAdd({
            clientId: client.id,
            clienteName: client.name,
            ejecutor,
            categoria,
            pendientePrincipal,
            status,
            completed: false,
            priority: 'Media',
        });

        toast({ title: "Éxito", description: "Pendiente añadido correctamente." });
        resetForm();
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader><DialogTitle>Añadir Pendiente Manual</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Cliente</Label>
                        <Popover open={clientPopoverOpen} onOpenChange={setClientPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={clientPopoverOpen} className="w-full justify-between font-normal">
                                    {clientId ? clients.find(c => c.id.toString() === clientId)?.name : "Seleccionar cliente"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                                <div className="flex items-center border-b px-3">
                                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                    <input
                                        className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                                        placeholder="Buscar cliente..."
                                        value={clientSearch}
                                        onChange={e => setClientSearch(e.target.value)}
                                    />
                                </div>
                                <div className="max-h-[200px] overflow-y-auto p-1">
                                    {filteredClients.length === 0 ? (
                                        <p className="py-6 text-center text-sm text-muted-foreground">No se encontró ningún cliente.</p>
                                    ) : (
                                        filteredClients.map(c => (
                                            <button
                                                key={c.id}
                                                className={cn(
                                                    "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                                    clientId === c.id.toString() && "bg-accent"
                                                )}
                                                onClick={() => {
                                                    setClientId(c.id.toString());
                                                    setClientPopoverOpen(false);
                                                    setClientSearch('');
                                                }}
                                            >
                                                <Check className={cn("mr-2 h-4 w-4", clientId === c.id.toString() ? "opacity-100" : "opacity-0")} />
                                                {c.name}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label>Ejecutor</Label>
                        <Popover open={ejecutorPopoverOpen} onOpenChange={setEjecutorPopoverOpen}>
                            <PopoverTrigger asChild>
                                <Button variant="outline" role="combobox" aria-expanded={ejecutorPopoverOpen} className="w-full justify-between font-normal">
                                    {ejecutor || "Seleccionar ejecutor"}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
                                <div className="flex items-center border-b px-3">
                                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                                    <input
                                        className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
                                        placeholder="Buscar ejecutor..."
                                        value={ejecutorSearch}
                                        onChange={e => setEjecutorSearch(e.target.value)}
                                    />
                                </div>
                                <div className="max-h-[200px] overflow-y-auto p-1">
                                    {filteredTeamMembers.length === 0 ? (
                                        <p className="py-6 text-center text-sm text-muted-foreground">No se encontró ningún ejecutor.</p>
                                    ) : (
                                        filteredTeamMembers.map(m => (
                                            <button
                                                key={m.id}
                                                className={cn(
                                                    "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                                                    ejecutor === m.name && "bg-accent"
                                                )}
                                                onClick={() => {
                                                    setEjecutor(m.name);
                                                    setEjecutorPopoverOpen(false);
                                                    setEjecutorSearch('');
                                                }}
                                            >
                                                <Check className={cn("mr-2 h-4 w-4", ejecutor === m.name ? "opacity-100" : "opacity-0")} />
                                                {m.name}
                                            </button>
                                        ))
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                    <div className="space-y-2">
                        <Label>Categoría</Label>
                        <Select value={categoria} onValueChange={setCategoria}>
                            <SelectTrigger><SelectValue placeholder="Seleccionar categoría" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Contenido">Contenido</SelectItem>
                                <SelectItem value="Ads">Ads</SelectItem>
                                <SelectItem value="Web">Web</SelectItem>
                                <SelectItem value="General">General</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Pendiente</Label>
                        <Textarea value={pendientePrincipal} onChange={e => setPendientePrincipal(e.target.value)} placeholder="Descripción del pendiente..." />
                    </div>
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.keys(statusColors).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => { setOpen(false); resetForm(); }}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar Pendiente</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export type PendienteWithClient = PendienteMaw & {
    recordingEvent?: RecordingEvent | null;
    client: Client & { financialProfile: ClientFinancialProfile | null };
};


const PendienteDialog = ({ pendiente, onSave, canReassign, children }: { pendiente: PendienteWithClient, onSave: (data: Partial<PendienteMaw>) => void, canReassign: boolean, children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState(pendiente.pendientePrincipal);
    const [ejecutor, setEjecutor] = useState(pendiente.ejecutor);
    const [status, setStatus] = useState(pendiente.status);

    useEffect(() => {
        if (open) {
            setText(pendiente.pendientePrincipal);
            setEjecutor(pendiente.ejecutor);
            setStatus(pendiente.status);
        }
    }, [open, pendiente]);

    const handleSave = () => {
        const dataToSave: Partial<PendienteMaw> = {};
        if (text !== pendiente.pendientePrincipal) dataToSave.pendientePrincipal = text;
        if (ejecutor !== pendiente.ejecutor) dataToSave.ejecutor = ejecutor;
        if (status !== pendiente.status) dataToSave.status = status;

        if (Object.keys(dataToSave).length > 0) {
            onSave(dataToSave);
        }
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Editar Pendiente</DialogTitle>
                    <DialogDescription>Cliente: {pendiente.clienteName}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Pendiente</Label>
                        <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[100px]" />
                    </div>
                    <div className="space-y-2">
                        <Label>Ejecutor</Label>
                        <Select value={ejecutor} onValueChange={setEjecutor} disabled={!canReassign}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>{teamMembers.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className={cn("text-white w-full justify-center", statusColors[status])}>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.keys(statusColors).map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar Cambios</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const AdsMetricsDialog = ({ pendiente, onSave, children }: { pendiente: PendienteWithClient, onSave: (data: Partial<PendienteMaw>) => void, children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [metrics, setMetrics] = useState<Partial<PendienteMaw>>({});

    useEffect(() => {
        if (open) {
            setMetrics({
                hasFacebookAds: pendiente.hasFacebookAds, facebookAdsMessages: pendiente.facebookAdsMessages || '', facebookAdsInteraction: pendiente.facebookAdsInteraction || '',
                hasTiktokAds: pendiente.hasTiktokAds, tiktokAdsMessages: pendiente.tiktokAdsMessages || '', tiktokAdsInteraction: pendiente.tiktokAdsInteraction || '',
                hasGoogleAds: pendiente.hasGoogleAds, googleAdsMessages: pendiente.googleAdsMessages || '', googleAdsInteraction: pendiente.googleAdsInteraction || '',
                hasLinkedinAds: pendiente.hasLinkedinAds, linkedinAdsMessages: pendiente.linkedinAdsMessages || '', linkedinAdsInteraction: pendiente.linkedinAdsInteraction || '',
            });
        }
    }, [open, pendiente]);

    const handleSave = () => {
        onSave(metrics);
        setOpen(false);
    }

    const platforms: (keyof PendienteMaw)[] = ['Facebook', 'Tiktok', 'Google', 'Linkedin'];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Métricas de Ads para {pendiente.clienteName}</DialogTitle>
                    <DialogDescription>Actualiza los datos de las campañas publicitarias.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4 max-h-[60vh] overflow-y-auto px-1">
                    {platforms.map(platform => {
                        const platformLower = (platform as string).toLowerCase();
                        return (
                            <div key={platform as string} className="space-y-4 p-4 border rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`has-${platformLower}`}
                                        checked={metrics[`has${platform}Ads` as keyof typeof metrics]}
                                        onCheckedChange={(checked) => setMetrics(prev => ({ ...prev, [`has${platform}Ads`]: checked }))}
                                    />
                                    <Label htmlFor={`has-${platformLower}`} className="text-lg font-semibold flex items-center gap-2">
                                        {platform === 'Facebook' && <Facebook className='w-5 h-5' />}
                                        {platform === 'Tiktok' && <TikTokIcon className='w-5 h-5' />}
                                        {platform === 'Google' && <Bot className='w-5 h-5' />}
                                        {platform === 'Linkedin' && <Linkedin className='w-5 h-5' />}
                                        ¿Tiene en {platform as string}?
                                    </Label>
                                </div>
                                {metrics[`has${platform}Ads` as keyof typeof metrics] && (
                                    <div className="grid grid-cols-2 gap-4 pl-6">
                                        <div className="space-y-2">
                                            <Label htmlFor={`${platformLower}-messages`}>Mensajes</Label>
                                            <Input id={`${platformLower}-messages`} value={metrics[`${platformLower}AdsMessages` as keyof typeof metrics] as string} onChange={e => setMetrics(prev => ({ ...prev, [`${platformLower}AdsMessages`]: e.target.value }))} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor={`${platformLower}-interaction`}>Interacción</Label>
                                            <Input id={`${platformLower}-interaction`} value={metrics[`${platformLower}AdsInteraction` as keyof typeof metrics] as string} onChange={e => setMetrics(prev => ({ ...prev, [`${platformLower}AdsInteraction`]: e.target.value }))} />
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar Métricas</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const AddPendienteInline = ({ client, categoria, onAdd, onCancel, currentUser, firstPendiente }: {
    client: Client,
    categoria: string,
    onAdd: (data: Omit<PendienteMaw, 'id' | 'createdAt'>) => void,
    onCancel: () => void,
    currentUser: Colaborador,
    firstPendiente?: PendienteMaw,
}) => {
    const [text, setText] = useState('');

    const handleSave = () => {
        if (text.trim()) {
            const ejecutor = firstPendiente?.ejecutor || currentUser.name;

            onAdd({
                clientId: client.id,
                clienteName: client.name,
                ejecutor,
                categoria,
                pendientePrincipal: text.trim(),
                status: 'Trabajando',
                completed: false,
                priority: 'Media',
            });
            setText('');
        }
    }

    return (
        <div className="p-2 space-y-2">
            <Textarea
                placeholder="Escribe el nuevo pendiente..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        handleSave();
                        e.preventDefault();
                    }
                    if (e.key === 'Escape') {
                        onCancel();
                    }
                }}
            />
            <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={onCancel}>Cancelar</Button>
                <Button size="sm" onClick={handleSave}>Guardar</Button>
            </div>
        </div>
    )
}

const ClientProgress = ({ pendientes }: { pendientes: PendienteWithClient[] }) => {
    const total = pendientes.length;
    if (total === 0) return null;

    const completed = pendientes.filter(p => p.completed).length;
    const percentage = (completed / total) * 100;

    const getIndicatorColor = (value: number) => {
        if (value < 50) return "bg-red-500";
        if (value < 100) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <div className="mt-1 px-2">
            <Progress value={percentage} indicatorClassName={getIndicatorColor(percentage)} className="h-2" />
        </div>
    );
}

const ClientDataDialog = ({ pendientes, onRefresh, children }: { pendientes: PendienteWithClient[], onRefresh: () => void, children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [pubsMes, setPubsMes] = useState<string>('');
    const [pubsSemana, setPubsSemana] = useState<string>('');

    const firstPendiente = pendientes[0];
    const client = firstPendiente?.client;

    useEffect(() => {
        if (open && client) {
            // Leer desde el cliente, no desde el pendiente
            setPubsMes(client.publicacionesAlMes ?? '');
            setPubsSemana(client.publicacionesALaSemana ?? '');
        }
    }, [open, client]);

    const handleSave = async () => {
        if (!client) return;

        try {
            // Guardar directamente en el cliente
            await updateClientPublicaciones(client.id, {
                publicacionesAlMes: pubsMes,
                publicacionesALaSemana: pubsSemana,
            });
            onRefresh();
            setOpen(false);
        } catch (error) {
            console.error("Error updating client data:", error);
        }
    }

    if (!firstPendiente) {
        return <>{children}</>;
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Editar Datos del Cliente: {firstPendiente.clienteName}</DialogTitle>
                    <DialogDescription>Estos valores se guardan a nivel del cliente (no se pierden al borrar pendientes).</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Publicaciones al Mes</Label>
                        <Textarea value={pubsMes} onChange={(e) => setPubsMes(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Publicaciones a la Semana</Label>
                        <Textarea value={pubsSemana} onChange={(e) => setPubsSemana(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Próxima Grabación</Label>
                        <ScheduleRecordingDialog
                            event={firstPendiente.recordingEvent}
                            pendienteId={firstPendiente.id}
                            clientName={firstPendiente.clienteName}
                            project={firstPendiente.pendientePrincipal}
                            assignedToName={firstPendiente.ejecutor}
                            onSave={onRefresh}
                        >
                            {firstPendiente.recordingEvent ? (
                                <Button variant="outline" className="w-full justify-start gap-2">
                                    <CalendarIcon className='w-4 h-4' />
                                    {format(new Date(firstPendiente.recordingEvent.fullStart), 'dd MMM yyyy, HH:mm', { locale: es })}
                                </Button>
                            ) : (
                                <Button variant="secondary" className="w-full justify-start gap-2">
                                    <CalendarIcon className='w-4 h-4' />
                                    Agendar Grabación
                                </Button>
                            )}
                        </ScheduleRecordingDialog>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const PendientesTable = ({
    data,
    onUpdateTask,
    currentUser,
    onRefresh,
    onUpdatePendienteText,
    clients,
    categoria,
    selectedPendientes,
    onSelectionChange,
    onUpdateClientFinancial
}: {
    data: PendienteWithClient[];
    onUpdateTask: (task: PendienteWithClient, data: Partial<PendienteMaw>) => void;
    currentUser: any;
    onRefresh: () => void;
    onUpdatePendienteText: (id: number, text: string) => void;
    clients: Client[];
    categoria: string;
    selectedPendientes: number[];
    onSelectionChange: (id: number, checked: boolean) => void;
    onUpdateClientFinancial: (clientId: number, data: Partial<Omit<ClientFinancialProfile, 'id' | 'clientId'>>) => void;
}) => {
    const { toast } = useToast();
    const [addingToClientId, setAddingToClientId] = useState<number | null>(null);

    const canReassign = currentUser?.permissions?.pendientes?.reasignarResponsables;
    const canDelete = currentUser?.permissions?.pendientes?.borrarPendientes;
    const canAddPendiente = currentUser?.role === 'admin' || currentUser?.role === 'encargado' || currentUser?.role === 'ejecutor';
    const isContenido = categoria === 'Contenido';
    const isAds = categoria === 'Ads';


    const handleTogglePendiente = async (pendiente: PendienteWithClient) => {
        try {
            await updatePendiente(pendiente.id, { completed: !pendiente.completed });
            onRefresh();
        } catch (error) {
            toast({ title: "Error", description: "No se pudo actualizar el pendiente.", variant: "destructive" });
        }
    };

    const handleAddPendienteAction = async (data: Omit<PendienteMaw, 'id' | 'createdAt'>) => {
        try {
            await addPendiente(data);
            toast({ title: "Éxito", description: "Pendiente creado." });
            onRefresh();
            setAddingToClientId(null);
        } catch (error) {
            toast({ title: "Error", description: "No se pudo crear el pendiente.", variant: "destructive" });
        }
    }

    const groupedData = useMemo(() => {
        const uniqueClientNames = Array.from(new Set(clients.map(c => c.name)));

        const dataMap: Record<string, PendienteWithClient[]> = {};
        const clientsWithPendientes = new Set<string>();

        data.forEach(p => {
            clientsWithPendientes.add(p.clienteName);
            if (!dataMap[p.clienteName]) {
                dataMap[p.clienteName] = [];
            }
            dataMap[p.clienteName].push(p);
        });

        const activeClientNames = Array.from(clientsWithPendientes).sort((a, b) => a.localeCompare(b));
        const inactiveClientNames = uniqueClientNames.filter(name => !clientsWithPendientes.has(name)).sort((a, b) => a.localeCompare(b));

        inactiveClientNames.forEach(name => {
            dataMap[name] = [];
        })

        const sortedClientNames = [...activeClientNames, ...inactiveClientNames];

        const finalMap: Record<string, PendienteWithClient[]> = {};
        sortedClientNames.forEach(name => {
            finalMap[name] = dataMap[name];
        })

        return finalMap;

    }, [data, clients]);

    if (Object.keys(groupedData).length === 0) {
        return (
            <div className="text-center p-8 text-foreground/70">
                No se encontraron clientes.
            </div>
        );
    }

    return (
        <div className="border rounded-lg mt-4 overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[40px] px-2"></TableHead>
                        <TableHead className="w-[200px] min-w-[200px]">Cliente</TableHead>
                        <TableHead className="w-[180px] min-w-[180px]">Ejecutor</TableHead>
                        <TableHead>Prioridad</TableHead>
                        <TableHead>Pendiente</TableHead>
                        <TableHead className="w-[150px] min-w-[150px]">Status</TableHead>
                        {(isContenido || isAds) && <TableHead className="w-[150px] min-w-[150px]">Fecha de Corte</TableHead>}
                        {isContenido && <TableHead className="w-[150px] min-w-[150px]">Contenido Programado</TableHead>}
                        {isContenido && <TableHead className="w-[150px] min-w-[150px]">Pubs. al Mes</TableHead>}
                        {isContenido && <TableHead className="w-[150px] min-w-[150px]">Pubs. a la Semana</TableHead>}
                        {isAds && <TableHead className="w-[180px] min-w-[180px]">Métricas de Ads</TableHead>}
                        {isContenido && <TableHead className="w-[180px] min-w-[180px]">Próxima Grabación</TableHead>}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Object.entries(groupedData).map(([clienteName, pendientes]) => {
                        const client = clients.find(c => c.name === clienteName);
                        if (!client) return null;

                        const rowCount = Math.max(1, pendientes.length);
                        const displayRowSpan = rowCount + (canAddPendiente ? 1 : 0);

                        if (pendientes.length === 0) {
                            return (
                                <React.Fragment key={clienteName}>
                                    <TableRow>
                                        <TableCell className="px-2"></TableCell>
                                        <TableCell rowSpan={1} className="align-top font-medium p-2 border-r">
                                            <ClientDataDialog pendientes={[]} onRefresh={onRefresh}>
                                                <div className='flex flex-col h-full justify-between cursor-pointer hover:bg-muted p-2 rounded-md'>
                                                    <span>{clienteName}</span>
                                                </div>
                                            </ClientDataDialog>
                                        </TableCell>
                                        <TableCell colSpan={isContenido ? 9 : (isAds ? 6 : 4)}>
                                            <div className="h-full">
                                                {addingToClientId === client.id ? (
                                                    <AddPendienteInline
                                                        client={client}
                                                        categoria={categoria}
                                                        onAdd={handleAddPendienteAction}
                                                        onCancel={() => setAddingToClientId(null)}
                                                        currentUser={currentUser}
                                                    />
                                                ) : (
                                                    canAddPendiente ? (
                                                        <Button variant="ghost" size="sm" className="w-full h-full justify-start text-muted-foreground" onClick={() => setAddingToClientId(client.id)}>
                                                            <Plus className="w-4 h-4 mr-2" />
                                                            Añadir primer pendiente
                                                        </Button>
                                                    ) : <span className="text-xs text-muted-foreground">Sin pendientes en esta categoría.</span>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </React.Fragment>
                            )
                        }


                        return (
                            <React.Fragment key={clienteName}>
                                {pendientes.map((pendiente, index) => (
                                    <TableRow key={pendiente.id} data-state={selectedPendientes.includes(pendiente.id) ? "selected" : ""}>
                                        <TableCell className="px-2">
                                            <Checkbox
                                                checked={selectedPendientes.includes(pendiente.id)}
                                                onCheckedChange={(checked) => onSelectionChange(pendiente.id, Boolean(checked))}
                                                aria-label={`Seleccionar pendiente ${pendiente.id}`}
                                            />
                                        </TableCell>
                                        {index === 0 && (
                                            <TableCell
                                                rowSpan={displayRowSpan}
                                                className="align-top font-medium p-2 border-r"
                                            >
                                                <ClientDataDialog pendientes={pendientes} onRefresh={onRefresh}>
                                                    <div className='flex flex-col h-full justify-between cursor-pointer hover:bg-muted p-2 rounded-md'>
                                                        <span className="flex items-center gap-1">{clienteName} <Edit className="w-3 h-3 text-muted-foreground" /></span>
                                                        <ClientProgress pendientes={pendientes} />
                                                    </div>
                                                </ClientDataDialog>
                                            </TableCell>
                                        )}
                                        <TableCell className="p-2 align-middle text-xs">
                                            <Select value={pendiente.ejecutor} onValueChange={(newEjecutor) => onUpdateTask(pendiente, { ejecutor: newEjecutor })} disabled={!canReassign}>
                                                <SelectTrigger className="text-xs h-8 border-0 bg-transparent focus:ring-0">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {teamMembers.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className="p-2 align-middle">
                                            <Select value={pendiente.priority || 'Media'} onValueChange={(newPriority) => onUpdateTask(pendiente, { priority: newPriority })}>
                                                <SelectTrigger className={cn("text-white w-full justify-center text-xs h-8 border-0", priorityColors[pendiente.priority || 'Media'])}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Urgente">🔴 Urgente</SelectItem>
                                                    <SelectItem value="Media">🟠 Media</SelectItem>
                                                    <SelectItem value="Baja">🟢 Baja</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        <TableCell className={cn("p-0 align-middle text-sm", pendiente.completed && "line-through text-muted-foreground")}>
                                            <div className="flex items-center">
                                                <Checkbox
                                                    id={`pendiente-${pendiente.id}`}
                                                    className='ml-2'
                                                    checked={pendiente.completed}
                                                    onCheckedChange={() => handleTogglePendiente(pendiente)}
                                                />
                                                <PendienteDialog
                                                    key={pendiente.id}
                                                    pendiente={pendiente}
                                                    onSave={(data) => onUpdateTask(pendiente, data)}
                                                    canReassign={canReassign}
                                                >
                                                    <div className="p-2 cursor-pointer">{pendiente.pendientePrincipal}</div>
                                                </PendienteDialog>
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-2 align-middle w-[150px] min-w-[150px]">
                                            <Select value={pendiente.status} onValueChange={(newStatus) => onUpdateTask(pendiente, { status: newStatus })}>
                                                <SelectTrigger className={cn("text-white w-full justify-center text-xs h-8 border-0", statusColors[pendiente.status])}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {Object.keys(statusColors).map(s => (
                                                        <SelectItem key={s} value={s}>{s}</SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </TableCell>
                                        {(isContenido || isAds) && index === 0 && (
                                            <TableCell rowSpan={displayRowSpan} className="p-2 align-middle text-center border-l">
                                                <Label htmlFor={`fecha-corte-${client.id}`} className="sr-only">Fecha de Corte</Label>
                                                <Select
                                                    value={pendiente.client.financialProfile?.fechaCorte?.toString() ?? 'sin-fecha'}
                                                    onValueChange={(value) => onUpdateClientFinancial(client.id, { fechaCorte: value === 'sin-fecha' ? null : parseInt(value) })}
                                                >
                                                    <SelectTrigger className="text-xs h-8" id={`fecha-corte-${client.id}`}>
                                                        <SelectValue>{pendiente.client.financialProfile?.fechaCorte ?? 'Sin fecha'}</SelectValue>
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="sin-fecha">Sin fecha</SelectItem>
                                                        <SelectItem value="15">15</SelectItem>
                                                        <SelectItem value="30">30</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        )}
                                        {isContenido && index === 0 && (
                                            <TableCell rowSpan={displayRowSpan} className="p-2 align-middle text-center border-l">
                                                <Label htmlFor={`contenido-programado-${client.id}`} className="sr-only">Contenido Programado Hasta</Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            id={`contenido-programado-${client.id}`}
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full justify-start text-left font-normal text-xs h-8",
                                                                !pendiente.client.financialProfile?.contenidoProgramadoHasta && "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {pendiente.client.financialProfile?.contenidoProgramadoHasta ? format(new Date(pendiente.client.financialProfile.contenidoProgramadoHasta), "dd MMM yyyy") : <span>Sin fecha</span>}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0">
                                                        <Calendar
                                                            mode="single"
                                                            selected={pendiente.client.financialProfile?.contenidoProgramadoHasta ? new Date(pendiente.client.financialProfile.contenidoProgramadoHasta) : undefined}
                                                            onSelect={(date) => onUpdateClientFinancial(client.id, { contenidoProgramadoHasta: date || null })}
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </TableCell>
                                        )}
                                        {isContenido && index === 0 && (
                                            <>
                                                <TableCell rowSpan={displayRowSpan} className="p-0 align-middle text-center border-l">
                                                    <ClientDataDialog pendientes={pendientes} onRefresh={onRefresh}>
                                                        <div className="cursor-pointer hover:bg-muted p-2 rounded-md h-full flex items-center justify-center whitespace-pre-wrap min-h-[60px]">
                                                            {pendientes[0].client?.publicacionesAlMes || <span className="text-muted-foreground">-</span>}
                                                        </div>
                                                    </ClientDataDialog>
                                                </TableCell>
                                                <TableCell rowSpan={displayRowSpan} className="p-0 align-middle text-center border-l">
                                                    <ClientDataDialog pendientes={pendientes} onRefresh={onRefresh}>
                                                        <div className="cursor-pointer hover:bg-muted p-2 rounded-md h-full flex items-center justify-center whitespace-pre-wrap min-h-[60px]">
                                                            {pendientes[0].client?.publicacionesALaSemana || <span className="text-muted-foreground">-</span>}
                                                        </div>
                                                    </ClientDataDialog>
                                                </TableCell>
                                            </>
                                        )}
                                        {isAds && index === 0 && (
                                            <TableCell rowSpan={displayRowSpan} className="p-2 align-middle text-center border-l">
                                                <AdsMetricsDialog pendiente={pendientes[0]} onSave={(data) => onUpdateTask(pendientes[0], data)}>
                                                    <div className="cursor-pointer hover:bg-muted p-1 rounded-md text-xs space-y-2">
                                                        {pendientes[0].hasFacebookAds && (
                                                            <div className='flex items-center gap-2'>
                                                                <Facebook className="w-4 h-4 text-blue-600" />
                                                                <div>
                                                                    <p>Msj: {pendientes[0].facebookAdsMessages || '-'}</p>
                                                                    <p>Int: {pendientes[0].facebookAdsInteraction || '-'}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {pendientes[0].hasTiktokAds && (
                                                            <div className='flex items-center gap-2'>
                                                                <TikTokIcon className='w-4 h-4' />
                                                                <div>
                                                                    <p>Msj: {pendientes[0].tiktokAdsMessages || '-'}</p>
                                                                    <p>Int: {pendientes[0].tiktokAdsInteraction || '-'}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {pendientes[0].hasGoogleAds && (
                                                            <div className='flex items-center gap-2'>
                                                                <Bot className="w-4 h-4 text-green-500" />
                                                                <div>
                                                                    <p>Msj: {pendientes[0].googleAdsMessages || '-'}</p>
                                                                    <p>Int: {pendientes[0].googleAdsInteraction || '-'}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {pendientes[0].hasLinkedinAds && (
                                                            <div className='flex items-center gap-2'>
                                                                <Linkedin className="w-4 h-4 text-sky-700" />
                                                                <div>
                                                                    <p>Msj: {pendientes[0].linkedinAdsMessages || '-'}</p>
                                                                    <p>Int: {pendientes[0].linkedinAdsInteraction || '-'}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        {(!pendientes[0].hasFacebookAds && !pendientes[0].hasTiktokAds && !pendientes[0].hasGoogleAds && !pendientes[0].hasLinkedinAds) && <span className='text-muted-foreground'>-</span>}
                                                    </div>
                                                </AdsMetricsDialog>
                                            </TableCell>
                                        )}
                                        {isContenido && index === 0 && (
                                            <TableCell className="p-2 text-center align-middle" rowSpan={displayRowSpan}>
                                                <ScheduleRecordingDialog
                                                    event={pendientes[0]?.recordingEvent}
                                                    pendienteId={pendientes[0]?.id}
                                                    clientName={pendientes[0]?.clienteName}
                                                    project={pendientes[0]?.pendientePrincipal}
                                                    assignedToName={pendientes[0]?.ejecutor}
                                                    onSave={onRefresh}
                                                >
                                                    <div className="cursor-pointer hover:bg-muted p-2 rounded-md h-full flex flex-col justify-center">
                                                        {pendientes[0]?.recordingEvent ? (
                                                            <div className="flex flex-col h-auto text-xs font-semibold">
                                                                <span>{format(new Date(pendientes[0].recordingEvent.fullStart), 'dd MMM', { locale: es })}</span>
                                                                <span className='text-xs text-muted-foreground'>{format(new Date(pendientes[0].recordingEvent.fullStart), 'HH:mm')}</span>
                                                            </div>
                                                        ) : <span className="text-xs text-muted-foreground">No agendado</span>}
                                                    </div>
                                                </ScheduleRecordingDialog>
                                            </TableCell>
                                        )}
                                    </TableRow>
                                ))}
                                {canAddPendiente && (
                                    <TableRow>
                                        <TableCell colSpan={isContenido ? 7 : (isAds ? 5 : 4)}>
                                            {addingToClientId === client.id ? (
                                                <AddPendienteInline
                                                    client={client}
                                                    categoria={categoria}
                                                    onAdd={handleAddPendienteAction}
                                                    onCancel={() => setAddingToClientId(null)}
                                                    currentUser={currentUser}
                                                    firstPendiente={pendientes[0]}
                                                />
                                            ) : (
                                                <div className="h-full">
                                                    <Button variant="ghost" size="sm" className="w-full h-full justify-start text-muted-foreground" onClick={() => setAddingToClientId(client.id)}>
                                                        <Plus className="w-4 h-4 mr-2" />
                                                        Añadir pendiente
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell colSpan={3}></TableCell>
                                    </TableRow>
                                )}
                            </React.Fragment>
                        )
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

const BoardView = ({ data, onUpdateTask, currentUser, onRefresh, onAddPendiente }: {
    data: PendienteWithClient[];
    onUpdateTask: (task: PendienteWithClient, data: Partial<PendienteMaw>) => void;
    currentUser: any;
    onRefresh: () => void;
    onAddPendiente: (data: Omit<PendienteMaw, 'id' | 'createdAt'>) => void;
}) => {
    const statuses = Object.keys(statusColors);
    const canReassign = currentUser?.role === 'admin' || currentUser?.permissions?.pendientes?.reasignarResponsables;
    const canAddPendiente = currentUser?.role === 'admin' || currentUser?.role === 'encargado' || currentUser?.role === 'ejecutor';
    const [addingToClientId, setAddingToClientId] = useState<number | null>(null);

    const groupedByClientAndStatus = useMemo(() => {
        const initialGroups: Record<string, Record<string, PendienteWithClient[]>> = {};
        statuses.forEach(status => initialGroups[status] = {});

        return data.reduce((acc, pendiente) => {
            if (!acc[pendiente.status]) {
                acc[pendiente.status] = {};
            }
            if (!acc[pendiente.status][pendiente.clienteName]) {
                acc[pendiente.status][pendiente.clienteName] = [];
            }
            acc[pendiente.status][pendiente.clienteName].push(pendiente);
            return acc;
        }, initialGroups);
    }, [data, statuses]);


    return (
        <div className="flex gap-4 mt-4 overflow-x-auto pb-4">
            {statuses.map(status => (
                <div
                    key={status}
                    className="bg-muted/50 rounded-lg flex flex-col w-[calc(100vw-2rem)] sm:w-[320px] flex-shrink-0"
                >
                    <div className="p-4 border-b sticky top-0 bg-muted/80 backdrop-blur-sm z-10">
                        <h3 className="font-semibold flex items-center gap-2">
                            <span className={cn("w-3 h-3 rounded-full", statusColors[status])}></span>
                            {status}
                            <Badge variant="secondary" className="ml-2">{Object.values(groupedByClientAndStatus[status]).reduce((sum, tasks) => sum + tasks.length, 0)}</Badge>
                        </h3>
                    </div>
                    <div className="p-2 space-y-3 flex-grow overflow-y-auto min-h-[calc(100vh-20rem)]">
                        {Object.entries(groupedByClientAndStatus[status]).map(([clientName, pendientes]) => {
                            const client = pendientes[0]?.client;
                            return (
                                <Card key={clientName} className={cn("bg-card", pendientes.every(p => p.completed) && "opacity-60")}>
                                    <CardHeader className="p-3 border-b flex-row justify-between items-start">
                                        <div>
                                            <CardTitle className="text-base">{clientName}</CardTitle>
                                            <CardDescription className="text-xs">
                                                {pendientes.length} pendiente(s)
                                            </CardDescription>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-7 w-7">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <ScheduleRecordingDialog
                                                    event={pendientes[0]?.recordingEvent}
                                                    pendienteId={pendientes[0]?.id}
                                                    clientName={pendientes[0]?.clienteName}
                                                    project={pendientes[0]?.pendientePrincipal}
                                                    assignedToName={pendientes[0]?.ejecutor}
                                                    onSave={onRefresh}
                                                >
                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                        <CalendarIcon className="w-4 h-4 mr-2" />Agendar Grabación
                                                    </DropdownMenuItem>
                                                </ScheduleRecordingDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </CardHeader>
                                    <CardContent className="p-3 text-sm space-y-2">
                                        {pendientes.map(pendiente => (
                                            <div key={pendiente.id} className="flex items-start gap-2">
                                                <PendienteDialog
                                                    pendiente={pendiente}
                                                    onSave={(data) => onUpdateTask(pendiente, data)}
                                                    canReassign={canReassign}
                                                >
                                                    <p className={cn("flex-grow cursor-pointer", pendiente.completed && "line-through text-muted-foreground")}>
                                                        {pendiente.pendientePrincipal}
                                                    </p>
                                                </PendienteDialog>
                                            </div>
                                        ))}
                                        {addingToClientId === client.id ? (
                                            <AddPendienteInline
                                                client={client}
                                                categoria={pendientes[0].categoria}
                                                onAdd={onAddPendiente}
                                                onCancel={() => setAddingToClientId(null)}
                                                currentUser={currentUser}
                                                firstPendiente={pendientes[0]}
                                            />
                                        ) : (
                                            canAddPendiente && (
                                                <Button variant="ghost" size="sm" className="w-full h-full justify-start text-muted-foreground text-xs" onClick={() => setAddingToClientId(client.id)}>
                                                    <Plus className="w-3 h-3 mr-1" />
                                                    Añadir pendiente
                                                </Button>
                                            )
                                        )}
                                    </CardContent>
                                    <CardFooter className="p-3 bg-card/50 text-xs text-muted-foreground justify-between">
                                        <span>E: {pendientes[0]?.ejecutor}</span>
                                        <Badge variant="outline" className={cn(categoryColors[pendientes[0]?.categoria])}>{pendientes[0]?.categoria}</Badge>
                                    </CardFooter>
                                </Card>
                            )
                        })}
                        {Object.keys(groupedByClientAndStatus[status]).length === 0 && (
                            <div className="text-center py-8 text-xs text-muted-foreground">
                                No hay pendientes en este estado.
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};


export default function PendientesPage() {
    const { user, loading: userLoading } = useAuth();
    const [pendientes, setPendientes] = useState<PendienteWithClient[]>([]);
    const [clients, setClients] = useState<(Client & { financialProfile: ClientFinancialProfile | null; })[]>([]);
    const [ejecutorFilter, setEjecutorFilter] = useState('Todos');
    const [searchFilter, setSearchFilter] = useState('');
    const [fechaCorteFilter, setFechaCorteFilter] = useState('Todos');
    const [contenidoProgramadoFilter, setContenidoProgramadoFilter] = useState('Todos');
    const isMobile = useIsMobile();
    const [viewMode, setViewMode] = useState<'table' | 'board'>(isMobile ? 'board' : 'table');
    const [selectedPendientes, setSelectedPendientes] = useState<number[]>([]);

    const [activeTab, setActiveTab] = useState('contenido');
    const { toast } = useToast();

    useEffect(() => {
        if (isMobile) {
            setViewMode('board');
        } else {
            setViewMode('table');
        }
    }, [isMobile]);

    const fetchData = async () => {
        try {
            const [pendientesData, clientsData] = await Promise.all([
                getPendientes(),
                getClients()
            ]);
            setPendientes(pendientesData as PendienteWithClient[]);
            setClients(clientsData as (Client & { financialProfile: ClientFinancialProfile | null; })[]);
        } catch (error) {
            console.error("Failed to fetch data:", error);
            toast({
                title: "Error al cargar datos",
                description: "No se pudieron obtener los pendientes o clientes. Intenta recargar la página.",
                variant: "destructive"
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleUpdateTask = async (task: PendienteWithClient, data: Partial<PendienteMaw>) => {
        try {
            await updatePendiente(task.id, data);
            toast({ title: 'Éxito', description: 'El pendiente ha sido actualizado.' });
            startTransition(() => {
                fetchData();
            });
        } catch (error) {
            toast({ title: "Error", description: "No se pudo actualizar el pendiente.", variant: "destructive" });
        }
    };

    const handleUpdateClientFinancial = async (clientId: number, data: Partial<Omit<ClientFinancialProfile, 'id' | 'clientId'>>) => {
        try {
            await updateClientFinancialProfile(clientId, data);
            toast({ title: 'Éxito', description: 'Datos del cliente actualizados.' });
            startTransition(() => {
                fetchData();
            });
        } catch (error) {
            toast({ title: "Error", description: "No se pudo actualizar los datos del cliente.", variant: "destructive" });
        }
    };

    const handleAddPendienteAction = async (data: Omit<PendienteMaw, 'id' | 'createdAt'>) => {
        try {
            await addPendiente(data);
            startTransition(() => {
                fetchData();
            });
        } catch (error) {
            toast({ title: 'Error', description: 'No se pudo añadir el pendiente', variant: 'destructive' });
        }
    };

    const handleUpdatePendienteText = async (id: number, text: string) => {
        try {
            await updatePendiente(id, { pendientePrincipal: text });
            toast({ title: "Éxito", description: "Pendiente actualizado." });
            startTransition(() => {
                fetchData();
            });
        } catch (error) {
            toast({ title: "Error", description: "No se pudo actualizar el pendiente.", variant: "destructive" });
        }
    };

    const visiblePendientes = useMemo(() => {
        if (!user) return [];

        if (user.role === 'admin' || user.role === 'contabilidad' || user.name === 'Luis') {
            return pendientes;
        }

        return pendientes.filter(p => p.ejecutor === user.name);
    }, [pendientes, user]);

    const ejecutores = useMemo(() => {
        if (user?.role === 'admin') {
            return Array.from(new Set(pendientes.map(p => p.ejecutor))).filter(Boolean).sort();
        }
        if (user?.role === 'ejecutor') {
            return [user.name];
        }
        return Array.from(new Set(visiblePendientes.map(p => p.ejecutor))).filter(Boolean).sort();
    }, [pendientes, user, visiblePendientes]);


    const filteredData = useMemo(() => {
        return visiblePendientes.filter(item => {
            const ejecutorMatch = ejecutorFilter === 'Todos' || item.ejecutor === ejecutorFilter;
            const searchMatch = searchFilter === '' || item.clienteName.toLowerCase().includes(searchFilter.toLowerCase()) || item.pendientePrincipal.toLowerCase().includes(searchFilter.toLowerCase());

            const fechaCorte = item.client?.financialProfile?.fechaCorte?.toString() || 'Sin fecha';
            const fechaCorteMatch = fechaCorteFilter === 'Todos' || fechaCorte === fechaCorteFilter;

            const contenidoProgramado = item.client?.financialProfile?.contenidoProgramadoHasta?.toString() || 'Sin fecha';
            const contenidoProgramadoMatch = contenidoProgramadoFilter === 'Todos' || contenidoProgramado === contenidoProgramadoFilter;

            return ejecutorMatch && searchMatch && fechaCorteMatch && contenidoProgramadoMatch;
        });
    }, [ejecutorFilter, searchFilter, visiblePendientes, fechaCorteFilter, contenidoProgramadoFilter]);

    const tasksPerCategory = useMemo(() => {
        const activePendientes = filteredData.filter(d => !d.completed);
        return {
            contenido: activePendientes.some(d => d.categoria.toLowerCase() === 'contenido'),
            ads: activePendientes.some(d => d.categoria.toLowerCase() === 'ads'),
            web: activePendientes.some(d => d.categoria.toLowerCase() === 'web'),
            general: activePendientes.some(d => d.categoria.toLowerCase() === 'general'),
        };
    }, [filteredData]);

    const canManage = user?.role === 'admin' || user?.role === 'encargado' || user?.role === 'ejecutor';
    const canDeleteAll = user?.permissions?.pendientes?.borrarPendientes;

    // Verificar si el usuario puede eliminar al menos un pendiente (sus propios pendientes o tiene permiso general)
    const canDeleteOwn = useMemo(() => {
        if (canDeleteAll) return true;
        // Si tiene pendientes seleccionados que son suyos, puede eliminarlos
        return selectedPendientes.some(id => {
            const pendiente = pendientes.find(p => p.id === id);
            return pendiente && pendiente.ejecutor === user?.name;
        });
    }, [canDeleteAll, selectedPendientes, pendientes, user?.name]);

    const handleSelectionChange = (id: number, checked: boolean) => {
        setSelectedPendientes(prev =>
            checked ? [...prev, id] : prev.filter(pId => pId !== id)
        );
    };

    const handleBulkDelete = async () => {
        // Filtrar pendientes completados que el usuario puede eliminar
        const completedToDelete = pendientes
            .filter(p => {
                if (!selectedPendientes.includes(p.id)) return false;
                if (!p.completed) return false;
                // Si tiene permiso general, puede eliminar cualquiera
                if (canDeleteAll) return true;
                // Si no, solo puede eliminar los suyos
                return p.ejecutor === user?.name;
            })
            .map(p => p.id);

        if (completedToDelete.length === 0) {
            toast({ title: 'Nada para eliminar', description: 'Solo puedes eliminar pendientes completados que te pertenecen.', variant: 'default' });
            return;
        }

        try {
            await deletePendientes(completedToDelete);
            toast({ title: 'Éxito', description: `${completedToDelete.length} pendiente(s) completado(s) eliminado(s).` });
            setSelectedPendientes([]);
            startTransition(() => {
                fetchData();
            });
        } catch (error) {
            toast({ title: 'Error', description: 'No se pudo completar la eliminación.', variant: 'destructive' });
        }
    };


    if (userLoading) {
        return (
            <div className="flex items-center justify-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!user) {
        return <div>Cargando...</div>
    }

    const getFilteredDataForTab = (categoria: string) => {
        if (categoria === 'todos') {
            return filteredData; // Retornar todos los datos sin filtrar por categoría
        }
        return filteredData.filter(d => d.categoria.toLowerCase() === categoria.toLowerCase());
    }


    return (
        <div>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4'>
                <h1 className="text-3xl font-bold font-headline">Pendientes de Equipo</h1>
                {canManage && (
                    <AddPendienteDialog clients={clients} onAdd={handleAddPendienteAction}>
                        <Button className='w-full sm:w-auto'><PlusCircle className="w-4 h-4 mr-2" /> Añadir Pendiente Manual</Button>
                    </AddPendienteDialog>
                )}
            </div>

            <Card className="mb-4">
                <div className="p-4">
                    {/* Filtros siempre visibles */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div>
                            <Label>Buscar Cliente</Label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    className="pl-9"
                                    placeholder="Buscar por cliente o pendiente..."
                                    value={searchFilter}
                                    onChange={(e) => setSearchFilter(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Ejecutor</Label>
                            <Select value={ejecutorFilter} onValueChange={setEjecutorFilter} disabled={user?.role === 'ejecutor'}>
                                <SelectTrigger>
                                    <div className="flex items-center gap-2">
                                        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                                        <SelectValue placeholder="Filtrar por Ejecutor" />
                                    </div>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Todos">Todos los Ejecutores</SelectItem>
                                    {ejecutores.map(e => e ? <SelectItem key={e} value={e}>{e}</SelectItem> : null)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end gap-2">
                            <Button variant={viewMode === 'table' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('table')}><List className="w-5 h-5" /></Button>
                            <Button variant={viewMode === 'board' ? 'secondary' : 'ghost'} size="icon" onClick={() => setViewMode('board')}><Kanban className="w-5 h-5" /></Button>
                        </div>
                    </div>

                    {/* Filtros adicionales colapsables */}
                    <Accordion type="single" collapsible>
                        <AccordionItem value="filters" className='border-b-0'>
                            <AccordionTrigger className="p-0 hover:no-underline">
                                <div className='flex items-center gap-2 text-sm font-medium text-muted-foreground'>
                                    <SlidersHorizontal className="w-4 h-4" />
                                    Más filtros
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <Label>Fecha de Corte</Label>
                                        <Select value={fechaCorteFilter} onValueChange={setFechaCorteFilter}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Todos">Todas las Fechas</SelectItem>
                                                <SelectItem value="15">15</SelectItem>
                                                <SelectItem value="30">30</SelectItem>
                                                <SelectItem value="Sin fecha">Sin fecha</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label>Contenido Programado</Label>
                                        <Select value={contenidoProgramadoFilter} onValueChange={setContenidoProgramadoFilter}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Todos">Todas las Fechas</SelectItem>
                                                <SelectItem value="15">15</SelectItem>
                                                <SelectItem value="30">30</SelectItem>
                                                <SelectItem value="Sin fecha">Sin fecha</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </Card>

            {selectedPendientes.length > 0 && (canDeleteAll || canDeleteOwn) && (
                <div className="flex items-center gap-4 bg-muted p-2 rounded-md my-4">
                    <span className="text-sm font-medium">{selectedPendientes.length} seleccionado(s)</span>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm"><Trash2 className="w-4 h-4 mr-2" />Eliminar seleccionados</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Esta acción eliminará permanentemente los pendientes <strong>completados</strong> que has seleccionado{!canDeleteAll && ' y que te pertenecen'}. Los pendientes no completados no se verán afectados.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleBulkDelete}>Confirmar</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedPendientes([])}><X className="w-4 h-4" /></Button>
                </div>
            )}

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 overflow-x-auto whitespace-nowrap">
                <span>Filtros:</span>
                <span className="font-semibold text-foreground">{searchFilter || 'Todos'}</span>
                <ChevronRight className="w-4 h-4 flex-shrink-0" />
                <span className="font-semibold text-foreground">{ejecutorFilter}</span>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="todos" className="flex items-center gap-2">
                        {(tasksPerCategory.contenido || tasksPerCategory.ads || tasksPerCategory.web || tasksPerCategory.general) && (
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Lightbulb className="w-4 h-4 text-primary" />
                            </motion.div>
                        )}
                        Todos
                    </TabsTrigger>
                    <TabsTrigger value="contenido" className="flex items-center gap-2">
                        {tasksPerCategory.contenido && (
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Lightbulb className="w-4 h-4 text-primary" />
                            </motion.div>
                        )}
                        Contenido
                    </TabsTrigger>
                    <TabsTrigger value="ads" className="flex items-center gap-2">
                        {tasksPerCategory.ads && (
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Lightbulb className="w-4 h-4 text-primary" />
                            </motion.div>
                        )}
                        Ads
                    </TabsTrigger>
                    <TabsTrigger value="web" className="flex items-center gap-2">
                        {tasksPerCategory.web && (
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Lightbulb className="w-4 h-4 text-primary" />
                            </motion.div>
                        )}
                        Web
                    </TabsTrigger>
                    <TabsTrigger value="general" className="flex items-center gap-2">
                        {tasksPerCategory.general && (
                            <motion.div
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Lightbulb className="w-4 h-4 text-primary" />
                            </motion.div>
                        )}
                        General
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="todos">
                    {viewMode === 'table' ? (
                        <PendientesTable
                            data={getFilteredDataForTab('todos')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onUpdatePendienteText={handleUpdatePendienteText}
                            clients={clients}
                            categoria="Todos"
                            selectedPendientes={selectedPendientes}
                            onSelectionChange={handleSelectionChange}
                            onUpdateClientFinancial={handleUpdateClientFinancial}
                        />
                    ) : (
                        <BoardView
                            data={getFilteredDataForTab('todos')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onAddPendiente={handleAddPendienteAction}
                        />
                    )}
                </TabsContent>

                <TabsContent value="contenido">
                    {viewMode === 'table' ? (
                        <PendientesTable
                            data={getFilteredDataForTab('contenido')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onUpdatePendienteText={handleUpdatePendienteText}
                            clients={clients}
                            categoria="Contenido"
                            selectedPendientes={selectedPendientes}
                            onSelectionChange={handleSelectionChange}
                            onUpdateClientFinancial={handleUpdateClientFinancial}
                        />
                    ) : (
                        <BoardView
                            data={getFilteredDataForTab('contenido')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onAddPendiente={handleAddPendienteAction}
                        />
                    )}
                </TabsContent>

                <TabsContent value="ads">
                    {viewMode === 'table' ? (
                        <PendientesTable
                            data={getFilteredDataForTab('ads')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onUpdatePendienteText={handleUpdatePendienteText}
                            clients={clients}
                            categoria="Ads"
                            selectedPendientes={selectedPendientes}
                            onSelectionChange={handleSelectionChange}
                            onUpdateClientFinancial={handleUpdateClientFinancial}
                        />
                    ) : (
                        <BoardView
                            data={getFilteredDataForTab('ads')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onAddPendiente={handleAddPendienteAction}
                        />
                    )}
                </TabsContent>

                <TabsContent value="web">
                    {viewMode === 'table' ? (
                        <PendientesTable
                            data={getFilteredDataForTab('web')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onUpdatePendienteText={handleUpdatePendienteText}
                            clients={clients}
                            categoria="Web"
                            selectedPendientes={selectedPendientes}
                            onSelectionChange={handleSelectionChange}
                            onUpdateClientFinancial={handleUpdateClientFinancial}
                        />
                    ) : (
                        <BoardView
                            data={getFilteredDataForTab('web')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onAddPendiente={handleAddPendienteAction}
                        />
                    )}
                </TabsContent>

                <TabsContent value="general">
                    {viewMode === 'table' ? (
                        <PendientesTable
                            data={getFilteredDataForTab('general')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onUpdatePendienteText={handleUpdatePendienteText}
                            clients={clients}
                            categoria="General"
                            selectedPendientes={selectedPendientes}
                            onSelectionChange={handleSelectionChange}
                            onUpdateClientFinancial={handleUpdateClientFinancial}
                        />
                    ) : (
                        <BoardView
                            data={getFilteredDataForTab('general')}
                            onUpdateTask={handleUpdateTask}
                            currentUser={user}
                            onRefresh={fetchData}
                            onAddPendiente={handleAddPendienteAction}
                        />
                    )}
                </TabsContent>
            </Tabs>
        </div>
    );
}
