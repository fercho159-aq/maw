

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
import { ArrowUpDown, PlusCircle, MinusCircle, DollarSign, TrendingUp, TrendingDown, Info, Trash2, Plus, MoreHorizontal, Download, FileWarning, Calendar as CalendarIcon, Percent, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { format, startOfMonth, endOfMonth, isWithinInterval, parse, parseISO, subMonths, setDate, addMonths, addDays } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '@/lib/auth-provider';
import { Alert, AlertDescription } from '@/components/ui/alert';
import type { MovimientoDiario, CuentaPorCobrar, NewCuentaPorCobrar, NewMovimientoDiario, Client, ClientFinancialProfile } from '@/lib/db/schema';
import { getCuentasPorCobrar, getMovimientos, addCpc, addMovimiento, updateCpc, deleteCpc, registrarPagoCpc, updateMovimiento, deleteMovimiento } from './_actions';
import { getClients } from '../clientes/_actions';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import type { DateRange } from 'react-day-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { CategoriaIngreso, Cuenta } from '@/lib/finanzas-data';
import { Textarea } from '@/components/ui/textarea';


// Extend the window type for jspdf-autotable
declare global {
    interface Window {
        jsPDF: typeof jsPDF;
    }
}

// PDF Generation Utility
const generatePdf = (client: Client, debts: CuentaPorCobrar[], type: 'recibo' | 'prefactura') => {
    const doc = new jsPDF();
    const totalDebt = debts.reduce((sum, debt) => sum + debt.monto, 0);

    // Header
    doc.setFontSize(20);
    doc.text("MAW Soluciones", 14, 22);
    doc.setFontSize(12);
    doc.text(type === 'recibo' ? 'Recibo' : 'Prefactura', 150, 22);

    doc.setFontSize(10);
    doc.text(`Fecha: ${format(new Date(), 'dd/MM/yyyy')}`, 150, 28);
    doc.text(`Cliente: ${client.name}`, 14, 40);
    doc.text(`Contacto: ${client.representativeName}`, 14, 46);

    // Table
    const tableColumn = ["Periodo", "Servicio", "Monto"];
    const tableRows = debts.map(debt => [
        debt.periodo,
        debt.tipo,
        debt.monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })
    ]);

    (doc as any).autoTable({
        startY: 55,
        head: [tableColumn],
        body: tableRows,
    });

    const finalY = (doc as any).lastAutoTable.finalY;

    // Totals
    if (type === 'prefactura') {
        const iva = totalDebt * 0.16;
        const finalTotal = totalDebt + iva;
        doc.setFontSize(10);
        doc.text(`Subtotal: ${totalDebt.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`, 140, finalY + 10);
        doc.text(`IVA (16%): ${iva.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`, 140, finalY + 16);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total: ${finalTotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`, 140, finalY + 24);
    } else {
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text(`Total: ${totalDebt.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}`, 140, finalY + 10);
    }

    // Download
    doc.save(`${type}_${client.name.replace(/ /g, '_')}_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
};


const generatePeriodOptions = () => {
    const today = new Date();
    const options: string[] = [];
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];

    for (let i = -2; i <= 2; i++) {
        const month = addMonths(today, i);
        const nextMonth = addMonths(month, 1);

        // Mensual del 1 al fin de mes
        const startOfMonthDate = startOfMonth(month);
        const endOfMonthDate = endOfMonth(month);
        options.push(`Del 1 de ${format(startOfMonthDate, 'MMMM', { locale: es })} al ${format(endOfMonthDate, 'd')} de ${format(endOfMonthDate, 'MMMM yyyy', { locale: es })}`);

        // Mensual del 15 al 14
        const startMidMonth = setDate(month, 15);
        options.push(`Del 15 de ${format(startMidMonth, 'MMMM', { locale: es })} al 14 de ${format(addMonths(startMidMonth, 1), 'MMMM yyyy', { locale: es })}`);
    }

    return [...new Set(options)].sort((a, b) => {
        try {
            const parseDate = (periodString: string): Date => {
                const parts = periodString.toLowerCase().split(' de ');
                const day = parseInt(parts[0]);
                const monthName = parts[1];
                const yearIndex = periodString.split(' ').findIndex(p => !isNaN(parseInt(p)) && p.length === 4);
                const year = parseInt(periodString.split(' ')[yearIndex]);
                const monthIndex = months.indexOf(monthName);
                return new Date(year, monthIndex, day);
            };

            const dateA = parseDate(a);
            const dateB = parseDate(b);

            return dateA.getTime() - dateB.getTime();
        } catch (e) {
            return 0;
        }
    });
};

const generateFechaCobroOptions = () => {
    const today = new Date();
    const options: string[] = [];
    for (let i = -2; i <= 3; i++) { // From last 2 months to next 3 months
        const month = addMonths(today, i);
        const year = format(month, 'yyyy');
        const monthName = format(month, 'MMMM', { locale: es });
        const endOfMonthDate = endOfMonth(month);
        options.push(`15 de ${monthName} de ${year}`);
        options.push(`${format(endOfMonthDate, 'd')} de ${monthName} de ${year}`);
    }
    return options;
};

const CpcFormDialog = ({ clients, client, cpc, onSave, children, isEditing }: {
    clients?: (Client & { financialProfile: ClientFinancialProfile | null; })[],
    client?: Client,
    cpc?: CuentaPorCobrar | null,
    onSave: () => void,
    children: React.ReactNode,
    isEditing: boolean
}) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const [selectedClientId, setSelectedClientId] = useState<string>('');
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState<CategoriaIngreso>('Iguala Contenido');
    const [concepto, setConcepto] = useState('');
    const [periodo, setPeriodo] = useState('');
    const [otroPeriodo, setOtroPeriodo] = useState('');
    const [fechaCobro, setFechaCobro] = useState<string | undefined>();
    const [conIva, setConIva] = useState(false);

    const periodOptions = useMemo(() => generatePeriodOptions(), [open]);
    const fechaCobroOptions = useMemo(() => generateFechaCobroOptions(), [open]);

    useEffect(() => {
        if (open) {
            if (isEditing && cpc) {
                setMonto(cpc.monto.toString());
                setTipo(cpc.tipo as CategoriaIngreso);
                setSelectedClientId(cpc.clienteId.toString());
                setConcepto(cpc.concepto || '');
                setPeriodo(cpc.periodo);
                setFechaCobro(cpc.fecha_cobro || undefined);
                setConIva(cpc.conIva ?? false);
                setOtroPeriodo('');
            } else if (client) { // Pre-fill client if adding from a specific row
                setMonto('');
                setTipo('Iguala Contenido');
                setConcepto('');
                setPeriodo('');
                setOtroPeriodo('');
                setSelectedClientId(client.id.toString());
                setFechaCobro(undefined);
                setConIva(false);
            } else { // Reset for global "add"
                setMonto('');
                setTipo('Iguala Contenido');
                setConcepto('');
                setPeriodo('');
                setOtroPeriodo('');
                setSelectedClientId('');
                setFechaCobro(undefined);
                setConIva(false);
            }
        }
    }, [open, client, cpc, isEditing]);

    const handleSave = async () => {
        let targetClient: { id: number, name: string } | undefined;


        if (client) {
            targetClient = { id: client.id, name: client.name };
        } else if (isEditing && cpc) {
            targetClient = { id: cpc.clienteId, name: cpc.clienteName };
        } else if (selectedClientId) {
            const foundClient = clients?.find(c => c.id.toString() === selectedClientId);
            if (foundClient) {
                targetClient = foundClient;
            }
        }

        const finalPeriodo = periodo === 'Otro' ? otroPeriodo : periodo;

        if (!targetClient || !monto || !finalPeriodo) {
            toast({ title: "Error", description: "Cliente, monto y periodo son obligatorios.", variant: "destructive" });
            return;
        }

        const data: Partial<NewCuentaPorCobrar> = {
            monto: parseFloat(monto),
            tipo,
            periodo: finalPeriodo,
            concepto: concepto || null,
            fecha_cobro: fechaCobro,
            conIva,
        };

        try {
            if (isEditing && cpc?.id) {
                await updateCpc(cpc.id, data);
                toast({ title: "Éxito", description: "Cuenta por cobrar actualizada." });
            } else {
                const { id, ...rest } = {
                    clienteId: targetClient.id,
                    clienteName: targetClient.name,
                    ...data,
                } as NewCuentaPorCobrar;

                await addCpc(rest);
                toast({ title: "Éxito", description: "Cuenta por cobrar creada." });
            }
            startTransition(() => {
                onSave();
                setOpen(false);
            });
        } catch (error: any) {
            toast({ title: "Error", description: `No se pudo guardar la cuenta por cobrar: ${error.message}`, variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!cpc) return;
        try {
            await deleteCpc(cpc.id);
            toast({ title: "Eliminado", description: "La cuenta por cobrar ha sido eliminada." });
            onSave();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "No se pudo eliminar la cuenta por cobrar.", variant: "destructive" });
        }
    }

    const clientName = client?.name || cpc?.clienteName;

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Editar' : 'Añadir'} Cuenta por Cobrar</DialogTitle>
                    <DialogDescription>{clientName ? `Cliente: ${clientName}` : 'Selecciona un cliente'}</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {!isEditing && !client && clients && (
                        <div className="space-y-2">
                            <Label>Cliente</Label>
                            <Select value={selectedClientId} onValueChange={setSelectedClientId}>
                                <SelectTrigger><SelectValue placeholder="Seleccionar un cliente..." /></SelectTrigger>
                                <SelectContent>
                                    {clients.map(c => <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label>Concepto</Label>
                        <Textarea value={concepto} onChange={e => setConcepto(e.target.value)} placeholder="Ej. Honorarios, Inversión en pauta, etc." />
                    </div>
                    <div className="space-y-2">
                        <Label>Tipo de Servicio</Label>
                        <Select value={tipo} onValueChange={(v) => setTipo(v as CategoriaIngreso)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Iguala Contenido">Iguala Contenido</SelectItem>
                                <SelectItem value="Iguala Web">Iguala Web</SelectItem>
                                <SelectItem value="Iguala Ads">Iguala Ads</SelectItem>
                                <SelectItem value="Proyecto">Proyecto</SelectItem>
                                <SelectItem value="Contenido">Contenido</SelectItem>
                                <SelectItem value="Ads">Ads</SelectItem>
                                <SelectItem value="Web">Web</SelectItem>
                                <SelectItem value="Renovaciones">Renovaciones</SelectItem>
                                <SelectItem value="Otros">Otros</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Periodo</Label>
                            <Select value={periodo} onValueChange={setPeriodo}>
                                <SelectTrigger><SelectValue placeholder="Seleccionar periodo..." /></SelectTrigger>
                                <SelectContent>
                                    {periodOptions.map(option => <SelectItem key={option} value={option}>{option}</SelectItem>)}
                                    <SelectItem value="Otro">Otro (especificar)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Monto (MXN)</Label>
                            <Input type="number" value={monto} onChange={e => setMonto(e.target.value)} placeholder="0.00" />
                        </div>
                    </div>
                    {periodo === 'Otro' && (
                        <div className="space-y-2">
                            <Label>Especificar Periodo</Label>
                            <Input value={otroPeriodo} onChange={e => setOtroPeriodo(e.target.value)} placeholder="Ej. 1 al 31 de Enero 2025" />
                        </div>
                    )}
                    <div className="space-y-2">
                        <Label>Fecha de Cobro</Label>
                        <Select value={fechaCobro} onValueChange={setFechaCobro}>
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona una fecha de cobro" />
                            </SelectTrigger>
                            <SelectContent>
                                {fechaCobroOptions.map(option => (
                                    <SelectItem key={option} value={option}>{option}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    {isEditing && (
                        <div className="flex items-center space-x-2">
                            <Checkbox id="conIva" checked={conIva} onCheckedChange={c => setConIva(Boolean(c))} />
                            <Label htmlFor="conIva" className="font-normal">Incluye IVA (16%)</Label>
                        </div>
                    )}
                </div>
                <DialogFooter className="justify-between">
                    <div>
                        {isEditing && (
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" onClick={(e) => e.stopPropagation()}><Trash2 className="w-4 h-4 mr-2" />Eliminar</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                        <AlertDialogDescription>Esta acción eliminará permanentemente la cuenta por cobrar.</AlertDialogDescription>
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
                        <Button onClick={handleSave}>{isEditing ? 'Guardar Cambios' : 'Añadir Cuenta'}</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const PayCpcDialog = ({ onPay, children }: { onPay: (cuenta: Cuenta, detalle: string) => void; children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const [cuentaDestino, setCuentaDestino] = useState<Cuenta | ''>('');
    const [detalleEfectivo, setDetalleEfectivo] = useState('');

    const handlePay = () => {
        if (!cuentaDestino) return;
        onPay(cuentaDestino, detalleEfectivo);
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Registrar Pago</DialogTitle>
                    <DialogDescription>Selecciona la cuenta de destino para este pago.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Select value={cuentaDestino} onValueChange={(value) => setCuentaDestino(value as any)}>
                        <SelectTrigger><SelectValue placeholder="Seleccionar cuenta de destino" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Cuenta Paola">Cuenta Paola</SelectItem>
                            <SelectItem value="Cuenta MAW">Cuenta MAW</SelectItem>
                            <SelectItem value="Cuenta Aldo">Cuenta Aldo</SelectItem>
                            <SelectItem value="Efectivo">Efectivo</SelectItem>
                        </SelectContent>
                    </Select>
                    {cuentaDestino === 'Efectivo' && <Input value={detalleEfectivo} onChange={e => setDetalleEfectivo(e.target.value)} placeholder="Especifique (ej. Caja chica, Fany)" />}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handlePay} disabled={!cuentaDestino}>Confirmar Pago</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


const CuentasPorCobrarTab = ({ data, clients, onRefresh, isAdmin }: { data: CuentaPorCobrar[], clients: Client[], onRefresh: () => void, isAdmin: boolean }) => {

    type SortField = 'totalDebt' | 'nextDueDate';
    const [sortField, setSortField] = useState<SortField>('totalDebt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [clientFilter, setClientFilter] = useState('Todos');
    const [typeFilter, setTypeFilter] = useState<CategoriaIngreso | 'Todos'>('Todos');
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
    const [datePreset, setDatePreset] = useState<string>('');
    const { toast } = useToast();

    const clientDebts = useMemo(() => {
        const debtMap = new Map<number, { client: Client; totalDebt: number; totalIVA: number; debts: CuentaPorCobrar[]; nextDueDate?: Date }>();

        clients.forEach(client => {
            debtMap.set(client.id, { client, totalDebt: 0, totalIVA: 0, debts: [] });
        });

        const parseDate = (dateString: string | null | undefined): Date | null => {
            if (!dateString) return null;
            try {
                // Example format: "15 de noviembre de 2024"
                const months: Record<string, number> = { 'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11 };
                const parts = dateString.toLowerCase().split(' de ');
                if (parts.length < 3) return null;
                const day = parseInt(parts[0]);
                const month = months[parts[1]];
                const year = parseInt(parts[2]);

                return new Date(year, month, day);
            } catch {
                return null;
            }
        };

        data.forEach(cpc => {
            if (typeFilter !== 'Todos' && cpc.tipo !== typeFilter) {
                return;
            }
            if (dateRange?.from) {
                const dueDate = parseDate(cpc.fecha_cobro);
                if (!dueDate) return;
                const from = new Date(dateRange.from);
                from.setHours(0, 0, 0, 0);
                const to = dateRange.to ? new Date(dateRange.to) : new Date(dateRange.from);
                to.setHours(23, 59, 59, 999);
                if (dueDate < from || dueDate > to) return;
            }
            const clientEntry = debtMap.get(cpc.clienteId);
            if (clientEntry) {
                const iva = cpc.conIva ? cpc.monto * 0.16 : 0;
                clientEntry.totalDebt += cpc.monto;
                clientEntry.totalIVA += iva;
                clientEntry.debts.push(cpc);
                const dueDate = parseDate(cpc.fecha_cobro);
                if (dueDate && (!clientEntry.nextDueDate || dueDate < clientEntry.nextDueDate)) {
                    clientEntry.nextDueDate = dueDate;
                }
            }
        });

        let clientList = Array.from(debtMap.values());

        if (clientFilter !== 'Todos') {
            clientList = clientList.filter(item => item.client.name === clientFilter);
        }

        clientList.sort((a, b) => {
            if (sortField === 'totalDebt') {
                return sortOrder === 'desc' ? b.totalDebt - a.totalDebt : a.totalDebt - b.totalDebt;
            }
            if (sortField === 'nextDueDate') {
                const dateA = a.nextDueDate?.getTime() || (sortOrder === 'asc' ? Infinity : -Infinity);
                const dateB = b.nextDueDate?.getTime() || (sortOrder === 'asc' ? Infinity : -Infinity);
                return sortOrder === 'asc' ? dateA - dateB : dateB - a.date;
            }
            return a.client.name.localeCompare(b.client.name);
        });

        return clientList;
    }, [data, clients, sortField, sortOrder, clientFilter, typeFilter, dateRange]);

    const toggleSort = (field: SortField) => {
        if (field === sortField) {
            setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
        } else {
            setSortField(field);
            setSortOrder(field === 'nextDueDate' ? 'asc' : 'desc');
        }
    };

    const allServiceTypes = Array.from(new Set(data.map(d => d.tipo))) as CategoriaIngreso[];

    const handleRecreate = async (cpc: CuentaPorCobrar) => {
        try {
            await registrarPagoCpc(cpc.id, 'Pendiente', null);
            toast({ title: 'Éxito', description: `Iguala para ${cpc.clienteName} recreada para el siguiente mes.` });
            onRefresh();

        } catch (error) {
            toast({ title: 'Error', description: 'No se pudo generar el siguiente periodo.', variant: 'destructive' });
            console.error(error);
        }
    };

    const parseDate = (dateString: string | null | undefined): Date => {
        if (!dateString) return new Date();
        const months: Record<string, number> = { 'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5, 'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11 };
        const parts = dateString.toLowerCase().split(' de ');
        const day = parseInt(parts[0]);
        const month = months[parts[1]];
        const year = parseInt(parts[2]);
        return new Date(year, month, day);
    };

    const handlePayCpc = async (cpc: CuentaPorCobrar, cuentaDestino: Cuenta, detalleCuenta: string) => {
        try {
            await registrarPagoCpc(cpc.id, cuentaDestino, detalleCuenta || null);
            toast({ title: "Éxito", description: `Pago de ${cpc.clienteName} registrado.` });
            onRefresh();
        } catch (error: any) {
            toast({ title: "Error", description: `No se pudo registrar el pago: ${error.message}`, variant: "destructive" });
        }
    }


    return (
        <Card>
            <CardHeader className='flex-col md:flex-row justify-between items-start md:items-center'>
                <div>
                    <CardTitle>Control de Pagos</CardTitle>
                    <CardDescription>Gestiona los pagos pendientes de tus clientes.</CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                    <Select value={clientFilter} onValueChange={setClientFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filtrar por cliente" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Todos">Todos los Clientes</SelectItem>
                            {clients.map(c => <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as any)}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filtrar por Servicio" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Todos">Todos los Servicios</SelectItem>
                            {allServiceTypes.map(type => <SelectItem key={type} value={type}>{type}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="outline" className={cn("w-full sm:w-auto justify-start text-left font-normal", !dateRange?.from && "text-muted-foreground")}>
                                <CalendarIcon className="w-4 h-4 mr-2 shrink-0" />
                                {!dateRange?.from
                                    ? 'Todas las Fechas'
                                    : datePreset
                                        ? datePreset
                                        : dateRange.to && dateRange.from.getTime() !== dateRange.to.getTime()
                                            ? `${format(dateRange.from, 'd MMM', { locale: es })} - ${format(dateRange.to, 'd MMM yyyy', { locale: es })}`
                                            : format(dateRange.from, 'd MMM yyyy', { locale: es })
                                }
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <div className="flex flex-wrap gap-1.5 p-3 border-b">
                                <Button
                                    variant={!dateRange?.from ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() => { setDateRange(undefined); setDatePreset(''); }}
                                >
                                    Todas
                                </Button>
                                <Button
                                    variant={datePreset === 'Vencidas' ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() => {
                                        setDateRange({ from: new Date(2020, 0, 1), to: addDays(new Date(), -1) });
                                        setDatePreset('Vencidas');
                                    }}
                                >
                                    Vencidas
                                </Button>
                                <Button
                                    variant={datePreset === 'Esta Quincena' ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() => {
                                        const now = new Date();
                                        const day = now.getDate();
                                        const from = day <= 15 ? startOfMonth(now) : new Date(now.getFullYear(), now.getMonth(), 16);
                                        const to = day <= 15 ? new Date(now.getFullYear(), now.getMonth(), 15) : endOfMonth(now);
                                        setDateRange({ from, to });
                                        setDatePreset('Esta Quincena');
                                    }}
                                >
                                    Esta Quincena
                                </Button>
                                <Button
                                    variant={datePreset === 'Este Mes' ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() => {
                                        const now = new Date();
                                        setDateRange({ from: startOfMonth(now), to: endOfMonth(now) });
                                        setDatePreset('Este Mes');
                                    }}
                                >
                                    Este Mes
                                </Button>
                                <Button
                                    variant={datePreset === 'Próximo Mes' ? 'default' : 'outline'}
                                    size="sm"
                                    className="h-7 text-xs"
                                    onClick={() => {
                                        const next = addMonths(new Date(), 1);
                                        setDateRange({ from: startOfMonth(next), to: endOfMonth(next) });
                                        setDatePreset('Próximo Mes');
                                    }}
                                >
                                    Próximo Mes
                                </Button>
                            </div>
                            <Calendar
                                initialFocus
                                mode="range"
                                defaultMonth={dateRange?.from}
                                selected={dateRange}
                                onSelect={(range) => {
                                    setDateRange(range);
                                    setDatePreset('');
                                }}
                                numberOfMonths={2}
                                locale={es}
                            />
                        </PopoverContent>
                    </Popover>
                    {isAdmin && (
                        <CpcFormDialog clients={clients} onSave={onRefresh} isEditing={false}>
                            <Button className="w-full sm:w-auto"><PlusCircle className="w-4 h-4 mr-2" /> Añadir CxC</Button>
                        </CpcFormDialog>
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader><TableRow>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Detalle de Deuda</TableHead>
                            <TableHead>IVA</TableHead>
                            <TableHead className="cursor-pointer" onClick={() => toggleSort('nextDueDate')}>
                                <div className="flex items-center gap-1">
                                    Fecha de Cobro
                                    <ArrowUpDown className="w-4 h-4" />
                                </div>
                            </TableHead>
                            <TableHead className='cursor-pointer' onClick={() => toggleSort('totalDebt')}>
                                <div className="flex items-center gap-1">
                                    Monto Pendiente
                                    <ArrowUpDown className="w-4 h-4" />
                                </div>
                            </TableHead>
                            <TableHead className="text-right">Acciones</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                            {clientDebts.map(({ client, totalDebt, totalIVA, debts, nextDueDate }) => (
                                <TableRow key={client.id}>
                                    <TableCell className="font-medium">{client.name}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col items-start gap-2">
                                            {debts.length > 0 ? debts.map(d => {
                                                const montoConIva = d.conIva ? d.monto * 1.16 : d.monto;
                                                return (
                                                    <div key={d.id} className="flex items-start justify-between gap-2 w-full group">
                                                        <CpcFormDialog cpc={d} onSave={onRefresh} isEditing={true}>
                                                            <div className='text-xs flex-grow cursor-pointer p-1 rounded-md hover:bg-muted'>
                                                                <div className='flex flex-col'>
                                                                    <span className='font-bold whitespace-pre-wrap'>{d.concepto || d.tipo}</span>
                                                                    <Badge variant="secondary" className='font-normal w-fit'>{d.periodo}</Badge>
                                                                    <span className='text-muted-foreground hidden sm:inline'>({d.fecha_cobro})</span>
                                                                </div>
                                                                <div className="font-semibold">
                                                                    {d.monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                                                                </div>
                                                            </div>
                                                        </CpcFormDialog>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity">
                                                                    <MoreHorizontal className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
                                                                <PayCpcDialog onPay={(cuenta, detalle) => handlePayCpc(d, cuenta, detalle)}>
                                                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                                                        <Check className="w-4 h-4 mr-2" />
                                                                        Marcar como Pagado
                                                                    </DropdownMenuItem>
                                                                </PayCpcDialog>
                                                                {['Iguala Contenido', 'Iguala Web', 'Iguala Ads'].includes(d.tipo) && (
                                                                    <DropdownMenuItem onClick={() => handleRecreate(d)}>
                                                                        <Copy className="w-4 h-4 mr-2" />
                                                                        Recrear para sig. mes
                                                                    </DropdownMenuItem>
                                                                )}
                                                                <DropdownMenuItem onClick={() => generatePdf(client, [d], 'recibo')}>
                                                                    <Download className="w-4 h-4 mr-2" />
                                                                    Descargar Recibo
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem onClick={() => generatePdf(client, [d], 'prefactura')}>
                                                                    <FileWarning className="w-4 h-4 mr-2" />
                                                                    Descargar Prefactura
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                )
                                            }) : (
                                                <CpcFormDialog client={client} onSave={onRefresh} isEditing={false}>
                                                    <Button variant="ghost" size="sm" className='text-xs text-muted-foreground'>
                                                        <Plus className='w-3 h-3 mr-1' /> Añadir Cuenta
                                                    </Button>
                                                </CpcFormDialog>
                                            )}
                                            {debts.length > 0 && (
                                                <CpcFormDialog client={client} onSave={onRefresh} isEditing={false}>
                                                    <Button variant="ghost" size="sm" className='text-xs text-muted-foreground mt-1'>
                                                        <Plus className='w-3 h-3 mr-1' /> Añadir otra cuenta
                                                    </Button>
                                                </CpcFormDialog>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col items-start gap-2 h-full">
                                            {debts.map(d => (
                                                <div key={d.id} className="text-xs h-full flex items-center p-1">
                                                    {d.conIva ? (d.monto * 0.16).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' }) : '-'}
                                                </div>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {nextDueDate ? format(nextDueDate, "d 'de' MMMM", { locale: es }) : 'N/A'}
                                    </TableCell>
                                    <TableCell className={cn("font-bold", totalDebt > 0 ? 'text-destructive' : 'text-green-500')}>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <div>
                                                        {totalDebt.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                                                    </div>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p>Subtotal: {totalDebt.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                                                    <p>IVA: {totalIVA.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                                                    <p><strong>Total: {(totalDebt + totalIVA).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</strong></p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <PayCpcDialog onPay={(cuenta, detalle) => handlePayCpc(debts[0], cuenta, detalle)}>
                                            <Button size="sm" disabled={debts.length === 0}>
                                                <Check className="w-4 h-4 mr-1" /> Marcar Pago
                                            </Button>
                                        </PayCpcDialog>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {clientDebts.length === 0 && (
                        <div className="text-center py-8 text-muted-foreground">No hay clientes en esta vista.</div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

const RegistrarIngresoDialog = ({ isAdmin, cuentasPorCobrar, onSave }: { isAdmin: boolean, cuentasPorCobrar: CuentaPorCobrar[], onSave: () => void }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const [selectedCpcId, setSelectedCpcId] = useState<string>('');
    const [cuentaDestino, setCuentaDestino] = useState<Cuenta | ''>('');
    const [detalleEfectivo, setDetalleEfectivo] = useState('');
    const [isManual, setIsManual] = useState(false);
    const [manualAmount, setManualAmount] = useState('');
    const [manualDesc, setManualDesc] = useState('');
    const [manualConIva, setManualConIva] = useState(false);
    const [cpcConIva, setCpcConIva] = useState(false);

    const selectedCpc = useMemo(() => cuentasPorCobrar.find(c => c.id.toString() === selectedCpcId), [selectedCpcId, cuentasPorCobrar]);

    const sortedCuentasPorCobrar = useMemo(() => {
        return [...cuentasPorCobrar].sort((a, b) => a.clienteName.localeCompare(b.clienteName));
    }, [cuentasPorCobrar]);


    const resetForm = () => {
        setSelectedCpcId(''); setCuentaDestino(''); setDetalleEfectivo('');
        setManualAmount(''); setManualDesc(''); setIsManual(false); setManualConIva(false);
        setCpcConIva(false);
    };

    useEffect(() => {
        if (open) resetForm();
    }, [open]);

    useEffect(() => {
        if (selectedCpc) {
            setCpcConIva(selectedCpc.conIva ?? false);
        }
    }, [selectedCpc]);

    const handleSave = async () => {
        if (isManual) {
            if (!manualAmount || !manualDesc || !cuentaDestino) {
                toast({ title: "Error", description: "Descripción, monto y cuenta son obligatorios.", variant: "destructive" });
                return;
            }
            try {
                await addMovimiento({
                    fecha: new Date(),
                    tipo: 'Ingreso',
                    descripcion: manualDesc,
                    monto: parseFloat(manualAmount),
                    cuenta: cuentaDestino,
                    detalleCuenta: detalleEfectivo || null,
                    categoria: 'Otros',
                    conIva: manualConIva,
                });
                toast({ title: "Éxito", description: "Ingreso manual registrado." });
            } catch (e) {
                toast({ title: "Error", description: "No se pudo registrar el ingreso manual.", variant: "destructive" });
            }
        } else {
            if (!selectedCpcId || !cuentaDestino) {
                toast({ title: "Error", description: "Selecciona una cuenta por cobrar y una cuenta de destino.", variant: "destructive" });
                return;
            }
            const cpcToPay = cuentasPorCobrar.find(c => c.id.toString() === selectedCpcId);
            if (!cpcToPay) {
                toast({ title: "Error", description: "Cuenta por cobrar no encontrada.", variant: "destructive" });
                return;
            }
            if (cpcToPay.conIva !== cpcConIva) {
                await updateCpc(cpcToPay.id, { conIva: cpcConIva });
            }
            try {
                await registrarPagoCpc(cpcToPay.id, cuentaDestino as Cuenta, detalleEfectivo || null);
                toast({ title: "Éxito", description: `Pago de ${cpcToPay.clienteName} registrado.` });
            } catch (error: any) {
                toast({ title: "Error", description: `No se pudo registrar el pago: ${error.message}`, variant: "destructive" });
                return;
            }
        }

        startTransition(() => {
            onSave();
            setOpen(false);
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button><PlusCircle className="w-4 h-4 mr-2" />Registrar Ingreso</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Registrar Ingreso</DialogTitle></DialogHeader>
                {isAdmin && (
                    <RadioGroup onValueChange={(v) => setIsManual(v === 'manual')} defaultValue="cpc" className='flex pt-2 space-x-4'>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="cpc" id="cpc-mode" /><Label htmlFor="cpc-mode" className='font-normal'>Registrar Pago de CxC</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="manual" id="manual-mode" /><Label htmlFor="manual-mode" className='font-normal'>Ingreso Manual</Label></div>
                    </RadioGroup>
                )}
                {isManual && isAdmin ? (
                    <div className="grid gap-4 py-4">
                        <Input value={manualDesc} onChange={e => setManualDesc(e.target.value)} placeholder="Descripción del ingreso" />
                        <Input type="number" value={manualAmount} onChange={e => setManualAmount(e.target.value)} placeholder="Monto (MXN)" />
                        <div className="flex items-center space-x-2">
                            <Checkbox id="manual-conIva" checked={manualConIva} onCheckedChange={c => setManualConIva(Boolean(c))} />
                            <Label htmlFor="manual-conIva" className="font-normal">Incluye IVA (16%)</Label>
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4">
                        <Select value={selectedCpcId} onValueChange={setSelectedCpcId}>
                            <SelectTrigger><SelectValue placeholder="Seleccionar cliente pendiente" /></SelectTrigger>
                            <SelectContent>{sortedCuentasPorCobrar.map(cpc => <SelectItem key={cpc.id} value={cpc.id.toString()}>{cpc.clienteName} - {cpc.periodo}</SelectItem>)}</SelectContent>
                        </Select>
                        {cuentasPorCobrar.length === 0 && <p className="text-sm text-muted-foreground">No hay cuentas por cobrar pendientes.</p>}
                        {selectedCpc && (
                            <Card className="bg-muted p-4 space-y-2">
                                <p><strong>Monto:</strong> {selectedCpc.monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="cxc-conIva" checked={cpcConIva} onCheckedChange={c => setCpcConIva(Boolean(c))} />
                                    <Label htmlFor="cxc-conIva" className="font-normal">Incluye IVA (16%)</Label>
                                </div>
                            </Card>
                        )}
                    </div>
                )}
                <div className="grid gap-4">
                    <Select value={cuentaDestino} onValueChange={(value) => setCuentaDestino(value as any)}>
                        <SelectTrigger><SelectValue placeholder="Seleccionar cuenta de destino" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Cuenta Paola">Cuenta Paola</SelectItem>
                            <SelectItem value="Cuenta MAW">Cuenta MAW</SelectItem>
                            <SelectItem value="Cuenta Aldo">Cuenta Aldo</SelectItem>
                            <SelectItem value="Efectivo">Efectivo</SelectItem>
                        </SelectContent>
                    </Select>
                    {cuentaDestino === 'Efectivo' && <Input value={detalleEfectivo} onChange={e => setDetalleEfectivo(e.target.value)} placeholder="Especifique (ej. Caja chica, Fany)" />}
                </div>
                <DialogFooter className='mt-4'>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave} disabled={isManual ? (!manualAmount || !manualDesc || !cuentaDestino) : (!selectedCpcId || !cuentaDestino)}>Registrar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const RegistrarGastoDialog = ({ onSave }: { onSave: () => void }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState('');
    const [cuenta, setCuenta] = useState<Cuenta | ''>('');
    const [detalleEfectivo, setDetalleEfectivo] = useState('');
    const [categoria, setCategoria] = useState<CategoriaGasto | ''>('');
    const [nombreOtro, setNombreOtro] = useState('');
    const [conIva, setConIva] = useState(false);

    const categoriasDisponibles: CategoriaIngreso[] = ["Iguala Contenido", "Iguala Web", "Iguala Ads", "Proyecto", "Contenido", "Ads", "Web", "Renovaciones", "Otros"];

    const resetForm = () => {
        setDescripcion(''); setMonto(''); setCuenta(''); setDetalleEfectivo('');
        setCategoria(''); setNombreOtro(''); setConIva(false);
    };

    useEffect(() => {
        if (open) resetForm();
    }, [open]);

    const handleSave = async () => {
        if (!descripcion || !monto || !cuenta || !categoria) {
            toast({ title: "Error", description: "Todos los campos son obligatorios.", variant: "destructive" });
            return;
        }

        try {
            await addMovimiento({
                fecha: new Date(),
                tipo: 'Gasto',
                descripcion,
                monto: parseFloat(monto),
                cuenta,
                detalleCuenta: cuenta === 'Efectivo' ? detalleEfectivo : null,
                categoria,
                nombreOtro: ['Personales', 'Otros'].includes(categoria) ? nombreOtro : null,
                conIva,
            });
            toast({ title: "Éxito", description: "Gasto registrado." });
            onSave();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "No se pudo registrar el gasto.", variant: "destructive" });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild><Button variant="destructive"><MinusCircle className="w-4 h-4 mr-2" />Registrar Gasto</Button></DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Registrar Gasto</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción del gasto" />
                    <Input type="number" value={monto} onChange={e => setMonto(e.target.value)} placeholder="Monto (MXN)" />
                    <Select value={categoria} onValueChange={(v) => setCategoria(v as CategoriaGasto)}>
                        <SelectTrigger><SelectValue placeholder="Categoría" /></SelectTrigger>
                        <SelectContent>{categoriasDisponibles.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                    </Select>
                    {(categoria === 'Personales' || categoria === 'Otros') && <Input value={nombreOtro} onChange={e => setNombreOtro(e.target.value)} placeholder="Nombre Específico (Ej. Fany)" />}
                    <Select value={cuenta} onValueChange={(v) => setCuenta(v as Cuenta)}>
                        <SelectTrigger><SelectValue placeholder="Cuenta de Origen" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Cuenta Paola">Cuenta Paola</SelectItem>
                            <SelectItem value="Cuenta MAW">Cuenta MAW</SelectItem>
                            <SelectItem value="Cuenta Aldo">Cuenta Aldo</SelectItem>
                            <SelectItem value="Efectivo">Efectivo</SelectItem>
                        </SelectContent>
                    </Select>
                    {cuenta === 'Efectivo' && <Input value={detalleEfectivo} onChange={e => setDetalleEfectivo(e.target.value)} placeholder="Especifique (ej. Caja chica)" />}
                    <div className="flex items-center space-x-2">
                        <Checkbox id="gasto-conIva" checked={conIva} onCheckedChange={c => setConIva(Boolean(c))} />
                        <Label htmlFor="gasto-conIva" className="font-normal">Incluye IVA (16%)</Label>
                    </div>
                </div>
                <DialogFooter className='mt-4'>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button variant="destructive" onClick={handleSave}>Registrar Gasto</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const MovimientoFormDialog = ({ movimiento, onSave, children }: { movimiento: MovimientoDiario, onSave: () => void, children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();

    const [descripcion, setDescripcion] = useState('');
    const [monto, setMonto] = useState('');
    const [cuenta, setCuenta] = useState<Cuenta | ''>('');
    const [detalleEfectivo, setDetalleEfectivo] = useState('');
    const [categoria, setCategoria] = useState<CategoriaIngreso | CategoriaGasto | ''>('');
    const [nombreOtro, setNombreOtro] = useState('');
    const [conIva, setConIva] = useState(false);

    const isGasto = movimiento.tipo === 'Gasto';
    const categoriasDisponibles = isGasto ?
        (["Publicidad", "Sueldos", "Comisiones", "Impuestos", "Personales", "Renta", "Otros"] as CategoriaGasto[]) :
        (["Proyecto", "Iguala Contenido", "Renovaciones", "Otros", "Contenido", "Ads", "Web"] as CategoriaIngreso[]);

    useEffect(() => {
        if (open) {
            setDescripcion(movimiento.descripcion);
            setMonto(movimiento.monto.toString());
            setCuenta(movimiento.cuenta as Cuenta);
            setDetalleEfectivo(movimiento.detalleCuenta || '');
            setCategoria(movimiento.categoria as any || '');
            setNombreOtro(movimiento.nombreOtro || '');
            setConIva(movimiento.conIva ?? false);
        }
    }, [open, movimiento]);

    const handleSave = async () => {
        if (!descripcion || !monto || !cuenta || !categoria) {
            toast({ title: "Error", description: "Todos los campos son obligatorios.", variant: "destructive" });
            return;
        }

        try {
            await updateMovimiento(movimiento.id, {
                descripcion,
                monto: parseFloat(monto),
                cuenta,
                categoria,
                detalleCuenta: cuenta === 'Efectivo' ? detalleEfectivo : null,
                nombreOtro: ['Personales', 'Otros'].includes(categoria) ? nombreOtro : null,
                conIva,
            });
            toast({ title: "Éxito", description: "Movimiento actualizado." });
            onSave();
            setOpen(false);
        } catch (error: any) {
            toast({ title: "Error", description: `No se pudo actualizar el movimiento: ${error.message}`, variant: "destructive" });
        }
    }

    const handleDelete = async () => {
        try {
            await deleteMovimiento(movimiento.id);
            toast({ title: "Eliminado", description: "El movimiento ha sido eliminado." });
            onSave();
            setOpen(false);
        } catch (error) {
            toast({ title: "Error", description: "No se pudo eliminar el movimiento.", variant: "destructive" });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader><DialogTitle>Editar Movimiento</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <Input value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción" />
                    <Input type="number" value={monto} onChange={e => setMonto(e.target.value)} placeholder="Monto (MXN)" />
                    <Select value={categoria} onValueChange={(v) => setCategoria(v as any)}>
                        <SelectTrigger><SelectValue placeholder="Categoría" /></SelectTrigger>
                        <SelectContent>{categoriasDisponibles.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}</SelectContent>
                    </Select>
                    {(categoria === 'Personales' || categoria === 'Otros') && <Input value={nombreOtro} onChange={e => setNombreOtro(e.target.value)} placeholder="Nombre Específico (Ej. Fany)" />}
                    <Select value={cuenta} onValueChange={(v) => setCuenta(v as any)}>
                        <SelectTrigger><SelectValue placeholder="Cuenta" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Cuenta Paola">Cuenta Paola</SelectItem>
                            <SelectItem value="Cuenta MAW">Cuenta MAW</SelectItem>
                            <SelectItem value="Cuenta Aldo">Cuenta Aldo</SelectItem>
                            <SelectItem value="Efectivo">Efectivo</SelectItem>
                        </SelectContent>
                    </Select>
                    {cuenta === 'Efectivo' && <Input value={detalleEfectivo} onChange={e => setDetalleEfectivo(e.target.value)} placeholder="Especifique (ej. Caja chica)" />}
                    <div className="flex items-center space-x-2">
                        <Checkbox id={`edit-conIva-${movimiento.id}`} checked={conIva} onCheckedChange={c => setConIva(Boolean(c))} />
                        <Label htmlFor={`edit-conIva-${movimiento.id}`} className="font-normal">Incluye IVA (16%)</Label>
                    </div>
                </div>
                <DialogFooter className="justify-between">
                    <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="destructive"><Trash2 className="w-4 h-4 mr-2" />Eliminar</Button></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                <AlertDialogDescription>Esta acción eliminará permanentemente el movimiento. No se puede deshacer.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Confirmar Eliminación</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <div className='flex gap-2'>
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSave}>Guardar Cambios</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const SummaryCard = ({ title, value, icon, breakdown, colorClass }: { title: string, value: number, icon: React.ReactNode, breakdown: Record<string, number>, colorClass: string }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Card className="cursor-pointer hover:bg-muted">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{title}</CardTitle>
                        {icon}
                    </CardHeader>
                    <CardContent>
                        <div className={cn("text-2xl font-bold", colorClass)}>
                            {value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                        </div>
                    </CardContent>
                </Card>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem className="font-bold justify-between">
                    <span>Cuenta</span>
                    <span>Monto</span>
                </DropdownMenuItem>
                {Object.entries(breakdown).map(([cuenta, monto]) => (
                    <DropdownMenuItem key={cuenta} className="justify-between">
                        <span>{cuenta}</span>
                        <span>{monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const TablaDiariaTab = ({ isAdmin, movimientos, onSave, cuentasPorCobrar }: { isAdmin: boolean, movimientos: MovimientoDiario[], onSave: () => void, cuentasPorCobrar: CuentaPorCobrar[] }) => {
    const [selectedMonth, setSelectedMonth] = useState(format(new Date(), 'yyyy-MM'));

    const parsedMonth = useMemo(() => {
        if (!selectedMonth || !/^\d{4}-\d{2}$/.test(selectedMonth)) return null;
        try {
            const d = parseISO(`${selectedMonth}-01`);
            return isNaN(d.getTime()) ? null : d;
        } catch { return null; }
    }, [selectedMonth]);

    const monthlyFilteredMovements = useMemo(() => {
        if (!parsedMonth) return [];
        const start = startOfMonth(parsedMonth);
        const end = endOfMonth(parsedMonth);
        return movimientos.filter(mov => {
            try {
                const movDate = new Date(mov.fecha);
                if (isNaN(movDate.getTime())) return false;
                return isWithinInterval(movDate, { start, end });
            } catch { return false; }
        });
    }, [movimientos, parsedMonth]);

    const summary = useMemo(() => {
        const totalCpc = cuentasPorCobrar.reduce((sum, cpc) => sum + cpc.monto, 0);
        const totalCpcIva = cuentasPorCobrar.reduce((sum, cpc) => sum + (cpc.conIva ? cpc.monto * 0.16 : 0), 0);

        const cpcPorTipo: Record<string, number> = {};
        cuentasPorCobrar.forEach(cpc => {
            const tipo = cpc.tipo || 'Sin tipo';
            const montoConIva = cpc.monto + (cpc.conIva ? cpc.monto * 0.16 : 0);
            cpcPorTipo[tipo] = (cpcPorTipo[tipo] || 0) + montoConIva;
        });

        const initialBreakdown = { "Cuenta Paola": 0, "Cuenta MAW": 0, "Cuenta Aldo": 0, "Efectivo": 0, "Pendiente": 0 };

        const monthlySummary = monthlyFilteredMovements.reduce((acc, mov) => {
            const cuenta = mov.cuenta as keyof typeof initialBreakdown;
            const totalAmount = mov.monto + (mov.iva || 0);

            if (mov.tipo === 'Ingreso') {
                acc.totalIngresos += totalAmount;
                if (acc.ingresosPorCuenta[cuenta] !== undefined) acc.ingresosPorCuenta[cuenta] += totalAmount;
                if (mov.iva) acc.ivaIngresos += mov.iva;
            } else if (mov.tipo === 'Gasto') {
                acc.totalGastos += totalAmount;
                if (acc.gastosPorCuenta[cuenta] !== undefined) acc.gastosPorCuenta[cuenta] += totalAmount;
                if (mov.iva) acc.ivaGastos += mov.iva;
            }
            return acc;
        }, {
            totalIngresos: 0,
            totalGastos: 0,
            ivaIngresos: 0,
            ivaGastos: 0,
            ingresosPorCuenta: { ...initialBreakdown },
            gastosPorCuenta: { ...initialBreakdown }
        });

        const utilidadPorCuenta = Object.keys(initialBreakdown).reduce((acc, cuenta) => {
            const key = cuenta as keyof typeof initialBreakdown;
            acc[key] = monthlySummary.ingresosPorCuenta[key] - monthlySummary.gastosPorCuenta[key];
            return acc;
        }, { ...initialBreakdown });

        return {
            ...monthlySummary,
            totalCuentasPorCobrar: totalCpc,
            totalCuentasPorCobrarIva: totalCpcIva,
            cpcPorTipo,
            balance: monthlySummary.totalIngresos - monthlySummary.totalGastos,
            utilidadPorCuenta
        };
    }, [monthlyFilteredMovements, cuentasPorCobrar]);

    // Calcular utilidad neta anual (todo el año seleccionado)
    const annualSummary = useMemo(() => {
        if (!parsedMonth) return { utilidadAnual: 0, utilidadAnualPorCuenta: {} };

        const selectedYear = parsedMonth.getFullYear().toString();

        const initialBreakdown = { "Cuenta Paola": 0, "Cuenta MAW": 0, "Cuenta Aldo": 0, "Efectivo": 0, "Pendiente": 0 };

        // Filtrar todos los movimientos del año seleccionado (enero a diciembre)
        const yearMovements = movimientos.filter(mov => {
            const movDate = new Date(mov.fecha);
            const movYear = movDate.getFullYear().toString();
            return movYear === selectedYear;
        });

        const annualCalc = yearMovements.reduce((acc, mov) => {
            const cuenta = mov.cuenta as keyof typeof initialBreakdown;
            const totalAmount = mov.monto + (mov.iva || 0);

            if (mov.tipo === 'Ingreso') {
                acc.totalIngresos += totalAmount;
                if (acc.ingresosPorCuenta[cuenta] !== undefined) acc.ingresosPorCuenta[cuenta] += totalAmount;
            } else if (mov.tipo === 'Gasto') {
                acc.totalGastos += totalAmount;
                if (acc.gastosPorCuenta[cuenta] !== undefined) acc.gastosPorCuenta[cuenta] += totalAmount;
            }
            return acc;
        }, {
            totalIngresos: 0,
            totalGastos: 0,
            ingresosPorCuenta: { ...initialBreakdown },
            gastosPorCuenta: { ...initialBreakdown }
        });

        const utilidadAnualPorCuenta = Object.keys(initialBreakdown).reduce((acc, cuenta) => {
            const key = cuenta as keyof typeof initialBreakdown;
            acc[key] = annualCalc.ingresosPorCuenta[key] - annualCalc.gastosPorCuenta[key];
            return acc;
        }, { ...initialBreakdown });

        return {
            utilidadAnual: annualCalc.totalIngresos - annualCalc.totalGastos,
            utilidadAnualPorCuenta
        };
    }, [movimientos, parsedMonth]);

    // Calcular utilidad total histórica (todos los años)
    const totalHistorico = useMemo(() => {
        const initialBreakdown = { "Cuenta Paola": 0, "Cuenta MAW": 0, "Cuenta Aldo": 0, "Efectivo": 0, "Pendiente": 0 };

        const allTimeCalc = movimientos.reduce((acc, mov) => {
            const cuenta = mov.cuenta as keyof typeof initialBreakdown;
            const totalAmount = mov.monto + (mov.iva || 0);

            if (mov.tipo === 'Ingreso') {
                acc.totalIngresos += totalAmount;
                if (acc.ingresosPorCuenta[cuenta] !== undefined) acc.ingresosPorCuenta[cuenta] += totalAmount;
            } else if (mov.tipo === 'Gasto') {
                acc.totalGastos += totalAmount;
                if (acc.gastosPorCuenta[cuenta] !== undefined) acc.gastosPorCuenta[cuenta] += totalAmount;
            }
            return acc;
        }, {
            totalIngresos: 0,
            totalGastos: 0,
            ingresosPorCuenta: { ...initialBreakdown },
            gastosPorCuenta: { ...initialBreakdown }
        });

        const utilidadTotalPorCuenta = Object.keys(initialBreakdown).reduce((acc, cuenta) => {
            const key = cuenta as keyof typeof initialBreakdown;
            acc[key] = allTimeCalc.ingresosPorCuenta[key] - allTimeCalc.gastosPorCuenta[key];
            return acc;
        }, { ...initialBreakdown });

        return {
            utilidadTotal: allTimeCalc.totalIngresos - allTimeCalc.totalGastos,
            utilidadTotalPorCuenta
        };
    }, [movimientos]);

    return (
        <div className='space-y-4'>
            <div className="flex justify-between items-center">
                <Input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="w-[200px]"
                />
                <div className="flex gap-2">
                    <RegistrarIngresoDialog isAdmin={isAdmin} cuentasPorCobrar={cuentasPorCobrar} onSave={onSave} />
                    {isAdmin && <RegistrarGastoDialog onSave={onSave} />}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <SummaryCard title="Ingresos del Mes" value={summary.totalIngresos} icon={<TrendingUp className="h-4 w-4 text-green-500" />} breakdown={summary.ingresosPorCuenta} colorClass="text-green-500" />
                <SummaryCard title="Gastos del Mes" value={summary.totalGastos} icon={<TrendingDown className="h-4 w-4 text-red-500" />} breakdown={summary.gastosPorCuenta} colorClass="text-red-500" />
                <SummaryCard title="Utilidad Neta Mensual" value={summary.balance} icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} breakdown={summary.utilidadPorCuenta} colorClass={summary.balance >= 0 ? 'text-blue-500' : 'text-destructive'} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Card className="cursor-pointer hover:bg-muted">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total por Cobrar</CardTitle><FileWarning className="h-4 w-4 text-orange-500" /></CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold text-orange-500">
                                    {(summary.totalCuentasPorCobrar + summary.totalCuentasPorCobrarIva).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Subtotal: {summary.totalCuentasPorCobrar.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} + IVA: {summary.totalCuentasPorCobrarIva.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                                </p>
                            </CardContent>
                        </Card>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="font-bold justify-between">
                            <span>Tipo</span>
                            <span>Monto</span>
                        </DropdownMenuItem>
                        {Object.entries(summary.cpcPorTipo).map(([tipo, monto]) => (
                            <DropdownMenuItem key={tipo} className="justify-between">
                                <span>{tipo}</span>
                                <span>{monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Impuestos (IVA)</CardTitle>
                        <Percent className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-lg font-bold">{((summary.ivaIngresos || 0) - (summary.ivaGastos || 0)).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</div>
                        <p className="text-xs text-muted-foreground">IVA a favor/pagar en el periodo</p>
                    </CardContent>
                </Card>
                <SummaryCard
                    title={`Utilidad Neta Anual ${parsedMonth ? parsedMonth.getFullYear() : ''}`}
                    value={annualSummary.utilidadAnual}
                    icon={<TrendingUp className="h-4 w-4 text-green-500" />}
                    breakdown={annualSummary.utilidadAnualPorCuenta}
                    colorClass={annualSummary.utilidadAnual >= 0 ? 'text-green-500' : 'text-destructive'}
                />
                <SummaryCard
                    title="Total Histórico"
                    value={totalHistorico.utilidadTotal}
                    icon={<DollarSign className="h-4 w-4 text-purple-500" />}
                    breakdown={totalHistorico.utilidadTotalPorCuenta}
                    colorClass={totalHistorico.utilidadTotal >= 0 ? 'text-purple-500' : 'text-destructive'}
                />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Movimientos de {parsedMonth ? format(parsedMonth, 'MMMM yyyy', { locale: es }) : ''}</CardTitle>
                    <CardDescription>Registro de todos los ingresos y gastos del mes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <TooltipProvider>
                            <Table>
                                <TableHeader><TableRow><TableHead>Fecha</TableHead><TableHead>Tipo</TableHead><TableHead>Cliente</TableHead><TableHead>Descripción</TableHead><TableHead>Categoría / Detalle</TableHead><TableHead>Cuenta</TableHead><TableHead className="text-right">Monto</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {monthlyFilteredMovements.map(mov => (
                                        <MovimientoFormDialog key={mov.id} movimiento={mov} onSave={onSave}>
                                            <TableRow className="cursor-pointer">
                                                <TableCell>{(() => { try { return format(new Date(mov.fecha), 'dd MMM yyyy, HH:mm', { locale: es }); } catch { return '-'; } })()}</TableCell>
                                                <TableCell><Badge variant={mov.tipo === 'Ingreso' ? 'default' : 'destructive'} className={cn(mov.tipo === 'Ingreso' && 'bg-green-500 hover:bg-green-500/80')}>{mov.tipo}</Badge></TableCell>
                                                <TableCell className="font-medium">{mov.clienteName || '-'}</TableCell>
                                                <TableCell>{mov.descripcion}</TableCell>
                                                <TableCell>
                                                    <div className="flex flex-col">
                                                        <span>{mov.categoria}{mov.nombreOtro ? ` (${mov.nombreOtro})` : ''}</span>
                                                        {mov.conIva && <Badge variant="outline" className='w-fit mt-1 text-xs'>Con IVA</Badge>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={mov.cuenta === 'Pendiente' ? 'outline' : 'secondary'}>
                                                        {mov.cuenta}{mov.detalleCuenta ? ` (${mov.detalleCuenta})` : ''}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className={cn("text-right font-bold", mov.tipo === 'Ingreso' ? 'text-green-500' : 'text-destructive')}>
                                                    <div className='whitespace-pre-wrap'>
                                                        {(mov.monto + (mov.iva || 0)).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                                                        {mov.conIva && mov.iva != null && (
                                                            <div className="text-xs font-normal text-muted-foreground">
                                                                (Sub: {mov.monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })} + IVA: {mov.iva.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })})
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        </MovimientoFormDialog>
                                    ))}
                                </TableBody>
                            </Table>
                        </TooltipProvider>
                        {monthlyFilteredMovements.length === 0 && (
                            <div className="text-center p-8 text-muted-foreground">
                                No hay movimientos en este mes.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}

export default function FinanzasPage() {
    const { user } = useAuth();
    const [clients, setClients] = useState<(Client & { financialProfile: ClientFinancialProfile | null; })[]>([]);
    const [movimientos, setMovimientos] = useState<MovimientoDiario[]>([]);
    const [cuentasPorCobrar, setCuentasPorCobrar] = useState<CuentaPorCobrar[]>([]);
    const [activeTab, setActiveTab] = useState("cuentas-por-cobrar");
    const [isLoading, setIsLoading] = useState(true);

    const isAdmin = user?.role === 'admin' || user?.role === 'contabilidad';
    const { toast } = useToast();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [clientsData, cpcData, movimientosData] = await Promise.all([
                getClients(),
                getCuentasPorCobrar(),
                getMovimientos()
            ]);
            setClients((clientsData as (Client & { financialProfile: ClientFinancialProfile | null; })[]).sort((a, b) => a.name.localeCompare(b.name)));
            setCuentasPorCobrar(cpcData as CuentaPorCobrar[]);
            setMovimientos(movimientosData as MovimientoDiario[]);
        } catch (error) {
            toast({
                title: "Error al cargar datos",
                description: "No se pudieron obtener los datos financieros. Intenta recargar la página.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div></div>
    }

    if (!user || !user.accessSections?.finanzas) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Acceso Denegado</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No tienes permiso para ver esta sección.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold font-headline">
                    {activeTab === 'cuentas-por-cobrar' && 'Gestión de Cobranza'}
                    {activeTab === 'tabla-diaria' && 'Control Financiero Mensual'}
                </h1>
            </div>
            <Tabs defaultValue="cuentas-por-cobrar" className="w-full" onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cuentas-por-cobrar"><DollarSign className="w-4 h-4 mr-2" />Control de Pagos</TabsTrigger>
                    <TabsTrigger value="tabla-diaria"><TrendingUp className="w-4 h-4 mr-2" />Tabla Diaria</TabsTrigger>
                </TabsList>
                <TabsContent value="cuentas-por-cobrar" className="mt-4">
                    <CuentasPorCobrarTab data={cuentasPorCobrar} clients={clients} onRefresh={fetchData} isAdmin={isAdmin} />
                </TabsContent>
                <TabsContent value="tabla-diaria" className="mt-4">
                    <TablaDiariaTab isAdmin={isAdmin} movimientos={movimientos} onSave={fetchData} cuentasPorCobrar={cuentasPorCobrar} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
