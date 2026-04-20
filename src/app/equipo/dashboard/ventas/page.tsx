

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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Check, Sparkles, PlusCircle, Trash2, Phone } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { useToast } from '@/hooks/use-toast';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, isToday, subDays, startOfMonth, endOfMonth, isWithinInterval, subMonths } from 'date-fns';
import { es } from 'date-fns/locale';
import { getProspects, addMawProspect, convertProspectToClient, updateProspect, deleteProspect, bulkAddMawProspects } from './_actions';
import type { Prospect, NewProspect, Colaborador } from '@/lib/db/schema';
import { teamMembers } from '@/lib/team-data';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import WhatsappIcon from '@/components/icons/whatsapp-icon';
import { Textarea } from '@/components/ui/textarea';


type OrigenLead = "Facebook" | "TikTok" | "Referencia" | "Sitio Web" | "Instagram" | string;
type StatusLead = "Lead Nuevo" | "Contactado" | "Videollamada" | "En Negociación" | "Convertido" | "No Interesado";
type ResponsableVentas = "Alma" | "Fer" | "Julio" | "Aldo" | "Alexis" | "Fany" | "Isra" | "Dani Escobar";

const statusColors: Record<StatusLead, string> = {
    "Lead Nuevo": "bg-blue-500",
    "Contactado": "bg-cyan-500",
    "Videollamada": "bg-purple-500",
    "En Negociación": "bg-yellow-500 text-black",
    "Convertido": "bg-green-500",
    "No Interesado": "bg-gray-500",
};

const responsables: ResponsableVentas[] = ["Alma", "Fer", "Julio", "Aldo", "Alexis", "Fany", "Isra", "Dani Escobar"];
const statuses: StatusLead[] = ["Lead Nuevo", "Contactado", "Videollamada", "En Negociación", "Convertido", "No Interesado"];
const leadSources: OrigenLead[] = ["Referencia", "Sitio Web", "TikTok", "Facebook", "Instagram"];

const AddLeadDialog = ({ onAction, children, prospect, isEditing }: { onAction: () => Promise<void>, children: React.ReactNode, prospect?: Prospect | null, isEditing: boolean }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [company, setCompany] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [source, setSource] = useState<OrigenLead>('Referencia');
    const [status, setStatus] = useState<StatusLead>('Lead Nuevo');
    const [responsable, setResponsable] = useState<ResponsableVentas | ''>('');
    const [notas, setNotas] = useState('');

    const { toast } = useToast();

    useEffect(() => {
        if (open && isEditing && prospect) {
            setName(prospect.name || '');
            setCompany(prospect.company || '');
            setEmail(prospect.email || '');
            setPhone(prospect.phone || '');
            setSource(prospect.source || 'Referencia');
            setStatus(prospect.status as StatusLead || 'Lead Nuevo');
            setResponsable(prospect.responsable as ResponsableVentas || '');
            setNotas(prospect.notas || '');
        } else {
            resetForm();
        }
    }, [open, isEditing, prospect])

    const resetForm = () => {
        setName(''); setCompany(''); setEmail(''); setPhone(''); setSource('Referencia');
        setStatus('Lead Nuevo'); setResponsable(''); setNotas('');
    }

    const handleSave = async () => {
        if (!name || !company) {
            toast({
                title: "Error",
                description: "El nombre del contacto y de la empresa son obligatorios.",
                variant: "destructive",
            });
            return;
        }

        const dataToSave: Partial<NewProspect> = { name, company, email, phone, source, status, notas, responsable: responsable || undefined, data: { name, company, email, phone, source, status, notas, responsable } };

        try {
            if (isEditing && prospect) {
                await updateProspect(prospect.id, dataToSave);
                 toast({ title: "Éxito", description: `Prospecto actualizado.` });
            } else {
                await addMawProspect(dataToSave);
                toast({ title: "Prospecto Añadido", description: `${name || company} se ha añadido al pipeline.` });
            }
            
            startTransition(() => {
                onAction();
                setOpen(false);
                resetForm();
            });
        } catch (error: any) {
             toast({ title: "Error", description: error.message || 'No se pudo guardar el prospecto.', variant: 'destructive' });
        }
    };
    
    const handleDelete = async () => {
        if (prospect) {
            try {
                await deleteProspect(prospect.id);
                toast({ title: 'Éxito', description: 'Prospecto eliminado.' });
                startTransition(() => {
                    onAction();
                    setOpen(false);
                });
            } catch(e: any) {
                toast({ title: 'Error', description: e.message || 'No se pudo eliminar el prospecto.', variant: 'destructive' });
            }
        }
    }

    return (
        <Dialog open={open} onOpenChange={(o) => {setOpen(o); if (!o) resetForm()}}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Editar' : 'Añadir Nuevo'} Prospecto</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-2">
                    <div className="space-y-2">
                        <Label htmlFor="cliente">Nombre del Contacto*</Label>
                        <Input id="cliente" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Juan Pérez" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="empresa">Nombre de la Empresa*</Label>
                        <Input id="empresa" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Ej. Tacos El Veloz" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="contacto@ejemplo.com" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="telefono">Teléfono</Label>
                        <Input id="telefono" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="5512345678" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="source">Origen del Prospecto</Label>
                        <Select value={source} onValueChange={(value) => setSource(value as OrigenLead)}>
                            <SelectTrigger id="source"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {leadSources.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                    {isEditing && (
                        <>
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <Select value={status} onValueChange={(v) => setStatus(v as StatusLead)}>
                                <SelectTrigger id="status"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="responsable">Responsable</Label>
                            <Select value={responsable} onValueChange={(v) => setResponsable(v as ResponsableVentas)}>
                                <SelectTrigger id="responsable"><SelectValue placeholder="Asignar"/></SelectTrigger>
                                <SelectContent>
                                    {responsables.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        </>
                    )}
                    <div className="space-y-2">
                        <Label htmlFor="notas">Notas</Label>
                        <Textarea id="notas" value={notas} onChange={(e) => setNotas(e.target.value)} placeholder="Añade notas importantes sobre el prospecto aquí..." />
                    </div>
                </div>
                <DialogFooter className="justify-between">
                    <div>
                    {isEditing && (
                         <AlertDialog>
                            <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="w-4 h-4 mr-2"/>Eliminar</Button></AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>Esta acción es irreversible y eliminará permanentemente este prospecto.</AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )}
                    </div>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSave}>{isEditing ? 'Guardar Cambios' : 'Añadir Prospecto'}</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const BulkAddLeadsDialog = ({ onAction }: { onAction: () => Promise<void> }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState('');
    const { toast } = useToast();

    const handleSave = async () => {
        if (!text.trim()) {
            toast({ title: 'Error', description: 'El campo de texto está vacío.', variant: 'destructive' });
            return;
        }

        const lines = text.trim().split('\n').slice(1); // Saltar encabezado
        const prospectsToAdd: Partial<NewProspect>[] = [];
        
        const columnIndices = {
            form_name: 9,
            Email: 10,
            Name: 11,
            'Phone number': 12,
        };

        for (const line of lines) {
            const columns = line.split('\t');
            if (columns.length > Math.max(...Object.values(columnIndices))) {
                const formName = columns[columnIndices.form_name];
                
                if (formName && formName.toLowerCase().includes('aldo form')) {
                    prospectsToAdd.push({
                        name: columns[columnIndices.Name]?.trim() || '',
                        company: '', 
                        email: columns[columnIndices.Email]?.trim() || null,
                        phone: columns[columnIndices['Phone number']]?.trim() || null,
                        source: 'Campaña Aldo',
                        data: { raw: line }
                    });
                }
            }
        }
        
        if (prospectsToAdd.length === 0) {
            toast({ title: 'Sin coincidencias', description: 'No se encontraron prospectos del "Aldo form" en los datos ingresados.', variant: 'default' });
            return;
        }

        try {
            await bulkAddMawProspects(prospectsToAdd);
            toast({ title: 'Éxito', description: `${prospectsToAdd.length} prospecto(s) de campaña han sido añadidos.` });
            startTransition(() => {
                onAction();
                setOpen(false);
                setText('');
            });
        } catch(error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                 <Button variant="outline"><PlusCircle className="w-4 h-4 mr-2" /> Añadir Prospectos Campaña</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
                <DialogHeader>
                    <DialogTitle>Añadir Prospectos de Campaña</DialogTitle>
                    <DialogDescription>Pega aquí los datos exportados. El sistema filtrará y añadirá automáticamente los prospectos del "Aldo form".</DialogDescription>
                </DialogHeader>
                 <div className="py-4">
                    <Textarea 
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Pega aquí tus datos, incluyendo la fila de encabezado..."
                        className="h-64"
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar Prospectos</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};


const adsTeam: Colaborador[] = teamMembers.filter(m => ['Julio', 'Luis', 'Fany', 'Carlos', 'Paola', 'Cristhian', 'Daniel'].includes(m.name));
const webTeam: Colaborador[] = teamMembers.filter(m => ['Julio', 'Fernando', 'Alexis Aldarozo'].includes(m.name));
const contenidoEncargados: Colaborador[] = teamMembers.filter(m => ['Luis', 'Carlos', 'Fany'].includes(m.name));
const ejecutoresPorEncargado: Record<string, string[]> = {
    'Luis': ['Luis', 'Paola', 'Kari', 'Alexis Aldarozo', 'Alexis Quiroz'],
    'Carlos': ['Carlos', 'Pedro'],
    'Fany': ['Fany', 'Daniel', 'Cristhian', 'Aldair']
};

const ConvertLeadDialog = ({ prospect, onSave, children }: { prospect: Prospect | null, onSave: () => void, children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    
    // Client Form State
    const [name, setName] = useState('');
    const [representativeName, setRepresentativeName] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');
    const [serviceType, setServiceType] = useState<'Iguala' | 'Proyecto' | 'Ambos' | ''>('');
    const [areas, setAreas] = useState<string[]>([]);
    const [responsables, setResponsables] = useState<{
        contenido?: { encargado: string; ejecutor: string };
        ads?: { responsable: string };
        web?: { responsable: string };
    }>({});
    const [availableEjecutores, setAvailableEjecutores] = useState<Colaborador[]>([]);

    useEffect(() => {
        if (prospect && open) {
            setName(prospect.company || '');
            setRepresentativeName(prospect.name || '');
            setWhatsapp(prospect.phone || '');
            setEmail(prospect.email || '');
            // Reset other fields
            setServiceType('');
            setAreas([]);
            setResponsables({});
            setAvailableEjecutores([]);
        }
    }, [prospect, open]);

    const resetForm = () => {
        setName(''); setRepresentativeName(''); setWhatsapp(''); setEmail(''); setServiceType('');
        setAreas([]); setResponsables({}); setAvailableEjecutores([]);
    }

    const handleEncargadoContenidoChange = (encargadoName: string) => {
        const ejecutoresNombres = ejecutoresPorEncargado[encargadoName] || [];
        const ejecutoresFiltrados = teamMembers.filter(m => ejecutoresNombres.includes(m.name));
        setAvailableEjecutores(ejecutoresFiltrados);
        setResponsables(prev => ({
            ...prev,
            contenido: { encargado: encargadoName, ejecutor: '' }
        }));
    };

    const handleSave = async () => {
        if (!prospect) return;

        if (!name || !representativeName || !whatsapp || areas.length === 0) {
            toast({ title: "Error", description: "Completa todos los campos obligatorios para crear el cliente.", variant: "destructive" });
            return;
        }

        if (
            (areas.includes('Contenido') && (!responsables.contenido?.encargado || !responsables.contenido?.ejecutor)) ||
            (areas.includes('Ads') && !responsables.ads?.responsable) ||
            (areas.includes('Web') && !responsables.web?.responsable)
        ) {
            toast({ title: "Error", description: "Debes asignar responsables para todas las áreas seleccionadas.", variant: "destructive" });
            return;
        }

        const clientData = {
            name,
            representativeName,
            whatsapp,
            email: email || null,
            managedAreas: areas,
            responsables
        };

        try {
            await convertProspectToClient(prospect.id, clientData);
            toast({
                title: "¡Cliente Convertido!",
                description: `${prospect.name || prospect.company} ahora es un cliente y se crearon sus pendientes iniciales.`,
                className: "bg-green-500 text-white"
            });
            startTransition(() => {
                onSave();
                setOpen(false);
                resetForm();
            });
        } catch (error) {
            console.error("Conversion Error:", error);
            toast({ title: "Error", description: "No se pudo convertir el prospecto.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={(o) => {setOpen(o); if(!o) resetForm();}}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Convertir a "{prospect?.name || prospect?.company}" en Cliente</DialogTitle>
                    <DialogDescription>Completa la información para registrar al nuevo cliente y crear sus pendientes iniciales.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto px-2">
                    <Input value={name} onChange={e => setName(e.target.value)} placeholder="Nombre de la Empresa*" />
                    <Input value={representativeName} onChange={e => setRepresentativeName(e.target.value)} placeholder="Nombre del Representante*" />
                    <Input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp* (Ej. 52155...)" />
                    <Input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email (Opcional)" />
                    
                    <Separator className="my-2"/>
                    <h4 className="font-medium">Configuración de Servicios*</h4>
                    
                    <div>
                        <Label>Áreas a Gestionar en Pendientes*</Label>
                        <div className="grid grid-cols-3 gap-4 mt-2">
                        {['Contenido', 'Ads', 'Web'].map(area => (
                            <div key={area} className="flex items-center space-x-2">
                                    <Checkbox id={`area-${area}`} checked={areas.includes(area)} onCheckedChange={(checked) => setAreas(prev => checked ? [...prev, area] : prev.filter(a => a !== area))} />
                                    <Label htmlFor={`area-${area}`}>{area}</Label>
                            </div>
                        ))}
                        </div>
                    </div>
                    {areas.includes('Contenido') && (
                        <div className="grid grid-cols-2 gap-4 border p-3 rounded-md">
                        <Label className="col-span-2 font-semibold">Responsables Contenido*</Label>
                        <Select onValueChange={handleEncargadoContenidoChange} value={responsables.contenido?.encargado || ''}>
                            <SelectTrigger><SelectValue placeholder="Encargado*" /></SelectTrigger>
                            <SelectContent>{contenidoEncargados.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
                        </Select>
                        <Select 
                            onValueChange={(v) => setResponsables(p => ({...p, contenido: {...p.contenido!, ejecutor: v}}))}
                            value={responsables.contenido?.ejecutor || ''}
                            disabled={!responsables.contenido?.encargado}
                        >
                            <SelectTrigger><SelectValue placeholder="Ejecutor*" /></SelectTrigger>
                            <SelectContent>{availableEjecutores.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
                        </Select>
                        </div>
                    )}
                    {areas.includes('Ads') && (
                        <div className="border p-3 rounded-md space-y-2">
                        <Label className="font-semibold">Responsable Ads*</Label>
                        <Select onValueChange={(v) => setResponsables(p => ({...p, ads: {responsable: v}}))} value={responsables.ads?.responsable || ''}>
                                <SelectTrigger><SelectValue placeholder="Seleccionar responsable*" /></SelectTrigger>
                                <SelectContent>{adsTeam.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
                        </Select>
                        </div>
                    )}
                    {areas.includes('Web') && (
                        <div className="border p-3 rounded-md space-y-2">
                        <Label className="font-semibold">Responsable Web*</Label>
                        <Select onValueChange={(v) => setResponsables(p => ({...p, web: {responsable: v}}))} value={responsables.web?.responsable || ''}>
                                <SelectTrigger><SelectValue placeholder="Seleccionar responsable*" /></SelectTrigger>
                                <SelectContent>{webTeam.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
                        </Select>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave}><Check className="w-4 h-4 mr-2"/>Confirmar Conversión</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function VentasPage() {
    const [prospects, setProspects] = useState<Prospect[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [responsableFilter, setResponsableFilter] = useState('Todos');
    const [statusFilter, setStatusFilter] = useState('Todos');
    const [origenFilter, setOrigenFilter] = useState('Todos');
    const [dateFilter, setDateFilter] = useState('Todos');

    const fetchProspectsData = async () => {
        setIsLoading(true);
        const prospectsData = await getProspects();
        const sortedProspects = (prospectsData as Prospect[]).sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
        setProspects(sortedProspects);
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchProspectsData();
    }, []);

    const handleAction = async () => {
        await fetchProspectsData();
    };

    const origenes = useMemo(() => {
        const allOrigins = new Set(prospects.map(l => l.source || 'N/A' ));
        return ['Todos', ...Array.from(allOrigins)];
    }, [prospects]);

    const filteredProspects = useMemo(() => {
        const now = new Date();
        
        return prospects.filter(lead => {
            const responsableMatch = responsableFilter === 'Todos' || lead.responsable === responsableFilter;
            const statusMatch = statusFilter === 'Todos' || lead.status === statusFilter;
            const origenMatch = origenFilter === 'Todos' || lead.source === origenFilter;
            
            if (!lead.createdAt) return responsableMatch && statusMatch && origenMatch;

            const leadDate = new Date(lead.createdAt);
            let dateMatch = true;
            if (dateFilter !== 'Todos') {
                if (dateFilter === 'Hoy') {
                    dateMatch = isToday(leadDate);
                } else if (dateFilter === 'Últimos 7 días') {
                    dateMatch = leadDate >= subDays(now, 7);
                } else if (dateFilter === 'Este mes') {
                    const start = startOfMonth(now);
                    const end = endOfMonth(now);
                    dateMatch = isWithinInterval(leadDate, { start, end });
                } else if (dateFilter === 'Mes pasado') {
                    const lastMonth = subMonths(now, 1);
                    const start = startOfMonth(lastMonth);
                    const end = endOfMonth(lastMonth);
                    dateMatch = isWithinInterval(leadDate, { start, end });
                }
            }
            
            return responsableMatch && statusMatch && origenMatch && dateMatch;
        });
    }, [prospects, responsableFilter, statusFilter, origenFilter, dateFilter]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div></div>;
  }

  return (
    <div className="px-2 sm:px-0">
        {/* Header Responsivo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">Pipeline de Ventas</h1>
            <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <BulkAddLeadsDialog onAction={handleAction} />
                <AddLeadDialog onAction={handleAction} isEditing={false}>
                    <Button className="flex-1 sm:flex-none">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Añadir Prospecto</span>
                        <span className="sm:hidden">Añadir</span>
                    </Button>
                </AddLeadDialog>
            </div>
        </div>
        
       <Card className="border-0 sm:border shadow-none sm:shadow-sm">
        <CardHeader className="px-2 sm:px-6">
            <CardTitle className="text-lg sm:text-xl">Nuevos Prospectos</CardTitle>
            <CardDescription className="text-sm">Gestiona los leads desde el primer contacto hasta la conversión.</CardDescription>
        </CardHeader>
        <CardContent className="px-2 sm:px-6">
            {/* Filtros Móviles - Scroll Horizontal */}
            <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-2 px-2 sm:mx-0 sm:px-0 scrollbar-hide">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="min-w-[120px] h-9 text-xs sm:text-sm bg-secondary/50">
                        <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todos">Todos los status</SelectItem>
                        {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={responsableFilter} onValueChange={setResponsableFilter}>
                    <SelectTrigger className="min-w-[110px] h-9 text-xs sm:text-sm bg-secondary/50">
                        <SelectValue placeholder="Responsable" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todos">Todos</SelectItem>
                        {responsables.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={origenFilter} onValueChange={setOrigenFilter}>
                    <SelectTrigger className="min-w-[100px] h-9 text-xs sm:text-sm bg-secondary/50">
                        <SelectValue placeholder="Origen" />
                    </SelectTrigger>
                    <SelectContent>
                        {origenes.map(o => <SelectItem key={o} value={o!}>{o}</SelectItem>)}
                    </SelectContent>
                </Select>
                <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="min-w-[120px] h-9 text-xs sm:text-sm bg-secondary/50">
                        <SelectValue placeholder="Fecha" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Todos">Todas las fechas</SelectItem>
                        <SelectItem value="Hoy">Hoy</SelectItem>
                        <SelectItem value="Últimos 7 días">Últimos 7 días</SelectItem>
                        <SelectItem value="Este mes">Este mes</SelectItem>
                        <SelectItem value="Mes pasado">Mes pasado</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Vista Desktop - Tabla (oculta en móvil) */}
            <div className="hidden lg:block border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Contacto</TableHead>
                            <TableHead>Empresa</TableHead>
                            <TableHead>Origen</TableHead>
                            <TableHead>Notas</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Responsable</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredProspects.map((lead) => (
                           <AddLeadDialog onAction={handleAction} prospect={lead} isEditing={true} key={lead.id}>
                            <TableRow className="cursor-pointer hover:bg-muted/50 transition-colors">
                                <TableCell className="font-medium">{lead.name}</TableCell>
                                <TableCell>{lead.company}</TableCell>
                                <TableCell>{lead.source}</TableCell>
                                <TableCell className="text-xs text-muted-foreground max-w-[200px] truncate">{lead.notas}</TableCell>
                                <TableCell>
                                    {lead.createdAt ? format(new Date(lead.createdAt), 'dd MMM yyyy', { locale: es }) : 'N/A'}
                                </TableCell>
                                <TableCell>{lead.responsable}</TableCell>
                                <TableCell>
                                    <Badge className={cn("text-white", statusColors[lead.status as StatusLead])}>
                                        {lead.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            const phoneNumber = lead.phone?.replace(/[^0-9]/g, '');
                                            if (phoneNumber) {
                                                const message = encodeURIComponent(`¡Hola ${lead.name || lead.company}! 👋 Soy el Asesor Estratégico de la agencia. Te escribo porque vimos que nos contactaste a través de nuestro video en TikTok sobre marketing digital.\n\nPara entender mejor cómo podemos ayudarte a crecer, ¿podrías contarme un poco sobre tu empresa? ¿Son una startup en crecimiento, una PYME establecida o una marca de productos?`);
                                                window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                                            }
                                        }}
                                        disabled={!lead.phone}
                                        title="Enviar WhatsApp"
                                    >
                                        <WhatsappIcon className="w-5 h-5 text-green-500" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (lead.phone) {
                                                window.location.href = `tel:${lead.phone}`;
                                            }
                                        }}
                                        disabled={!lead.phone}
                                        title="Llamar"
                                    >
                                        <Phone className="w-5 h-5" />
                                    </Button>
                                     <ConvertLeadDialog prospect={lead} onSave={handleAction}>
                                         <Button variant="default" size="sm" onClick={(e) => e.stopPropagation()}>
                                            <Sparkles className="w-4 h-4 mr-2" />
                                            Convertir
                                        </Button>
                                     </ConvertLeadDialog>
                                </TableCell>
                            </TableRow>
                           </AddLeadDialog>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Vista Móvil - Tarjetas (visible solo en móvil/tablet) */}
            <div className="lg:hidden space-y-3">
                {filteredProspects.map((lead) => (
                    <AddLeadDialog onAction={handleAction} prospect={lead} isEditing={true} key={lead.id}>
                        <div className="bg-card border rounded-xl p-4 space-y-3 cursor-pointer active:scale-[0.99] transition-all hover:shadow-md">
                            {/* Header de la Tarjeta */}
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-semibold text-base truncate">{lead.name || 'Sin nombre'}</h3>
                                    <p className="text-sm text-muted-foreground truncate">{lead.company}</p>
                                </div>
                                <Badge className={cn("text-white text-xs shrink-0", statusColors[lead.status as StatusLead])}>
                                    {lead.status}
                                </Badge>
                            </div>
                            
                            {/* Detalles */}
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <span className="text-xs font-medium text-foreground/70">Origen:</span>
                                    <span className="truncate">{lead.source || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-1.5 text-muted-foreground">
                                    <span className="text-xs font-medium text-foreground/70">Fecha:</span>
                                    <span>{lead.createdAt ? format(new Date(lead.createdAt), 'dd MMM', { locale: es }) : 'N/A'}</span>
                                </div>
                                {lead.responsable && (
                                    <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                                        <span className="text-xs font-medium text-foreground/70">Responsable:</span>
                                        <span>{lead.responsable}</span>
                                    </div>
                                )}
                            </div>
                            
                            {/* Notas (si hay) */}
                            {lead.notas && (
                                <p className="text-xs text-muted-foreground bg-secondary/30 rounded-md p-2 line-clamp-2">
                                    {lead.notas}
                                </p>
                            )}
                            
                            {/* Botones de Acción */}
                            <div className="flex gap-2 pt-2 border-t">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 h-10 bg-green-500/10 border-green-500/30 hover:bg-green-500/20"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const phoneNumber = lead.phone?.replace(/[^0-9]/g, '');
                                        if (phoneNumber) {
                                            const message = encodeURIComponent(`¡Hola ${lead.name || lead.company}! 👋 Soy el Asesor Estratégico de la agencia. Te escribo porque vimos que nos contactaste a través de nuestro video en TikTok sobre marketing digital.\n\nPara entender mejor cómo podemos ayudarte a crecer, ¿podrías contarme un poco sobre tu empresa? ¿Son una startup en crecimiento, una PYME establecida o una marca de productos?`);
                                            window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
                                        }
                                    }}
                                    disabled={!lead.phone}
                                >
                                    <WhatsappIcon className="w-5 h-5 text-green-500 mr-2" />
                                    <span className="text-green-600 dark:text-green-400">WhatsApp</span>
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-10 px-3"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (lead.phone) {
                                            window.location.href = `tel:${lead.phone}`;
                                        }
                                    }}
                                    disabled={!lead.phone}
                                >
                                    <Phone className="w-4 h-4" />
                                </Button>
                                <ConvertLeadDialog prospect={lead} onSave={handleAction}>
                                    <Button 
                                        variant="default" 
                                        size="sm" 
                                        className="h-10 px-3 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Sparkles className="w-4 h-4 mr-1" />
                                        <span className="hidden sm:inline">Convertir</span>
                                    </Button>
                                </ConvertLeadDialog>
                            </div>
                        </div>
                    </AddLeadDialog>
                ))}
            </div>

            {filteredProspects.length === 0 && (
                <div className="text-center py-12 px-4">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary/50 flex items-center justify-center">
                        <PlusCircle className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium text-lg mb-1">No hay prospectos</h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        No se encontraron prospectos con los filtros seleccionados. Intenta cambiar los filtros o añade un nuevo prospecto.
                    </p>
                </div>
            )}
        </CardContent>
       </Card>
    </div>
  );
}
