"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { useAuth } from '@/lib/auth-provider';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, KeyRound } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { updateUserProfile } from './_actions';
import type { TeamMember } from '@/lib/team-data';
import { Separator } from '@/components/ui/separator';


export default function ConfiguracionPage() {
    const { user, login } = useAuth();
    const { toast } = useToast();
    
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState<Date | undefined>(undefined);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    useEffect(() => {
        if (user) {
            setName(user.name);
            setPhone(user.phone || '');
            setAvatarUrl(user.avatarUrl || '');
            if (user.birthday) {
                setBirthday(new Date(user.birthday));
            }
        }
    }, [user]);
    
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 1024 * 1024) { // 1MB limit
                 toast({
                    title: "Error",
                    description: "La imagen es demasiado grande. Asegúrate de que pese menos de 1MB.",
                    variant: "destructive"
                });
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleSave = async () => {
        if (!user) return;
        
        const updatedData: Partial<TeamMember> = {
            name: name,
            phone: phone,
            birthday: birthday ? birthday.toISOString() : undefined,
        };

        if (newPassword) {
            if (newPassword !== confirmPassword) {
                toast({
                    title: "Error",
                    description: "Las contraseñas no coinciden.",
                    variant: "destructive"
                });
                return;
            }
            if (newPassword.length < 6) {
                 toast({
                    title: "Error",
                    description: "La contraseña debe tener al menos 6 caracteres.",
                    variant: "destructive"
                });
                return;
            }
            updatedData.password = newPassword;
        }

        try {
            const updatedUser = await updateUserProfile(user.id, updatedData);
            login(updatedUser);
            toast({
                title: "¡Éxito!",
                description: "Tu información ha sido actualizada.",
            });
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
             toast({
                title: "Error",
                description: "No se pudo actualizar tu perfil. Inténtalo de nuevo.",
                variant: "destructive"
            });
        }
    };

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-8">Configuración de Perfil</h1>
            <div className="grid md:grid-cols-2 gap-8">
                <Card className="max-w-2xl">
                    <CardHeader>
                        <CardTitle>Tu Información</CardTitle>
                        <CardDescription>Actualiza tu nombre, foto, teléfono y fecha de cumpleaños.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-20 h-20">
                                <AvatarImage src={avatarUrl || user.avatarUrl} alt={user.name} />
                                <AvatarFallback>{user.name?.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className='flex-grow space-y-2'>
                            <Label htmlFor="avatarFile">Foto de Perfil</Label>
                                <Input
                                    id="avatarFile"
                                    type="file"
                                    accept="image/png, image/jpeg, image/gif"
                                    onChange={handleFileChange}
                                    className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                            <p className="text-xs text-muted-foreground">Sube una imagen desde tu PC. Límite de 1MB.</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre</Label>
                            <Input 
                                id="name" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input 
                                id="phone" 
                                type="tel"
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Fecha de Cumpleaños</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal",
                                        !birthday && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {birthday ? format(birthday, "d 'de' MMMM, yyyy", { locale: es }) : <span>Selecciona una fecha</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                    mode="single"
                                    selected={birthday}
                                    onSelect={setBirthday}
                                    initialFocus
                                    captionLayout="dropdown-buttons"
                                    fromYear={1950}
                                    toYear={new Date().getFullYear()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><KeyRound className="w-5 h-5"/> Seguridad</CardTitle>
                        <CardDescription>Actualiza tu contraseña. Si no quieres cambiarla, deja los campos en blanco.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="new-password">Nueva Contraseña</Label>
                            <Input id="new-password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Mínimo 6 caracteres" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repite la nueva contraseña" />
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-8">
                <Button onClick={handleSave}>Guardar Cambios</Button>
            </div>
        </div>
    )
}
