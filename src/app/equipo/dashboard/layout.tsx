
'use client';

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { Menu, Settings, Bell } from "lucide-react";
import { useAuth } from "@/lib/auth-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Logo from "@/components/logo";
import { SidebarProvider, Sidebar, SidebarHeader, SidebarContent, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardNav from "@/components/dashboard-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { getDominiosProximosAExpirar } from "./renovaciones/_actions";
import type { DominioHostinger } from "@/lib/db/schema";
import { differenceInDays, format } from "date-fns";
import { es } from "date-fns/locale";
import { cn } from "@/lib/utils";

const SidebarItems = () => {
    const { user, logout } = useAuth();
    return (
        <div className="flex flex-col h-full">
            <SidebarHeader>
                 <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <Avatar>
                            <AvatarImage src={user?.avatarUrl || ''} alt={user?.name} />
                            <AvatarFallback>
                            {user?.name?.charAt(0).toUpperCase() || 'U'}
                            </AvatarFallback>
                        </Avatar>
                        <div className="group-data-[collapsible=true]:hidden">
                            <p className="text-sm text-muted-foreground">Bienvenido</p>
                            <h2 className="text-lg font-bold font-headline -mt-1">
                            {user?.name || 'Usuario'}
                            </h2>
                        </div>
                    </div>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <DashboardNav />
            </SidebarContent>
            <div className="mt-auto p-2">
                <Button variant="ghost" className="w-full justify-start" onClick={logout}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                </Button>
            </div>
        </div>
    )
}

const NotificationsPanel = () => {
    const [dominios, setDominios] = useState<DominioHostinger[]>([]);

    useEffect(() => {
        getDominiosProximosAExpirar().then(setDominios);
    }, []);

    const count = dominios.length;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative" title="Notificaciones">
                    <Bell className="w-5 h-5" />
                    {count > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                            {count}
                        </span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
                <div className="p-3 border-b">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">Dominios por vencer</p>
                        <span className="text-xs text-muted-foreground">{count}/30 dias</span>
                    </div>
                </div>
                <div className="max-h-72 overflow-y-auto">
                    {count === 0 ? (
                        <div className="p-6 text-center">
                            <Bell className="w-8 h-8 mx-auto text-muted-foreground/40 mb-2" />
                            <p className="text-sm text-muted-foreground">Sin alertas</p>
                            <p className="text-xs text-muted-foreground mt-1">No hay dominios por vencer en los proximos 30 dias</p>
                        </div>
                    ) : (
                        <div className="p-2 space-y-1">
                            {dominios.map((d) => {
                                const expDate = new Date(d.fecha_expiracion);
                                const daysUntil = differenceInDays(expDate, new Date());
                                const isUrgent = daysUntil <= 7;
                                return (
                                    <div
                                        key={d.id}
                                        className={cn(
                                            "rounded-lg border p-2.5 transition-all",
                                            isUrgent
                                                ? "bg-red-500/10 border-red-500/30"
                                                : "bg-orange-500/10 border-orange-500/30"
                                        )}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-semibold truncate">{d.dominio}</p>
                                                <p className="text-xs text-muted-foreground mt-0.5">
                                                    Expira: {format(expDate, "d MMM yyyy", { locale: es })}
                                                </p>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={cn(
                                                    "text-[10px] shrink-0",
                                                    isUrgent
                                                        ? "bg-red-500/15 text-red-700 dark:text-red-400 border-red-500/30"
                                                        : "bg-orange-500/15 text-orange-700 dark:text-orange-400 border-orange-500/30"
                                                )}
                                            >
                                                {daysUntil === 0 ? "Hoy" : `${daysUntil}d`}
                                            </Badge>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                <div className="p-2 border-t">
                    <Button variant="ghost" size="sm" className="w-full text-xs" asChild>
                        <Link href="/equipo/dashboard/renovaciones">
                            Ver calendario completo &rarr;
                        </Link>
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    );
};

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm sticky top-0 z-20">
            <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden"/>
                 <h1 className="text-xl font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-2">
                 <SidebarTrigger className="hidden md:flex"/>
                <NotificationsPanel />
                <Button variant="ghost" size="icon" asChild>
                    <Link href="/equipo/dashboard/configuracion" title="Configuración">
                        <Settings className="w-5 h-5" />
                    </Link>
                </Button>
            </div>
        </header>
    )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
            <SidebarItems />
        </Sidebar>
        <main className="flex-1 flex flex-col min-w-0">
          <Header />
          <div className="flex-1 p-4 md:p-8 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
