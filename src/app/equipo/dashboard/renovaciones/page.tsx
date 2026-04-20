
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/lib/auth-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getDominiosHostinger } from './_actions';
import type { DominioHostinger } from '@/lib/db/schema';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  isToday,
  differenceInDays,
} from 'date-fns';
import { es } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  XCircle,
  Clock,
  CheckCircle,
  Globe,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type StatusFilter = 'todos' | 'Expired' | 'Active' | 'Pending verification' | 'urgente';

function getStatusConfig(dominio: DominioHostinger) {
  const today = new Date();
  const expDate = new Date(dominio.fecha_expiracion);
  const daysUntil = differenceInDays(expDate, today);

  if (dominio.status === 'Expired' || daysUntil < 0) {
    return {
      label: 'Expirado',
      color: 'bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30',
      dotColor: 'bg-red-500',
      calendarBg: 'bg-red-500/10 hover:bg-red-500/20 border-red-500/40',
      priority: 0,
    };
  }
  if (daysUntil <= 30) {
    return {
      label: 'Urgente',
      color: 'bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30',
      dotColor: 'bg-orange-500',
      calendarBg: 'bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/40',
      priority: 1,
    };
  }
  if (daysUntil <= 90) {
    return {
      label: 'Pronto',
      color: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400 border-yellow-500/30',
      dotColor: 'bg-yellow-500',
      calendarBg: 'bg-yellow-500/10 hover:bg-yellow-500/20 border-yellow-500/40',
      priority: 2,
    };
  }
  return {
    label: 'Activo',
    color: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
    dotColor: 'bg-emerald-500',
    calendarBg: 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/40',
    priority: 3,
  };
}

function DomainCard({ dominio }: { dominio: DominioHostinger }) {
  const config = getStatusConfig(dominio);
  const expDate = new Date(dominio.fecha_expiracion);

  return (
    <div className={cn('rounded-lg border p-3 transition-all', config.calendarBg)}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold truncate">{dominio.dominio}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {format(expDate, "d 'de' MMMM, yyyy", { locale: es })}
          </p>
        </div>
        <Badge variant="outline" className={cn('text-[10px] shrink-0', config.color)}>
          {config.label}
        </Badge>
      </div>
    </div>
  );
}

function CalendarDayCell({
  day,
  currentMonth,
  dominios,
}: {
  day: Date;
  currentMonth: Date;
  dominios: DominioHostinger[];
}) {
  const dayDominios = dominios.filter((d) =>
    isSameDay(new Date(d.fecha_expiracion), day)
  );
  const inMonth = isSameMonth(day, currentMonth);
  const today = isToday(day);

  if (dayDominios.length === 0) {
    return (
      <div
        className={cn(
          'min-h-[100px] border-b border-r p-1.5 transition-colors',
          !inMonth && 'bg-muted/30',
          today && 'bg-primary/5'
        )}
      >
        <span
          className={cn(
            'inline-flex h-7 w-7 items-center justify-center rounded-full text-sm',
            !inMonth && 'text-muted-foreground/50',
            today && 'bg-primary text-primary-foreground font-bold'
          )}
        >
          {format(day, 'd')}
        </span>
      </div>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn(
            'min-h-[100px] border-b border-r p-1.5 cursor-pointer transition-colors hover:bg-accent/50',
            !inMonth && 'bg-muted/30',
            today && 'bg-primary/5'
          )}
        >
          <span
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-full text-sm',
              !inMonth && 'text-muted-foreground/50',
              today && 'bg-primary text-primary-foreground font-bold'
            )}
          >
            {format(day, 'd')}
          </span>
          <div className="mt-1 space-y-1">
            {dayDominios.slice(0, 3).map((d) => {
              const config = getStatusConfig(d);
              return (
                <div
                  key={d.id}
                  className={cn(
                    'flex items-center gap-1.5 rounded px-1.5 py-0.5 text-[11px] font-medium truncate',
                    config.calendarBg
                  )}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full shrink-0', config.dotColor)} />
                  <span className="truncate">{d.dominio}</span>
                </div>
              );
            })}
            {dayDominios.length > 3 && (
              <p className="text-[10px] text-muted-foreground pl-1">
                +{dayDominios.length - 3} mas
              </p>
            )}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-3" align="start">
        <div className="space-y-2">
          <p className="text-sm font-semibold">
            {format(day, "EEEE d 'de' MMMM", { locale: es })}
          </p>
          <p className="text-xs text-muted-foreground">
            {dayDominios.length} dominio{dayDominios.length > 1 ? 's' : ''} expira{dayDominios.length > 1 ? 'n' : ''}
          </p>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {dayDominios.map((d) => (
              <DomainCard key={d.id} dominio={d} />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function RenovacionesPage() {
  const { user, loading } = useAuth();
  const [dominios, setDominios] = useState<DominioHostinger[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');

  useEffect(() => {
    if (!loading) {
      getDominiosHostinger().then((data) => {
        setDominios(data);
        setIsLoading(false);
      });
    }
  }, [loading]);

  const stats = useMemo(() => {
    const today = new Date();
    let expired = 0;
    let urgent = 0;
    let soon = 0;
    let active = 0;

    dominios.forEach((d) => {
      const days = differenceInDays(new Date(d.fecha_expiracion), today);
      if (d.status === 'Expired' || days < 0) expired++;
      else if (days <= 30) urgent++;
      else if (days <= 90) soon++;
      else active++;
    });

    return { total: dominios.length, expired, urgent, soon, active };
  }, [dominios]);

  const filteredDominios = useMemo(() => {
    let result = dominios;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter((d) => d.dominio.toLowerCase().includes(q));
    }
    if (statusFilter !== 'todos') {
      const today = new Date();
      result = result.filter((d) => {
        const days = differenceInDays(new Date(d.fecha_expiracion), today);
        if (statusFilter === 'Expired') return d.status === 'Expired' || days < 0;
        if (statusFilter === 'urgente') return days >= 0 && days <= 30;
        if (statusFilter === 'Active') return days > 30;
        return true;
      });
    }
    return result;
  }, [dominios, searchQuery, statusFilter]);

  // Calendar grid
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const calStart = startOfWeek(monthStart, { weekStartsOn: 1 });
    const calEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
    return eachDayOfInterval({ start: calStart, end: calEnd });
  }, [currentMonth]);

  const weeks = useMemo(() => {
    const result: Date[][] = [];
    for (let i = 0; i < calendarDays.length; i += 7) {
      result.push(calendarDays.slice(i, i + 7));
    }
    return result;
  }, [calendarDays]);

  // List for sidebar sorted by urgency
  const sortedList = useMemo(() => {
    return [...filteredDominios].sort((a, b) => {
      const ca = getStatusConfig(a);
      const cb = getStatusConfig(b);
      if (ca.priority !== cb.priority) return ca.priority - cb.priority;
      return new Date(a.fecha_expiracion).getTime() - new Date(b.fecha_expiracion).getTime();
    });
  }, [filteredDominios]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
      </div>
    );
  }

  if (user?.role !== 'admin' && user?.role !== 'contabilidad') {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Acceso Denegado</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No tienes permiso para ver esta seccion.</p>
        </CardContent>
      </Card>
    );
  }

  const dayHeaders = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold font-headline">Renovaciones de Dominios</h1>
        <p className="text-muted-foreground mt-1">
          Calendario de vencimientos de dominios Hostinger
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-primary" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-xs text-muted-foreground">Total Dominios</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="border-l-4 border-l-red-500 cursor-pointer hover:bg-red-500/5 transition-colors"
          onClick={() => setStatusFilter(statusFilter === 'Expired' ? 'todos' : 'Expired')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <XCircle className="h-8 w-8 text-red-500" />
              <div>
                <p className="text-2xl font-bold">{stats.expired}</p>
                <p className="text-xs text-muted-foreground">Expirados</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card
          className="border-l-4 border-l-orange-500 cursor-pointer hover:bg-orange-500/5 transition-colors"
          onClick={() => setStatusFilter(statusFilter === 'urgente' ? 'todos' : 'urgente')}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-orange-500" />
              <div>
                <p className="text-2xl font-bold">{stats.urgent}</p>
                <p className="text-xs text-muted-foreground">Urgentes (&lt;30d)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-yellow-500" />
              <div>
                <p className="text-2xl font-bold">{stats.soon}</p>
                <p className="text-xs text-muted-foreground">Pronto (30-90d)</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-emerald-500" />
              <div>
                <p className="text-2xl font-bold">{stats.active}</p>
                <p className="text-xs text-muted-foreground">Activos (&gt;90d)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
        {/* Calendar */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="capitalize">
                  {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </CardTitle>
                <CardDescription>
                  Click en un dia para ver los dominios que expiran
                </CardDescription>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date())}
                >
                  Hoy
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 sm:p-4">
            <div className="border rounded-lg overflow-hidden">
              {/* Day headers */}
              <div className="grid grid-cols-7 bg-muted/50">
                {dayHeaders.map((day) => (
                  <div
                    key={day}
                    className="border-b border-r p-2 text-center text-xs font-semibold text-muted-foreground uppercase"
                  >
                    {day}
                  </div>
                ))}
              </div>
              {/* Calendar grid */}
              {weeks.map((week, wi) => (
                <div key={wi} className="grid grid-cols-7">
                  {week.map((day) => (
                    <CalendarDayCell
                      key={day.toISOString()}
                      day={day}
                      currentMonth={currentMonth}
                      dominios={filteredDominios}
                    />
                  ))}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sidebar list */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Lista de Dominios</CardTitle>
              <div className="space-y-2 mt-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar dominio..."
                    className="pl-9 h-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select
                  value={statusFilter}
                  onValueChange={(v) => setStatusFilter(v as StatusFilter)}
                >
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Filtrar por status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todos">Todos</SelectItem>
                    <SelectItem value="Expired">Expirados</SelectItem>
                    <SelectItem value="urgente">Urgentes (&lt;30 dias)</SelectItem>
                    <SelectItem value="Active">Activos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <div className="space-y-2 max-h-[calc(100vh-500px)] overflow-y-auto pr-1">
                {sortedList.length === 0 && (
                  <p className="text-center text-sm text-muted-foreground py-8">
                    No se encontraron dominios
                  </p>
                )}
                {sortedList.map((d) => {
                  const config = getStatusConfig(d);
                  const expDate = new Date(d.fecha_expiracion);
                  const daysUntil = differenceInDays(expDate, new Date());
                  return (
                    <div
                      key={d.id}
                      className={cn(
                        'rounded-lg border p-3 transition-all cursor-pointer hover:shadow-sm',
                        config.calendarBg
                      )}
                      onClick={() => {
                        setCurrentMonth(expDate);
                      }}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-semibold truncate">{d.dominio}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {format(expDate, "d MMM yyyy", { locale: es })}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <Badge
                            variant="outline"
                            className={cn('text-[10px]', config.color)}
                          >
                            {config.label}
                          </Badge>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {daysUntil < 0
                              ? `${Math.abs(daysUntil)}d vencido`
                              : daysUntil === 0
                              ? 'Hoy'
                              : `${daysUntil}d restantes`}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
