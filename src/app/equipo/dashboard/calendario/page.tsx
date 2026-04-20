

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format, addDays, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, subWeeks, addWeeks, isWithinInterval, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Camera, Mic, Lightbulb, Grip, ChevronLeft, ChevronRight, Users, Briefcase } from 'lucide-react';
import { teamMembers } from '@/lib/team-data';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { getRecordingEvents } from '../pendientes/_actions';
import type { RecordingEvent, Colaborador } from '@/lib/db/schema';
import { ScheduleRecordingDialog } from '@/components/schedule-recording-dialog';
import { useAuth } from '@/lib/auth-provider';


const mockEquipment = [
  { id: 'eq1', name: 'Micrófono Hollyland', category: 'audio' as const, available: true },
  { id: 'eq2', name: 'Cámara Sony FX3', category: 'video' as const, available: true },
  { id: 'eq3', name: 'Luz Aputure 600d', category: 'iluminacion' as const, available: true },
  { id: 'eq4', name: 'Estabilizador DJI Ronin', category: 'soporte' as const, available: true },
  { id: 'eq5', name: 'iPhone 15 Pro', category: 'video'as const, available: true },
  { id: 'eq6',name: 'Teleprompter', category: 'soporte' as const, available: true}
];

const equipmentCategoryIcons = {
    audio: <Mic className="w-4 h-4" />,
    video: <Camera className="w-4 h-4" />,
    iluminacion: <Lightbulb className="w-4 h-4" />,
    soporte: <Grip className="w-4 h-4" />
};

const salesTeam = teamMembers.filter(member => ['julio', 'alma', 'fernando'].includes(member.role));
const productionTeam = teamMembers.filter(member => ['luis', 'fany', 'carlos', 'paola', 'cristhian', 'daniel', 'alexis'].includes(member.role));

const CalendarSection = ({ title, events, team, eventType, onRefresh }: { 
    title: string, events: RecordingEvent[], team: typeof teamMembers, 
    eventType: 'grabacion' | 'cita_venta', onRefresh: () => void
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [memberFilter, setMemberFilter] = useState('Todos');

    const weekStartsOn = 1; // Monday
    const currentWeekStart = startOfWeek(currentDate, { weekStartsOn });
    const currentWeekEnd = endOfWeek(currentDate, { weekStartsOn });
    const daysInWeek = eachDayOfInterval({ start: currentWeekStart, end: currentWeekEnd });

    const filteredEvents = useMemo(() => {
        return events.filter(event => 
            (memberFilter === 'Todos' || event.assignedToName === memberFilter) &&
            (eventType === 'grabacion' ? !['cita_venta'].includes(event.project || '') : ['cita_venta'].includes(event.project || ''))
        );
    }, [events, memberFilter, eventType]);

    const weeklySummary = useMemo(() => {
        const summary: { [key: string]: number } = {};
        const teamToSummarize = memberFilter === 'Todos' ? team : team.filter(m => m.name === memberFilter);
        teamToSummarize.forEach(member => { summary[member.name] = 0; });
        
        const eventsInWeek = events.filter(event => 
            isWithinInterval(new Date(event.fullStart), { start: currentWeekStart, end: currentWeekEnd }) &&
            (eventType === 'grabacion' ? !['cita_venta'].includes(event.project || '') : ['cita_venta'].includes(event.project || ''))
        );

        eventsInWeek.forEach(event => { 
            if (summary[event.assignedToName] !== undefined) {
                summary[event.assignedToName]++; 
            }
        });
        
        return summary;
    }, [currentWeekStart, currentWeekEnd, events, team, eventType, memberFilter]);

    const goToPreviousWeek = () => setCurrentDate(subWeeks(currentDate, 1));
    const goToNextWeek = () => setCurrentDate(addWeeks(currentDate, 1));
    const goToCurrentWeek = () => setCurrentDate(new Date());

    const teamMemberColors: {[key: string]: string} = team.reduce((acc, member) => {
        acc[member.name] = member.color;
        return acc;
    }, {} as {[key: string]: string});

    return (
        <div className="flex flex-col h-full bg-card rounded-lg border p-4">
          <header className="flex justify-between items-center mb-6 px-1">
            <div>
                <h2 className="text-xl font-bold font-headline">{title}</h2>
                <p className="text-muted-foreground">{format(currentWeekStart, "d MMM", { locale: es })} - {format(currentWeekEnd, "d MMMM, yyyy", { locale: es })}</p>
            </div>
            <div className="flex items-center gap-2">
                <Select value={memberFilter} onValueChange={setMemberFilter}>
                    <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="Todos">Todos</SelectItem>{team.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
                </Select>
                <Button variant="outline" size="sm" onClick={goToPreviousWeek}><ChevronLeft className="w-4 h-4" /></Button>
                <Button variant="ghost" size="sm" onClick={goToCurrentWeek}>Hoy</Button>
                <Button variant="outline" size="sm" onClick={goToNextWeek}><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </header>

          <div className="grid grid-cols-7 flex-grow border-t border-l rounded-t-lg overflow-hidden bg-background">
                {daysInWeek.map(day => {
                    const dayEvents = filteredEvents.filter(event => isSameDay(new Date(event.fullStart), day)).sort((a, b) => new Date(a.fullStart).getTime() - new Date(b.fullStart).getTime());
                    return (
                        <div key={day.toString()} className="border-r border-b flex flex-col min-h-[400px]">
                            <div className="p-2 border-b text-center">
                                <p className="text-sm font-semibold uppercase text-muted-foreground">{format(day, 'EEE', { locale: es })}</p>
                                <p className="text-2xl font-bold">{format(day, 'd')}</p>
                            </div>
                            <div className="flex-grow p-2 space-y-2 overflow-y-auto">
                                <TooltipProvider>
                                {dayEvents.map(event => (
                                    <ScheduleRecordingDialog
                                        key={event.id}
                                        event={event}
                                        pendienteId={event.pendienteId!}
                                        clientName={event.clientName}
                                        project={event.project}
                                        assignedToName={event.assignedToName}
                                        onSave={onRefresh}
                                    >
                                        <Card className="p-3 hover:bg-card/80 transition-colors cursor-pointer" style={{ borderLeft: `4px solid ${teamMemberColors[event.assignedToName] || '#FFFFFF'}`}}>
                                            <CardHeader className="p-0 mb-2">
                                                <CardTitle className="text-sm">{event.project || event.clientName}</CardTitle>
                                                <CardDescription className="text-xs">{event.clientName}</CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-0 text-xs space-y-1">
                                                <p className="flex items-center gap-1.5 text-muted-foreground"><Users className="w-3 h-3" /> {event.assignedToName}</p>
                                                <p className="font-semibold">{format(new Date(event.fullStart), 'HH:mm')} - {format(new Date(event.fullEnd), 'HH:mm')}</p>
                                                {eventType === 'grabacion' && event.equipmentNames && event.equipmentNames.length > 0 && (
                                                    <div className="flex flex-wrap gap-1 pt-1">
                                                        {event.assignedEquipment?.map(id => {
                                                            const equipment = mockEquipment.find(e => e.id === id);
                                                            if (!equipment) return null;
                                                            return (
                                                                <Tooltip key={id}>
                                                                    <TooltipTrigger asChild>
                                                                        <div className="p-1.5 bg-secondary rounded-md">
                                                                            {equipmentCategoryIcons[equipment.category]}
                                                                        </div>
                                                                    </TooltipTrigger>
                                                                    <TooltipContent>
                                                                        <p>{equipment.name}</p>
                                                                    </TooltipContent>
                                                                </Tooltip>
                                                            )
                                                        })}
                                                    </div>
                                                )}
                                                {eventType === 'cita_venta' && (
                                                    <Badge variant="outline">{event.locationType === 'videollamada' ? 'Videollamada' : 'Presencial'}</Badge>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </ScheduleRecordingDialog>
                                ))}
                                </TooltipProvider>
                            </div>
                        </div>
                    )
                })}
          </div>
          <Card className="mt-4">
            <CardHeader><CardTitle className="flex items-center gap-2 text-base"><Users className="w-4 h-4"/>Resumen Semanal de Actividades</CardTitle></CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Object.entries(weeklySummary).map(([name, count]) => (
                        <div key={name} className="flex items-center justify-between p-3 rounded-lg bg-background">
                            <span className="font-medium">{name}</span>
                            <Badge variant={count > 0 ? 'default' : 'outline'} className="text-lg">{count}</Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
           </Card>
        </div>
      );
}

export default function CalendarioPage() {
    const { user } = useAuth();
    const [events, setEvents] = useState<RecordingEvent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchEvents = async () => {
        setIsLoading(true);
        const eventsData = await getRecordingEvents();
        setEvents(eventsData);
        setIsLoading(false);
    }
    
    useEffect(() => {
        fetchEvents();
    }, []);

    const grabaciones = events.filter(e => e.project !== 'cita_venta');
    const citasVenta = events.filter(e => e.project === 'cita_venta');

    const canSeeSalesCalendar = user?.accessSections?.ventas;
    const canSeeRecordingsCalendar = user?.accessSections?.pendientes; // Solo los usuarios que ven pendientes ven el calendario de grabaciones


    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div></div>
    }

    return (
        <div>
            <h1 className="text-2xl font-bold font-headline mb-4">Planificación Semanal</h1>
            <div className="grid grid-cols-1 gap-8">
                 {canSeeRecordingsCalendar && (
                    <CalendarSection
                        title="Calendario de Grabaciones"
                        events={grabaciones}
                        team={productionTeam}
                        eventType="grabacion"
                        onRefresh={fetchEvents}
                    />
                 )}
                 {canSeeSalesCalendar && (
                    <CalendarSection
                        title="Calendario de Citas de Venta"
                        events={citasVenta}
                        team={salesTeam}
                        eventType="cita_venta"
                        onRefresh={fetchEvents}
                    />
                 )}
            </div>
        </div>
    )
}
