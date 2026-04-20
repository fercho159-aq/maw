
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { getPendientes } from '../pendientes/_actions';
import type { PendienteMaw } from '@/lib/db/schema';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Hand, Repeat, FileText } from 'lucide-react';
import Logo from '@/components/logo';

interface ExecutorStats {
  total: number;
  completados: number;
  enFuego: number;
  media: number;
  baja: number;
  pendienteCliente: number;
  recurrente: number;
  reporte: number;
  eficiencia: number;
}

const getEfficiencyColor = (efficiency: number) => {
  if (efficiency >= 80) return "bg-green-500";
  if (efficiency >= 50) return "bg-yellow-500";
  return "bg-red-500";
};

export default function TVPage() {
  const [pendientes, setPendientes] = useState<PendienteMaw[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPendientes();
        setPendientes(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh data every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const statsPorEjecutor = useMemo(() => {
    const stats: Record<string, ExecutorStats> = {};

    const allExecutors = Array.from(new Set(pendientes.map(p => p.ejecutor || "Sin Asignar")));

    allExecutors.forEach(ejecutor => {
        stats[ejecutor] = {
            total: 0,
            completados: 0,
            enFuego: 0,
            media: 0,
            baja: 0,
            pendienteCliente: 0,
            recurrente: 0,
            reporte: 0,
            eficiencia: 0,
        };
    });


    pendientes.forEach(p => {
      const ejecutor = p.ejecutor || "Sin Asignar";
      
      if (p.status === 'Trabajando' && !p.completed) {
        stats[ejecutor].total++;
      }

      if (p.completed) {
        stats[ejecutor].completados++;
      } else {
        if (p.status === 'Trabajando') {
            if (p.priority === 'Urgente') {
            stats[ejecutor].enFuego++;
            }
            if (p.priority === 'Media') {
            stats[ejecutor].media++;
            }
            if (p.priority === 'Baja') {
            stats[ejecutor].baja++;
            }
        }
        if (p.status === 'Pendiente del cliente') {
            stats[ejecutor].pendienteCliente++;
        }
        if (p.status === 'Recurrente') {
            stats[ejecutor].recurrente++;
        }
         if (p.status === 'Reporte') {
            stats[ejecutor].reporte++;
        }
      }
    });
    
    Object.keys(stats).forEach(ejecutor => {
        const { completados, enFuego, media, baja } = stats[ejecutor];
        const totalConsiderado = enFuego + media + baja + completados;
        stats[ejecutor].eficiencia = totalConsiderado > 0 ? (completados / totalConsiderado) * 100 : 0;
    });

    return Object.entries(stats).sort((a,b) => b[1].eficiencia - a[1].eficiencia);
  }, [pendientes]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-black text-white">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full bg-black text-white p-8 font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold font-headline flex items-center gap-4">
            <Logo className="text-4xl" />
            <span>Resumen por Ejecutor</span>
        </h1>
        <div className="text-lg font-mono">{new Date().toLocaleTimeString('es-MX')}</div>
      </header>

       <div className="flex justify-center items-center gap-6 mb-6 text-sm text-gray-400">
            <span className="flex items-center gap-2">✅ Completados</span>
            <span className="flex items-center gap-2"><Flame size={16} className="text-red-400" /> Urgente</span>
            <span className="flex items-center gap-2"><span className="text-orange-400 text-xl">🟠</span> Media</span>
            <span className="flex items-center gap-2"><span className="text-green-400 text-xl">🟢</span> Baja</span>
            <span className="flex items-center gap-2"><Hand size={16} className="text-yellow-400" /> Pendiente Cliente</span>
            <span className="flex items-center gap-2"><Repeat size={16} className="text-purple-400" /> Recurrente</span>
            <span className="flex items-center gap-2"><FileText size={16} className="text-cyan-400" /> Reporte</span>
        </div>

      <div className="border border-gray-700 rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 hover:bg-gray-800 border-b-gray-700">
              <TableHead className="w-[200px] text-lg text-white font-bold">Ejecutor</TableHead>
              <TableHead className="text-center text-lg text-white font-bold">Tot</TableHead>
              <TableHead className="text-center text-lg text-green-400 font-bold">✅</TableHead>
              <TableHead className="text-center text-lg text-red-400 font-bold"><Flame size={20} className="inline-block" /></TableHead>
              <TableHead className="text-center text-lg text-orange-400 font-bold">🟠</TableHead>
              <TableHead className="text-center text-lg text-green-400 font-bold">🟢</TableHead>
              <TableHead className="text-center text-lg text-yellow-400 font-bold"><Hand size={20} className="inline-block" /></TableHead>
              <TableHead className="text-center text-lg text-purple-400 font-bold"><Repeat size={20} className="inline-block" /></TableHead>
              <TableHead className="text-center text-lg text-cyan-400 font-bold"><FileText size={20} className="inline-block" /></TableHead>
              <TableHead className="text-lg text-white font-bold">% Eficiencia</TableHead>
            </TableRow>
          </TableHeader>
          <AnimatePresence>
            <TableBody>
              {statsPorEjecutor.map(([ejecutor, stats], index) => (
                <motion.tr
                  key={ejecutor}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b-gray-800"
                >
                  <TableCell className="font-medium text-xl py-4">{ejecutor}</TableCell>
                  <TableCell className="text-center text-xl py-4">{stats.total}</TableCell>
                  <TableCell className="text-center text-xl text-green-400 font-bold py-4">{stats.completados}</TableCell>
                  <TableCell className="text-center text-xl text-red-400 font-bold py-4">{stats.enFuego}</TableCell>
                  <TableCell className="text-center text-xl text-orange-400 font-bold py-4">{stats.media}</TableCell>
                  <TableCell className="text-center text-xl text-green-400 font-bold py-4">{stats.baja}</TableCell>
                  <TableCell className="text-center text-xl text-yellow-400 font-bold py-4">{stats.pendienteCliente}</TableCell>
                  <TableCell className="text-center text-xl text-purple-400 font-bold py-4">{stats.recurrente}</TableCell>
                  <TableCell className="text-center text-xl text-cyan-400 font-bold py-4">{stats.reporte}</TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-4">
                      <Progress value={stats.eficiencia} indicatorClassName={getEfficiencyColor(stats.eficiencia)} className="w-[150px] bg-gray-800 h-5" />
                      <span className="text-xl font-bold w-[60px] text-right">{Math.round(stats.eficiencia)}%</span>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </AnimatePresence>
        </Table>
      </div>
    </div>
  );
}
