
'use client';

import React, { useState, useEffect, startTransition, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, User, UserCog, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-provider';
import { addColaborador, updateColaborador, getColaboradores } from './_actions';
import type { Colaborador, NewColaborador } from '@/lib/db/schema';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

const roles = ['admin', 'contabilidad', 'ventas', 'team_member', 'julio', 'alma', 'fernando', 'luis', 'fany', 'carlos', 'paola', 'cristian', 'daniel', 'alexis', 'bere', 'kari', 'aldair', 'pedro'];
const sections = ['clientes', 'pendientes', 'finanzas', 'ventas', 'accesos', 'calendario', 'miProgreso'];

const ColaboradorFormDialog = ({ colaborador, onSave }: { colaborador?: Colaborador | null, onSave: () => void }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState<Partial<NewColaborador>>({});
    const { toast } = useToast();

    useEffect(() => {
        if (open) {
            const initialData = colaborador || {};
            // Ensure nosotros and introduccion are always true
            initialData.accessSections = {
                ...(initialData.accessSections || {}),
                nosotros: true,
                introduccion: true,
            };
            setFormData(initialData);
        }
    }, [open, colaborador]);

    const handleSave = async () => {
        if (!formData.name || !formData.username || !formData.email || !formData.role) {
            toast({ title: 'Error', description: 'Nombre, usuario, email y rol son obligatorios.', variant: 'destructive' });
            return;
        }

        const dataToSave: Partial<NewColaborador> = {
            ...formData,
            accessSections: {
                ...(formData.accessSections || {}),
                nosotros: true,
                introduccion: true,
                configuracion: true,
            }
        };

        try {
            if (colaborador?.id) {
                await updateColaborador(colaborador.id, dataToSave)
            } else {
                if (!formData.password) {
                     toast({ title: 'Error', description: 'La contraseña es obligatoria para nuevos colaboradores.', variant: 'destructive' });
                    return;
                }
                await addColaborador(dataToSave as NewColaborador);
            }
            toast({ title: 'Éxito', description: `Colaborador ${colaborador ? 'actualizado' : 'añadido'}.` });
            onSave();
            setOpen(false);
        } catch (error: any) {
            toast({ title: 'Error', description: error.message || 'No se pudo guardar el colaborador.', variant: 'destructive' });
        }
    };

    const handleAccessChange = (section: string, checked: boolean) => {
        setFormData(prev => ({
            ...prev,
            accessSections: {
                ...prev.accessSections,
                [section]: checked
            }
        }));
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {colaborador ? (
                    <Button variant="ghost" size="icon"><UserCog className="w-4 h-4" /></Button>
                ) : (
                    <Button><PlusCircle className="w-4 h-4 mr-2" /> Añadir Nuevo Colaborador</Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                    <DialogTitle>{colaborador ? 'Editar' : 'Nuevo'} Colaborador</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[70vh]">
                    <div className="grid gap-4 p-4">
                        <Input value={formData.name || ''} onChange={e => setFormData(p => ({ ...p, name: e.target.value }))} placeholder="Nombre Completo*" />
                        <Input value={formData.username || ''} onChange={e => setFormData(p => ({ ...p, username: e.target.value }))} placeholder="Nombre de Usuario*" />
                        <Input value={formData.email || ''} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} placeholder="Email*" type="email" />
                        <Input onChange={e => setFormData(p => ({ ...p, password: e.target.value }))} placeholder={colaborador ? 'Nueva contraseña (opcional)' : 'Contraseña*'} type="password" />

                        <Select value={formData.role || ''} onValueChange={(v) => setFormData(p => ({ ...p, role: v as any }))}>
                            <SelectTrigger><SelectValue placeholder="Seleccionar Rol*" /></SelectTrigger>
                            <SelectContent>
                                {roles.map(r => <SelectItem key={r} value={r} className="capitalize">{r}</SelectItem>)}
                            </SelectContent>
                        </Select>

                        <Separator />
                        <h4 className="font-medium">Accesos a Secciones</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                           {sections.map(section => (
                               <div key={section} className="flex items-center space-x-2">
                                   <Checkbox 
                                        id={`access-${section}`} 
                                        checked={(formData.accessSections as any)?.[section] || false}
                                        onCheckedChange={(checked) => handleAccessChange(section, Boolean(checked))}
                                    />
                                   <Label htmlFor={`access-${section}`} className="capitalize">{section}</Label>
                               </div>
                           ))}
                        </div>
                    </div>
                </ScrollArea>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                    <Button onClick={handleSave}>Guardar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function ColaboradoresPage() {
    const { user, loading } = useAuth();
    const [searchFilter, setSearchFilter] = useState('');
    const [colaboradores, setColaboradores] = useState<Colaborador[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { toast } = useToast();

    const fetchColaboradores = async () => {
        setIsLoading(true);
        const data = await getColaboradores();
        setColaboradores(data.sort((a,b) => a.name.localeCompare(b.name)));
        setIsLoading(false);
    };

    useEffect(() => {
        fetchColaboradores();
    }, []);

    const filteredColaboradores = useMemo(() => {
        return colaboradores.filter(colab => 
            colab.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
            colab.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
            colab.role.toLowerCase().includes(searchFilter.toLowerCase())
        );
    }, [colaboradores, searchFilter]);

    if (loading || isLoading) {
        return <div className="flex items-center justify-center min-h-[50vh]"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div></div>
    }

    if (user?.role !== 'admin') {
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
                <h1 className="text-3xl font-bold font-headline">Gestión de Colaboradores</h1>
            </div>
            <Card>
                <CardHeader className="flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>Equipo</CardTitle>
                      <CardDescription>Añade, edita y gestiona los permisos de los miembros de tu equipo.</CardDescription>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                        <div className="relative">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar colaborador..."
                                value={searchFilter}
                                onChange={(e) => setSearchFilter(e.target.value)}
                                className="pl-8 sm:w-[200px] md:w-[250px]"
                            />
                        </div>
                        <ColaboradorFormDialog onSave={fetchColaboradores} />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nombre</TableHead>
                                    <TableHead>Rol</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                {filteredColaboradores.map(colab => (
                                    <TableRow key={colab.id}>
                                        <TableCell className="font-medium">{colab.name}</TableCell>
                                        <TableCell className="capitalize">{colab.role}</TableCell>
                                        <TableCell>{colab.email}</TableCell>
                                        <TableCell className="text-right">
                                            <ColaboradorFormDialog colaborador={colab} onSave={fetchColaboradores} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                         {filteredColaboradores.length === 0 && (
                            <div className="text-center p-8 text-muted-foreground">
                                No se encontraron colaboradores.
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
