'use client';

import React, { useState, useMemo, useEffect, startTransition } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { DollarSign, Building, TrendingUp, TrendingDown, PlusCircle, Edit, Trash2, Info } from 'lucide-react';
import { useAuth } from '@/lib/auth-provider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getPersonalFinance, updatePersonalFinanceEntry, getBalanceSheetData, addActivo, updateActivo, deleteActivo, addPasivo, updatePasivo, deletePasivo, type PersonalFinanceTransaction } from './_actions';
import { ComoVoyEnMisFinanzas, Activo, Pasivo, NewActivo, NewPasivo } from '@/lib/db/schema';
import { useToast } from '@/hooks/use-toast';
import { getMonth, getYear, format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Textarea } from '@/components/ui/textarea';

const EditableCell = ({ value, description, onSave }: { value: number | undefined, description?: string | null, onSave: (newAmount: number, newDescription: string) => void }) => {
    const [open, setOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState(value || 0);
    const [currentDescription, setCurrentDescription] = useState(description || '');

    useEffect(() => {
        if (open) {
            setCurrentValue(value || 0);
            setCurrentDescription(description || '');
        }
    }, [open, value, description]);

    const handleSave = () => {
        onSave(currentValue, currentDescription);
        setOpen(false);
    }
    
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <div className="cursor-pointer w-full text-right p-2 h-10 rounded-md hover:bg-muted/50 flex items-center justify-end gap-1">
                     {description && <Info className="w-3 h-3 text-muted-foreground" />}
                    <span>{(value || 0).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Editar Valor</h4>
                        <p className="text-sm text-muted-foreground">
                            Ajusta el monto y añade una descripción.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="monto">Monto</Label>
                            <Input
                                id="monto"
                                type="number"
                                value={currentValue}
                                onChange={(e) => setCurrentValue(parseFloat(e.target.value) || 0)}
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="descripcion">Descripción</Label>
                            <Input
                                id="descripcion"
                                value={currentDescription}
                                onChange={(e) => setCurrentDescription(e.target.value)}
                                className="col-span-2 h-8"
                                placeholder="Ej. Ingreso extra por proyecto X"
                            />
                        </div>
                    </div>
                    <Button onClick={handleSave} size="sm" className="mt-2">Guardar</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

const PersonalFinanceDashboard = ({ personalData, selectedYear, onRefresh }: { personalData: ComoVoyEnMisFinanzas[], selectedYear: number, onRefresh: () => void }) => {
    const { toast } = useToast();
    
    const handleCellSave = async (month: string, category: string, newAmount: number, newDescription: string) => {
        const monthNames: Record<string, number> = { "enero": 0, "febrero": 1, "marzo": 2, "abril": 3, "mayo": 4, "junio": 5, "julio": 6, "agosto": 7, "septiembre": 8, "octubre": 9, "noviembre": 10, "diciembre": 11 };
        const monthIndex = monthNames[month.toLowerCase() as keyof typeof monthNames];
        const year = selectedYear;
        
        if (monthIndex === undefined) {
            toast({ title: 'Error', description: `Mes inválido: ${month}`, variant: 'destructive' });
            return;
        }

        const entryDate = new Date(year, monthIndex, 15);

        const entry: PersonalFinanceTransaction = {
            id: -1,
            fecha: entryDate.toISOString(),
            tipo: newAmount >= 0 ? 'INGRESO' : 'GASTO',
            descripcion: newDescription,
            monto: newAmount,
            cuenta: 'Efectivo',
            categoria: category
        };
        
        try {
            await updatePersonalFinanceEntry(entry);
            toast({ title: 'Éxito', description: 'Dato actualizado correctamente.' });
            onRefresh();
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    }

    const monthlyData = useMemo(() => {
        const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const incomeCategories = ["Agencia", "Oscar", "Transporte", "Rentas", "Bienes Raices", "Intereses", "Ganancia"];

        return monthNames.map((month, monthIndex) => {
            const row: { [key: string]: any } = { month };
            
            incomeCategories.forEach(category => {
                 const entries = personalData.filter(d => {
                    const entryDate = new Date(d.fecha);
                    const categoryMatch = d.categoria?.toLowerCase() === category.toLowerCase();
                    return getMonth(entryDate) === monthIndex && getYear(entryDate) === selectedYear && categoryMatch;
                });
                const totalAmount = entries.reduce((sum, item) => sum + (item.tipo.toUpperCase() === 'GASTO' ? -item.monto : item.monto), 0);
                const description = entries.length > 0 ? entries[0].descripcion : null;
                row[category] = { amount: totalAmount, description };
            });
            
            const gananciaData = row['Ganancia'];
            if (!gananciaData || gananciaData.amount === 0) {
                 const calculatedGanancia = incomeCategories
                    .filter(cat => cat !== 'Ganancia')
                    .reduce((sum, cat) => sum + (row[cat]?.amount || 0), 0);
                 row['Ganancia'] = { amount: calculatedGanancia, description: 'Suma de todas las categorías' };
            }
            
            return row;
        });
    }, [personalData, selectedYear]);

    const totals = useMemo(() => {
        return monthlyData.reduce((acc, row) => {
            Object.keys(row).forEach(key => {
                if (key !== 'month') {
                    acc[key] = (acc[key] || 0) + (row[key]?.amount || 0);
                }
            });
            return acc;
        }, {} as {[key: string]: number});
    }, [monthlyData]);
    
    const averages = useMemo(() => {
        const avg: { [key: string]: number } = {};
        const monthsWithData = monthlyData.filter((row, index) => {
            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            return selectedYear < currentYear || (selectedYear === currentYear && index <= currentMonth);
        }).length || 1;
        
        Object.keys(totals).forEach(key => {
            avg[key] = totals[key] / monthsWithData;
        });
        return avg;
    }, [totals, monthlyData, selectedYear]);

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Building className="w-5 h-5"/>Resumen Financiero Personal</CardTitle>
                <CardDescription>Consolidado de tus fuentes de ingreso para el año {selectedYear}.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Mes</TableHead>
                                {["Agencia", "Oscar", "Transporte", "Rentas", "Bienes Raices", "Intereses"].map(cat => <TableHead key={cat}>{cat}</TableHead>)}
                                <TableHead className="font-bold text-right">Ganancia</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {monthlyData.map((row) => (
                                <TableRow key={row.month} className="h-14">
                                    <TableCell className="font-medium capitalize">{row.month}</TableCell>
                                    {["Agencia", "Oscar", "Transporte", "Rentas", "Bienes Raices", "Intereses"].map(cat => (
                                        <TableCell key={cat} className='p-0'>
                                            <EditableCell 
                                                value={row[cat]?.amount} 
                                                description={row[cat]?.description}
                                                onSave={(newAmount, newDescription) => handleCellSave(row.month, cat, newAmount, newDescription)}
                                            />
                                        </TableCell>
                                    ))}
                                    <TableCell className={cn("p-0 font-bold", (row.Ganancia?.amount || 0) < 0 ? "text-red-500" : "text-green-500")}>
                                        <EditableCell 
                                            value={row.Ganancia?.amount} 
                                            description={row.Ganancia?.description}
                                            onSave={(newAmount, newDescription) => handleCellSave(row.month, 'Ganancia', newAmount, newDescription)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                         <TableFooter>
                            <TableRow className="font-bold bg-muted/50 text-base">
                                <TableCell>Total Anual</TableCell>
                                {["Agencia", "Oscar", "Transporte", "Rentas", "Bienes Raices", "Intereses"].map(cat => (
                                     <TableCell key={`total-${cat}`} className="text-right">{totals[cat]?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</TableCell>
                                ))}
                                <TableCell className={cn("text-right", (totals.Ganancia || 0) < 0 ? "text-red-500" : "text-green-500")}>
                                  {totals.Ganancia?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                                </TableCell>
                            </TableRow>
                             <TableRow className="font-semibold bg-muted/20 text-sm">
                                <TableCell>Promedio Mensual</TableCell>
                                 {["Agencia", "Oscar", "Transporte", "Rentas", "Bienes Raices", "Intereses"].map(cat => (
                                     <TableCell key={`avg-${cat}`} className="text-right text-muted-foreground">{averages[cat]?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</TableCell>
                                 ))}
                                <TableCell className={cn("text-right text-muted-foreground", (averages.Ganancia || 0) < 0 ? "text-red-500/80" : "")}>
                                  {averages.Ganancia?.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

const BalanceSheet = ({ data, onRefresh, isAdmin }: { data: { activos: Activo[], pasivos: Pasivo[], totalCuentasPorCobrar: number }, onRefresh: () => void, isAdmin: boolean }) => {
    const { toast } = useToast();

    const handleAddAsset = async (asset: Omit<NewActivo, 'id'>) => {
        try {
            await addActivo(asset);
            toast({ title: 'Éxito', description: 'Activo añadido.' });
            onRefresh();
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        }
    };
    
    const handleAddLiability = async (liability: Omit<NewPasivo, 'id'>) => {
        try {
            await addPasivo(liability);
            toast({ title: 'Éxito', description: 'Pasivo añadido.' });
            onRefresh();
        } catch (e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        }
    };
    
    const totalActivos = data.activos.reduce((sum, asset) => sum + asset.valor, 0) + data.totalCuentasPorCobrar;
    const totalPasivos = data.pasivos.reduce((sum, liab) => sum + liab.monto, 0);
    const capitalContable = totalActivos - totalPasivos;

    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Balance General</CardTitle>
                <CardDescription>Una fotografía de la situación financiera de la empresa.</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-8">
                {/* Activos */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-green-500 flex items-center gap-2"><TrendingUp/> Activos</h3>
                        {isAdmin && <AssetLiabilityDialog onSave={handleAddAsset} isAsset={true} />}
                    </div>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead className="text-right">Valor</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.activos.map(asset => (
                                    <AssetLiabilityDialog key={asset.id} item={asset} onSave={onRefresh} isAsset={true} triggerAsChild={true}>
                                        <TableRow className="cursor-pointer">
                                            <TableCell className="font-medium">{asset.nombre}</TableCell>
                                            <TableCell className="text-right">{asset.valor.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</TableCell>
                                        </TableRow>
                                    </AssetLiabilityDialog>
                                ))}
                                <TableRow>
                                    <TableCell className="font-medium">Cuentas por Cobrar</TableCell>
                                    <TableCell className="text-right">{data.totalCuentasPorCobrar.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</TableCell>
                                </TableRow>
                            </TableBody>
                            <TableFooter>
                                <TableRow className="font-bold text-base">
                                    <TableCell>Total Activos</TableCell>
                                    <TableCell className="text-right">{totalActivos.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>

                {/* Pasivos */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-red-500 flex items-center gap-2"><TrendingDown/> Pasivos</h3>
                         {isAdmin && <AssetLiabilityDialog onSave={handleAddLiability} isAsset={false} />}
                    </div>
                     <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead className="text-right">Monto</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                 {data.pasivos.map(liability => (
                                     <AssetLiabilityDialog key={liability.id} item={liability} onSave={onRefresh} isAsset={false} triggerAsChild={true}>
                                        <TableRow className="cursor-pointer">
                                            <TableCell className="font-medium">{liability.nombre}</TableCell>
                                            <TableCell className="text-right">{liability.monto.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</TableCell>
                                        </TableRow>
                                    </AssetLiabilityDialog>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow className="font-bold text-base">
                                    <TableCell>Total Pasivos</TableCell>
                                    <TableCell className="text-right">{totalPasivos.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </div>
                </div>
            </CardContent>
             <CardFooter className="bg-muted p-6 rounded-b-lg">
                 <div className="w-full text-center">
                    <h3 className="text-xl font-semibold">Capital Contable</h3>
                    <p className={cn("text-4xl font-bold mt-2", capitalContable >= 0 ? "text-green-500" : "text-red-500")}>
                        {capitalContable.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}
                    </p>
                    <p className="text-sm text-muted-foreground">(Activos Totales - Pasivos Totales)</p>
                 </div>
            </CardFooter>
        </Card>
    )
}

const AssetLiabilityDialog = ({ item, onSave, isAsset, triggerAsChild = false, children }: { item?: Activo | Pasivo, onSave: (data: any) => void, isAsset: boolean, triggerAsChild?: boolean, children?: React.ReactNode }) => {
    const [open, setOpen] = useState(false);
    const { toast } = useToast();
    
    const [nombre, setNombre] = useState('');
    const [tipo, setTipo] = useState('');
    const [valor, setValor] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [fecha, setFecha] = useState<Date | undefined>();

    const isEditing = !!item;

    useEffect(() => {
        if (open && item) {
            setNombre(item.nombre);
            setTipo(item.tipo);
            setValor(isAsset ? (item as Activo).valor.toString() : (item as Pasivo).monto.toString());
            setDescripcion(item.descripcion || '');
            const itemDate = isAsset ? (item as Activo).fecha_adquisicion : (item as Pasivo).fecha_vencimiento;
            if (itemDate) setFecha(new Date(itemDate));
        } else if (!isEditing) {
            setNombre(''); setTipo(''); setValor(''); setDescripcion(''); setFecha(undefined);
        }
    }, [open, item, isAsset]);

    const handleSave = async () => {
        if (!nombre || !tipo || !valor) {
            toast({ title: 'Error', description: 'Nombre, tipo y valor son obligatorios.', variant: 'destructive' });
            return;
        }

        const commonData = { nombre, tipo, descripcion, };
        
        let data;
        if (isAsset) {
            data = { ...commonData, valor: parseFloat(valor), fecha_adquisicion: fecha } as NewActivo;
        } else {
            data = { ...commonData, monto: parseFloat(valor), fecha_vencimiento: fecha } as NewPasivo;
        }

        try {
            if (isEditing) {
                const updateFunction = isAsset ? updateActivo : updatePasivo;
                await updateFunction(item!.id, data);
            } else {
                await onSave(data);
            }
            toast({ title: 'Éxito', description: `${isAsset ? 'Activo' : 'Pasivo'} guardado.` });
            setOpen(false);
            if (!isEditing) onSave(data); // This is a bit of a hack to trigger a re-fetch
        } catch(e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        }
    };

    const handleDelete = async () => {
        if (!item) return;
        try {
            const deleteFunction = isAsset ? deleteActivo : deletePasivo;
            await deleteFunction(item.id);
            toast({ title: 'Éxito', description: `${isAsset ? 'Activo' : 'Pasivo'} eliminado.` });
            setOpen(false);
            onSave({}); // Trigger refresh
        } catch(e: any) {
            toast({ title: 'Error', description: e.message, variant: 'destructive' });
        }
    }

    const dialogContent = (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>{isEditing ? 'Editar' : 'Añadir'} {isAsset ? 'Activo' : 'Pasivo'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <Input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
                <Select value={tipo} onValueChange={setTipo}>
                    <SelectTrigger><SelectValue placeholder="Tipo" /></SelectTrigger>
                    <SelectContent>
                        {isAsset ? (
                            <>
                                <SelectItem value="Circulante">Circulante (Efectivo, Bancos)</SelectItem>
                                <SelectItem value="Fijo">Fijo (Equipo, Inmuebles)</SelectItem>
                                <SelectItem value="Intangible">Intangible (Marcas, Software)</SelectItem>
                            </>
                        ) : (
                            <>
                                <SelectItem value="Corto Plazo">Corto Plazo (&lt; 1 año)</SelectItem>
                                <SelectItem value="Largo Plazo">Largo Plazo (&gt; 1 año)</SelectItem>
                            </>
                        )}
                    </SelectContent>
                </Select>
                <Input type="number" value={valor} onChange={e => setValor(e.target.value)} placeholder={isAsset ? 'Valor (MXN)' : 'Monto (MXN)'} />
                <Textarea value={descripcion} onChange={e => setDescripcion(e.target.value)} placeholder="Descripción (opcional)" />
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className={cn("justify-start text-left font-normal", !fecha && "text-muted-foreground")}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {fecha ? format(fecha, 'PPP', { locale: es }) : <span>{isAsset ? 'Fecha de Adquisición' : 'Fecha de Vencimiento'}</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={fecha} onSelect={setFecha} initialFocus /></PopoverContent>
                </Popover>
            </div>
            <DialogFooter className='justify-between'>
                <div>
                {isEditing && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild><Button variant="destructive" size="icon"><Trash2 /></Button></AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader><AlertDialogTitle>¿Estás seguro?</AlertDialogTitle><AlertDialogDescription>Esta acción es irreversible.</AlertDialogDescription></AlertDialogHeader>
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
                    <Button onClick={handleSave}>Guardar</Button>
                </div>
            </DialogFooter>
        </DialogContent>
    );

    if (triggerAsChild) {
        return <Dialog open={open} onOpenChange={setOpen}><DialogTrigger asChild>{children}</DialogTrigger>{dialogContent}</Dialog>
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size="sm"><PlusCircle className="mr-2 h-4 w-4" />Añadir</Button>
            </DialogTrigger>
            {dialogContent}
        </Dialog>
    );
};

interface MiProgresoPageContentProps {
    initialPersonalData: ComoVoyEnMisFinanzas[];
    initialBalanceSheetData: {activos: Activo[], pasivos: Pasivo[], totalCuentasPorCobrar: number};
}

export default function MiProgresoPageContent({ initialPersonalData, initialBalanceSheetData }: MiProgresoPageContentProps) {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false); // Changed initial state to false
    const [personalData, setPersonalData] = useState<ComoVoyEnMisFinanzas[]>(initialPersonalData);
    const [balanceSheetData, setBalanceSheetData] = useState(initialBalanceSheetData);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    
    // The main data fetching now happens on the server.
    // This fetchData function is now only for refreshing data after an action.
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [pData, bData] = await Promise.all([getPersonalFinance(), getBalanceSheetData()]);
            setPersonalData(pData as ComoVoyEnMisFinanzas[]);
            setBalanceSheetData(bData as any);
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setIsLoading(false);
        }
    };
    
    if (isLoading) {
       return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div></div>
    }

    if (!user) {
        return <div className="text-center text-foreground/70">Cargando datos de usuario...</div>
    }

    const availableYears = Array.from(new Set([new Date().getFullYear(), ...personalData.map(d => getYear(new Date(d.fecha)))])).sort((a,b) => b-a);

    return (
    <div>
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold font-headline">{user.role === 'admin' ? '¿Cómo va la Empresa?' : 'Mi Progreso'}</h1>
             {user.role === 'admin' && (
                <div className="flex gap-4">
                     <Select value={currentYear.toString()} onValueChange={(year) => setCurrentYear(parseInt(year))}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {availableYears.map(year => (
                                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
      
      {user.role === 'admin' ? (
        <>
            <PersonalFinanceDashboard personalData={personalData} selectedYear={currentYear} onRefresh={fetchData} />
            <BalanceSheet data={balanceSheetData} onRefresh={fetchData} isAdmin={user.role === 'admin'} />
        </>
      ) : (
        <>
            <p className="mt-4 text-foreground/80 mb-8">
                Esta sección está reservada para el administrador. Como miembro del equipo, puedes acceder a otras áreas del dashboard.
            </p>
        </>
      )}
    </div>
  );
}