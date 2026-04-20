'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileUp, KeyRound, Building, User, FileText, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Entity = "MAW" | "Paola" | "Aldo";
type DocType = "Gastos" | "Estados de Cuenta / Movimientos" | "Pago de Impuestos";

const months = [ "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre" ];

// Componente para subir credenciales del SAT
const SatCredentials = ({ entity }: { entity: Entity }) => {
    const [efirmaPassword, setEfirmaPassword] = useState('');

    const handleSaveCredentials = () => {
        // En una app real, aquí se manejaría la lógica de guardar la contraseña de forma segura
        // y subir los archivos a un almacenamiento seguro.
        console.log(`Guardando credenciales para ${entity}:`, { password: efirmaPassword });
        alert(`Credenciales para ${entity} guardadas (simulación).`);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><KeyRound className="w-5 h-5 text-primary" />Credenciales SAT</CardTitle>
                <CardDescription>Sube los archivos de la e.firma y guarda la contraseña.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor={`${entity}-cer`}>Certificado (.cer)</Label>
                        <Input id={`${entity}-cer`} type="file" accept=".cer" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor={`${entity}-key`}>Clave Privada (.key)</Label>
                        <Input id={`${entity}-key`} type="file" accept=".key" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor={`${entity}-ciec`}>CIEC</Label>
                        <Input id={`${entity}-ciec`} type="file" accept=".pdf,.txt" />
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor={`${entity}-password`}>Contraseña e.firma</Label>
                    <Textarea 
                        id={`${entity}-password`}
                        value={efirmaPassword}
                        onChange={(e) => setEfirmaPassword(e.target.value)}
                        placeholder="Introduce la contraseña de la e.firma aquí..."
                    />
                </div>
                <Button onClick={handleSaveCredentials}>Guardar Credenciales</Button>
            </CardContent>
        </Card>
    )
}

// Componente para subir documentos mensuales
const MonthlyDocuments = ({ entity }: { entity: Entity }) => {
    const [selectedMonth, setSelectedMonth] = useState<string>(months[new Date().getMonth()]);

    const handleFileUpload = (docType: DocType) => {
        // Lógica de subida de archivos
        alert(`Subiendo archivo de ${docType} para ${entity} del mes de ${selectedMonth} (simulación).`);
    }

    return (
        <Card className="mt-8">
            <CardHeader>
                 <CardTitle className="flex items-center gap-2"><Calendar className="w-5 h-5 text-primary" />Documentación Mensual</CardTitle>
                <CardDescription>Sube los documentos contables de cada mes.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="mb-6">
                    <Label htmlFor={`${entity}-month-select`}>Selecciona el Mes</Label>
                    <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                        <SelectTrigger id={`${entity}-month-select`} className="w-full md:w-[180px] mt-2">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {months.map(month => <SelectItem key={month} value={month}>{month}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>

                 <Tabs defaultValue="gastos" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="gastos">Gastos</TabsTrigger>
                        <TabsTrigger value="movimientos">Edo. de Cuenta</TabsTrigger>
                        <TabsTrigger value="impuestos">Pago de Impuestos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="gastos" className="pt-4">
                        <div className="border-dashed border-2 border-border rounded-lg p-6 text-center">
                            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-medium text-foreground">Sube tus archivos de gastos</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Arrastra los archivos aquí o haz clic para seleccionar.</p>
                             <Input type="file" multiple className="mt-4" id={`${entity}-gastos-file`} />
                        </div>
                    </TabsContent>
                    <TabsContent value="movimientos" className="pt-4">
                       <div className="border-dashed border-2 border-border rounded-lg p-6 text-center">
                            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-medium text-foreground">Sube tus estados de cuenta</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Arrastra los archivos aquí o haz clic para seleccionar.</p>
                             <Input type="file" multiple className="mt-4" id={`${entity}-movimientos-file`} />
                        </div>
                    </TabsContent>
                    <TabsContent value="impuestos" className="pt-4">
                       <div className="border-dashed border-2 border-border rounded-lg p-6 text-center">
                            <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-2 text-sm font-medium text-foreground">Sube tus pagos de impuestos</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Arrastra los archivos aquí o haz clic para seleccionar.</p>
                             <Input type="file" multiple className="mt-4" id={`${entity}-impuestos-file`} />
                        </div>
                    </TabsContent>
                </Tabs>

            </CardContent>
        </Card>
    )
}


export default function DocumentacionPage() {

    return (
        <div>
            <h1 className="text-3xl font-bold font-headline mb-4">Gestión de Documentación</h1>
            <p className="text-foreground/80 mb-8">
                Administra los documentos fiscales y contables de forma segura y centralizada.
            </p>

            <Tabs defaultValue="maw" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="maw" className="flex items-center gap-2"><Building className="w-4 h-4"/> MAW</TabsTrigger>
                    <TabsTrigger value="paola" className="flex items-center gap-2"><User className="w-4 h-4"/> Paola</TabsTrigger>
                    <TabsTrigger value="aldo" className="flex items-center gap-2"><User className="w-4 h-4"/> Aldo</TabsTrigger>
                </TabsList>
                
                <TabsContent value="maw" className="mt-6">
                    <SatCredentials entity="MAW" />
                    <MonthlyDocuments entity="MAW" />
                </TabsContent>

                <TabsContent value="paola" className="mt-6">
                    <SatCredentials entity="Paola" />
                    <MonthlyDocuments entity="Paola" />
                </TabsContent>

                <TabsContent value="aldo" className="mt-6">
                     <SatCredentials entity="Aldo" />
                    <MonthlyDocuments entity="Aldo" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
