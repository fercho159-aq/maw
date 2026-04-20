
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { Camera, Grip, Lightbulb, Mic, Trash2 } from 'lucide-react';
import { teamMembers } from '@/lib/team-data';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { scheduleRecording, deleteRecording } from '@/app/equipo/dashboard/pendientes/_actions';
import type { RecordingEvent } from '@/lib/db/schema';

const mockEquipment = [
    { id: 'eq1', name: 'Micrófono Hollyland', category: 'audio' as const, available: true },
    { id: 'eq2', name: 'Cámara Sony FX3', category: 'video' as const, available: true },
    { id: 'eq3', name: 'Luz Aputure 600d', category: 'iluminacion' as const, available: true },
    { id: 'eq4', name: 'Estabilizador DJI Ronin', category: 'soporte' as const, available: true },
    { id: 'eq5', name: 'iPhone 15 Pro', category: 'video' as const, available: true },
    { id: 'eq6', name: 'Teleprompter', category: 'soporte' as const, available: true }
];

const productionTeam = teamMembers.filter(member => 
    ['admin', 'encargado', 'ejecutor', 'julio', 'alma', 'fernando', 'luis', 'fany', 'carlos', 'paola', 'cristhian', 'daniel', 'alexis', 'bere', 'kari', 'aldair', 'pedro'].includes(member.role)
);


const equipmentCategoryIcons = {
    audio: <Mic className="w-4 h-4" />,
    video: <Camera className="w-4 h-4" />,
    iluminacion: <Lightbulb className="w-4 h-4" />,
    soporte: <Grip className="w-4 h-4" />
};

type ScheduleRecordingDialogProps = {
    event: RecordingEvent | null | undefined;
    pendienteId: number;
    clientName: string;
    project: string | null;
    assignedToName: string;
    children: React.ReactNode;
    onSave: () => void;
};

export function ScheduleRecordingDialog({ event, pendienteId, clientName, project, assignedToName, children, onSave }: ScheduleRecordingDialogProps) {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const [assignedTo, setAssignedTo] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endDate, setEndDate] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [locationType, setLocationType] = useState<RecordingEvent['locationType']>('estudio');
    const [assignedEquipment, setAssignedEquipment] = useState<string[]>([]);

    useEffect(() => {
        if (open) {
            if (event) {
                setAssignedTo(event.assignedTo);
                setStartDate(format(new Date(event.fullStart), 'yyyy-MM-dd'));
                setStartTime(format(new Date(event.fullStart), 'HH:mm'));
                setEndDate(format(new Date(event.fullEnd), 'yyyy-MM-dd'));
                setEndTime(format(new Date(event.fullEnd), 'HH:mm'));
                setLocation(event.location || '');
                setLocationType(event.locationType || 'estudio');
                setAssignedEquipment(event.assignedEquipment || []);
            } else {
                setAssignedTo(productionTeam.find(m => m.name === assignedToName)?.id || '');
                setStartDate(''); setStartTime(''); setEndDate(''); setEndTime('');
                setLocation(''); setLocationType('estudio'); setAssignedEquipment([]);
            }
        }
    }, [open, event, assignedToName]);

    const handleSave = async () => {
        if (!assignedTo || !startDate || !startTime || !endDate || !endTime) {
            toast({ title: "Error", description: "Completa todos los campos de fecha y responsable.", variant: "destructive" });
            return;
        }

        const teamMember = teamMembers.find(m => m.id === assignedTo);
        if (!teamMember) return;

        const newEventData = {
            pendienteId: pendienteId,
            clientName: clientName,
            assignedTo: teamMember.id,
            assignedToName: teamMember.name,
            fullStart: new Date(`${startDate}T${startTime}`),
            fullEnd: new Date(`${endDate}T${endTime}`),
            location: location || '',
            locationType: locationType || 'estudio',
            project: project,
            assignedEquipment,
            equipmentNames: assignedEquipment.map(id => mockEquipment.find(eq => eq.id === id)?.name || '')
        };

        try {
            await scheduleRecording(newEventData);
            toast({ title: "Éxito", description: `Grabación ${event ? 'actualizada' : 'agendada'}.` });
            onSave();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "No se pudo agendar la grabación.", variant: "destructive" });
        }
    };

    const handleDelete = async () => {
        if (!event) return;
        try {
            await deleteRecording(pendienteId);
            toast({ title: "Eliminado", description: "La grabación ha sido eliminada." });
            onSave();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "No se pudo eliminar la grabación.", variant: "destructive" });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{event ? 'Editar' : 'Agendar'} Grabación</DialogTitle>
                    <DialogDescription>Para el pendiente: "{project}"</DialogDescription>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh] p-4">
                    <div className="grid gap-6">
                        <div className="space-y-2">
                            <Label>Responsable</Label>
                            <Select value={assignedTo} onValueChange={setAssignedTo}>
                                <SelectTrigger><SelectValue placeholder="Seleccionar miembro del equipo..." /></SelectTrigger>
                                <SelectContent>
                                    {productionTeam.map(m => <SelectItem key={m.id} value={m.id}>{m.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="startDate">Fecha de Inicio</Label>
                                <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="startTime">Hora de Inicio</Label>
                                <Input id="startTime" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="endDate">Fecha de Fin</Label>
                                <Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime">Hora de Fin</Label>
                                <Input id="endTime" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Ubicación / Tipo</Label>
                            <RadioGroup value={locationType} onValueChange={(v) => setLocationType(v as any)} className="flex gap-4">
                                <div className="flex items-center space-x-2"><RadioGroupItem value="estudio" id="loc-estudio" /><Label htmlFor="loc-estudio">Estudio MAW</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="oficina_cliente" id="loc-oficina" /><Label htmlFor="loc-oficina">Oficina Cliente</Label></div>
                                <div className="flex items-center space-x-2"><RadioGroupItem value="exterior" id="loc-exterior" /><Label htmlFor="loc-exterior">Exterior</Label></div>
                            </RadioGroup>
                            <Input value={location} onChange={e => setLocation(e.target.value)} placeholder="Dirección, detalles..." />
                        </div>
                        <div className="space-y-2">
                            <Label>Equipo Requerido</Label>
                            <Card>
                                <CardContent className="p-4 max-h-48 overflow-y-auto">
                                    <div className="space-y-3">
                                        {mockEquipment.map((item) => (
                                            <div key={item.id} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={`eq-${item.id}-${pendienteId}`}
                                                    checked={assignedEquipment.includes(item.id)}
                                                    onCheckedChange={(checked) => {
                                                        setAssignedEquipment(prev =>
                                                            checked ? [...prev, item.id] : prev.filter(id => id !== item.id)
                                                        )
                                                    }}
                                                />
                                                <Label htmlFor={`eq-${item.id}-${pendienteId}`} className="flex-1">
                                                    <div className="flex items-center gap-2">
                                                        {equipmentCategoryIcons[item.category]}
                                                        {item.name}
                                                    </div>
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </ScrollArea>
                <DialogFooter className="justify-between pt-4">
                    <div>
                        {event && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild><Button variant="destructive"><Trash2 className="w-4 h-4 mr-2" />Eliminar</Button></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader><AlertDialogTitle>¿Eliminar esta grabación?</AlertDialogTitle><AlertDialogDescription>Esta acción es irreversible.</AlertDialogDescription></AlertDialogHeader>
                                    <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={handleDelete}>Confirmar</AlertDialogAction></AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSave}>{event ? 'Guardar Cambios' : 'Agendar'}</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
