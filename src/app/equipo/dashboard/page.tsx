'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { getPendientes } from './pendientes/_actions';
import { teamMembers } from '@/lib/team-data';
import type { PendienteMaw } from '@/lib/db/schema';
import { ArrowRight, CheckCircle, ListTodo, Loader2, PieChart as PieChartIcon, UserCheck, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-provider';

const categoryColors: Record<string, string> = {
    "Contenido": "bg-blue-500",
    "Ads": "bg-orange-500",
    "Web": "bg-green-500",
};

const TrafficLightCell = (props: any) => {
    const { x, y, width, height, value } = props;
    const maxWorkload = 80; 
    let color;

    if (value < maxWorkload / 3) {
        color = '#22C55E'; // green-500
    } else if (value < (maxWorkload * 2) / 3) {
        color = '#F59E0B'; // amber-500
    } else {
        color = '#EF4444'; // red-500
    }

    return <rect x={x} y={y} width={width} height={height} fill={color} />;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-background border p-4 rounded-lg shadow-lg">
        <p className="font-bold text-lg">{label}</p>
        <p className="text-sm text-muted-foreground">Carga Total: {data.totalWorkload}</p>
        <hr className="my-2"/>
        <p className="font-semibold mb-1">Pendientes con más peso:</p>
        <ul className="list-disc list-inside text-sm space-y-1">
          {data.topTasks.map((task: any, index: number) => (
            <li key={index} className="truncate">
              ({task.points}) {task.pendientePrincipal}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return null;
};


export default function DashboardPage() {
    const { user } = useAuth();
    const [pendientes, setPendientes] = useState<PendienteMaw[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getPendientes();
            setPendientes(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    const filteredPendientes = useMemo(() => {
        if (!user) return [];

        if (user.role === 'admin' || user.role === 'contabilidad') {
            return pendientes;
        }

        if (user.role === 'encargado') {
            const teamExecutors = [...new Set(
                pendientes
                    .filter(p => p.encargado === user.name)
                    .map(p => p.ejecutor)
            ), user.name];
            return pendientes.filter(p => teamExecutors.includes(p.ejecutor) || p.encargado === user.name);
        }

        if (user.role === 'ejecutor' || user.role === 'ventas') {
             return pendientes.filter(p => p.ejecutor === user.name || p.encargado === user.name);
        }
        return [];
    }, [pendientes, user]);

    const summaryData = useMemo(() => {
        const total = filteredPendientes.length;
        const completados = filteredPendientes.filter(p => p.completed).length;
        const pendientesDelCliente = filteredPendientes.filter(p => !p.completed && p.status?.startsWith('Pendiente del')).length;
        const activos = filteredPendientes.filter(p => !p.completed && p.status === 'Trabajando').length;
        const reportes = filteredPendientes.filter(p => !p.completed && p.status === 'Reporte').length;

        return {
            total,
            completados,
            pendientesDelCliente,
            activos,
            reportes,
        };
    }, [filteredPendientes]);

    const executorWorkload = useMemo(() => {
        const activePendientes = filteredPendientes.filter(p => !p.completed);
        const workload: Record<string, Record<string, Set<string>>> = {};

        activePendientes.forEach(p => {
            if (!workload[p.ejecutor]) {
                workload[p.ejecutor] = {};
            }
            if (!workload[p.ejecutor][p.clienteName]) {
                workload[p.ejecutor][p.clienteName] = new Set();
            }
            workload[p.ejecutor][p.clienteName].add(p.categoria);
        });

        return Object.entries(workload)
            .sort((a, b) => a[0].localeCompare(b[0]))
            .map(([executor, clients]) => ({
                executor,
                clients: Object.entries(clients)
                    .sort((a,b) => a[0].localeCompare(b[0]))
                    .map(([clientName, categories]) => ({
                        clientName,
                        categories: Array.from(categories),
                    })),
            }));
    }, [filteredPendientes]);

    const workloadData = useMemo(() => {
        const priorityValues: Record<string, number> = { 'Urgente': 1, 'Media': 2, 'Baja': 3 };
        
        const executorData = filteredPendientes
            .filter(p => !p.completed && p.status === 'Trabajando')
            .reduce((acc, p) => {
                const priorityValue = priorityValues[p.priority || 'Media'] || 2;
                if (!acc[p.ejecutor]) {
                    acc[p.ejecutor] = { totalValue: 0, tasks: [] };
                }
                acc[p.ejecutor].totalValue += priorityValue;
                acc[p.ejecutor].tasks.push({ pendientePrincipal: p.pendientePrincipal, points: priorityValue });
                return acc;
            }, {} as Record<string, { totalValue: number; tasks: {pendientePrincipal: string, points: number}[] }>);

        return Object.entries(executorData).map(([name, data]) => {
            const topTasks = data.tasks
                .sort((a, b) => b.points - a.points)
                .slice(0, 3);
            return {
                name,
                totalWorkload: data.totalValue,
                topTasks,
            }
        }).sort((a,b) => b.totalWorkload - a.totalWorkload);
    }, [filteredPendientes]);

    const recentPendientes = useMemo(() => {
        return [...filteredPendientes].sort((a,b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()).slice(0, 5);
    }, [filteredPendientes]);


    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
    }

  return (
    <div>
      <h1 className="text-3xl font-bold font-headline mb-8">Dashboard de Pendientes</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendientes Totales</CardTitle>
                <ListTodo className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{summaryData.total}</div>
                <p className="text-xs text-muted-foreground">Total de tareas registradas.</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendientes Activos</CardTitle>
                <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{summaryData.activos}</div>
                <p className="text-xs text-muted-foreground">{((summaryData.activos / summaryData.total) * 100 || 0).toFixed(1)}% del total.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendiente del Cliente</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{summaryData.pendientesDelCliente}</div>
                <p className="text-xs text-muted-foreground">Tareas esperando respuesta.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reportes Pendientes</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{summaryData.reportes}</div>
                <p className="text-xs text-muted-foreground">Tareas en fase de reporte.</p>
            </CardContent>
        </Card>
         <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendientes Completados</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{summaryData.completados}</div>
                 <p className="text-xs text-muted-foreground">{((summaryData.completados / summaryData.total) * 100 || 0).toFixed(1)}% completado.</p>
            </CardContent>
        </Card>
      </div>

       <div className="grid md:grid-cols-5 gap-8">
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Resumen de Pendientes por Ejecutor</CardTitle>
            <CardDescription>Tareas activas agrupadas por ejecutor y cliente.</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[350px] overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Ejecutor</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Categorías</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {executorWorkload.length > 0 ? executorWorkload.map(({ executor, clients }) => (
                        <React.Fragment key={executor}>
                            {clients.map((client, clientIndex) => (
                                <TableRow key={`${executor}-${client.clientName}`}>
                                    {clientIndex === 0 && (
                                        <TableCell className="font-bold align-top" rowSpan={clients.length}>
                                            {executor}
                                        </TableCell>
                                    )}
                                    <TableCell>{client.clientName}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-wrap gap-1">
                                            {client.categories.map(category => (
                                                <Link key={category} href={`/equipo/dashboard/pendientes?tab=${category.toLowerCase()}&ejecutor=${executor}`}>
                                                    <Badge className={categoryColors[category]}>
                                                        {category}
                                                    </Badge>
                                                </Link>
                                            ))}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </React.Fragment>
                    )) : (
                        <TableRow>
                            <TableCell colSpan={3} className="text-center h-24">No hay pendientes activos.</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-5">
            <CardHeader>
                <CardTitle>Carga de Trabajo Ponderada por Ejecutor</CardTitle>
                <CardDescription>Suma de puntos de urgencia por tarea (Urgente=1, Baja=3). Una barra más alta significa que tardará más en terminar.</CardDescription>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={workloadData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" height={60} />
                        <YAxis />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend formatter={() => 'Carga Total'}/>
                        <Bar dataKey="totalWorkload" name="Carga Total" shape={<TrafficLightCell />} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
        <Card className="lg:col-span-5">
          <CardHeader>
            <CardTitle>Pendientes Recientes</CardTitle>
            <CardDescription>Últimas 5 tareas añadidas al sistema.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Fecha</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentPendientes.map(p => (
                        <TableRow key={p.id}>
                            <TableCell>
                                <div className="font-medium">{p.clienteName}</div>
                                <div className="text-xs text-muted-foreground truncate">{p.pendientePrincipal}</div>
                            </TableCell>
                            <TableCell className="text-xs text-muted-foreground">{format(new Date(p.createdAt!), 'dd MMM, yy', { locale: es })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
             <Button variant="link" asChild className="mt-2">
                <Link href="/equipo/dashboard/pendientes">
                    Ver todos los pendientes <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
            </Button>
          </CardContent>
        </Card>
       </div>
    </div>
  );
}
