'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, PlusCircle, Trash2 } from 'lucide-react';
import { getAccesses, addAccess, updateAccess, deleteAccess } from './_actions';
import type { Access, NewAccess } from '@/lib/db/schema';
import { useAuth } from '@/lib/auth-provider';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


type Platform = "Facebook Ads" | "TikTok Ads" | "Google Ads" | "Instagram" | "Web";
type AccessType = "Plataforma/Business" | "Personal";

const AccessFormDialog = ({ onSave, children, access }: { onSave: () => void, children: React.ReactNode, access?: Access | null }) => {
    const isEditing = !!access;
    const [open, setOpen] = useState(false);
    const [platform, setPlatform] = useState<Platform>('Facebook Ads');
    const [client, setClient] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [notes, setNotes] = useState('');
    const [accessType, setAccessType] = useState<AccessType>('Plataforma/Business');
    const { toast } = useToast();

    useEffect(() => {
        if(open && isEditing && access) {
            setPlatform(access.platform as Platform);
            setClient(access.client);
            setEmail(access.email);
            setPassword(access.password);
            setNotes(access.notes || '');
            setAccessType(access.access_type as AccessType);
        } else if (!isEditing) {
            resetForm();
        }
    }, [open, isEditing, access]);

    const resetForm = () => {
        setPlatform('Facebook Ads');
        setClient('');
        setEmail('');
        setPassword('');
        setNotes('');
        setAccessType('Plataforma/Business');
    }

    const handleSave = async () => {
        if (!platform || !client || !email || !password) {
            toast({ title: 'Error', description: 'Plataforma, cliente, correo y contraseña son obligatorios.', variant: 'destructive' });
            return;
        }

        const data: Partial<NewAccess> = { platform, client, email, password, notes, access_type: accessType };

        try {
            if (isEditing && access?.id) {
                await updateAccess(access.id, data);
            } else {
                 await addAccess(data as NewAccess);
            }
            toast({ title: 'Éxito', description: `Acceso ${isEditing ? 'actualizado' : 'añadido'} correctamente.` });
            onSave();
            setOpen(false);
            if (!isEditing) resetForm();
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    };
    
    const handleDelete = async () => {
        if (!isEditing || !access) return;
        try {
            await deleteAccess(access.id);
            toast({ title: 'Eliminado', description: 'El acceso ha sido eliminado.' });
            onSave();
            setOpen(false);
        } catch (error: any) {
            toast({ title: 'Error', description: error.message, variant: 'destructive' });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Editar' : 'Añadir Nuevo'} Acceso</DialogTitle>
                    {isEditing && <DialogDescription>{access.client} - {access.platform}</DialogDescription>}
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                        <Label>Plataforma</Label>
                        <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Facebook Ads">Facebook Ads</SelectItem>
                                <SelectItem value="TikTok Ads">TikTok Ads</SelectItem>
                                <SelectItem value="Google Ads">Google Ads</SelectItem>
                                <SelectItem value="Instagram">Instagram</SelectItem>
                                <SelectItem value="Web">Web</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Tipo de Acceso</Label>
                        <Select value={accessType} onValueChange={(v) => setAccessType(v as AccessType)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Plataforma/Business">Plataforma/Business</SelectItem>
                                <SelectItem value="Personal">Personal</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="client">Cliente</Label>
                        <Input id="client" value={client} onChange={(e) => setClient(e.target.value)} placeholder="Nombre del cliente" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Correo</Label>
                        <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="correo@ejemplo.com" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña de acceso" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notas</Label>
                        <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ej. 'Entrar con Google', 'Usar VPN', etc." />
                    </div>
                </div>
                 <DialogFooter className="justify-between">
                    <div>
                        {isEditing && (
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="destructive" size="icon"><Trash2 /></Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                                        <AlertDialogDescription>Esta acción eliminará permanentemente la credencial.</AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                        <AlertDialogAction onClick={handleDelete}>Confirmar Eliminación</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setOpen(false)}>Cancelar</Button>
                        <Button onClick={handleSave}>{isEditing ? 'Guardar Cambios' : 'Guardar'}</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function AccesosPage() {
  const { user } = useAuth();
  const [accessData, setAccessData] = useState<Access[]>([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const fetchAccesses = async () => {
    setIsLoading(true);
    const data = await getAccesses();
    const sortedData = data.sort((a,b) => a.client.localeCompare(b.client));
    setAccessData(sortedData);
    setIsLoading(false);
  }

  useEffect(() => {
    if (user?.accessSections?.accesos) {
      fetchAccesses();
    } else {
        setIsLoading(false);
    }
  }, [user]);

  const filteredData = (platform: Platform) => 
    accessData.filter(item => 
      item.platform === platform &&
      (item.client.toLowerCase().includes(searchFilter.toLowerCase()) || 
       item.email.toLowerCase().includes(searchFilter.toLowerCase()))
    );

  const AccessTable = ({ platform }: { platform: Platform }) => {
    const data = filteredData(platform);
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Correo</TableHead>
                        <TableHead>Contraseña</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Notas</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.length > 0 ? data.map((item) => (
                        <AccessFormDialog key={item.id} access={item} onSave={fetchAccesses}>
                             <TableRow className="cursor-pointer">
                                <TableCell className="font-medium">{item.client}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.password}</TableCell>
                                <TableCell>
                                    <Badge variant={item.access_type === 'Personal' ? 'secondary' : 'default'} className={cn(item.access_type === 'Personal' && 'bg-amber-500/80')}>
                                        {item.access_type}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-xs text-muted-foreground">{item.notes}</TableCell>
                            </TableRow>
                        </AccessFormDialog>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={5} className="h-24 text-center">
                                No se encontraron registros.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>
  }
  
  if (!user?.accessSections?.accesos) {
    return (
        <Card>
            <CardHeader><CardTitle>Acceso Denegado</CardTitle></CardHeader>
            <CardContent><p>No tienes permiso para ver esta sección.</p></CardContent>
        </Card>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline">Accesos a Plataformas</h1>
       <p className="text-foreground/80 mb-8">
        Gestiona y consulta las credenciales de acceso a las plataformas publicitarias de los clientes.
      </p>

        <Card>
            <CardHeader className="flex-col sm:flex-row justify-between items-start sm:items-center">
                 <div>
                    <CardTitle>Credenciales de Clientes</CardTitle>
                    <CardDescription>Usa las pestañas para filtrar por plataforma y busca por cliente.</CardDescription>
                </div>
                 {user?.permissions?.accesos?.agregarNuevosAccesos && (
                    <AccessFormDialog onSave={fetchAccesses}>
                        <Button><PlusCircle className="w-4 h-4 mr-2" /> Añadir Acceso</Button>
                    </AccessFormDialog>
                 )}
            </CardHeader>
            <CardContent>
                <div className="relative mb-4">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input 
                      placeholder="Buscar por cliente o correo..."
                      value={searchFilter}
                      onChange={(e) => setSearchFilter(e.target.value)}
                      className="max-w-xs pl-8"
                  />
                </div>
                <Tabs defaultValue="facebook">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="facebook">Facebook Ads</TabsTrigger>
                        <TabsTrigger value="tiktok">TikTok Ads</TabsTrigger>
                        <TabsTrigger value="google">Google Ads</TabsTrigger>
                        <TabsTrigger value="instagram">Instagram</TabsTrigger>
                        <TabsTrigger value="web">Web</TabsTrigger>
                    </TabsList>
                    <TabsContent value="facebook" className="mt-4">
                       <AccessTable platform="Facebook Ads" />
                    </TabsContent>
                    <TabsContent value="tiktok" className="mt-4">
                        <AccessTable platform="TikTok Ads" />
                    </TabsContent>
                    <TabsContent value="google" className="mt-4">
                        <AccessTable platform="Google Ads" />
                    </TabsContent>
                    <TabsContent value="instagram" className="mt-4">
                        <AccessTable platform="Instagram" />
                    </TabsContent>
                    <TabsContent value="web" className="mt-4">
                        <AccessTable platform="Web" />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  );
}
