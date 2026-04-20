
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Users, BookOpen, ListTodo, KeyRound, DollarSign, Calendar, LineChart, Handshake, Settings, FileArchive, LayoutDashboard, History, Monitor, Wrench, MessageSquareText } from "lucide-react";
import { useAuth } from "@/lib/auth-provider";

const baseNavItems = [
    { href: "/equipo/dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-4 h-4" />, section: 'dashboard' },
    { href: "/equipo/dashboard/tv", label: "TV", icon: <Monitor className="w-4 h-4" />, section: 'tv' },
    { href: "/equipo/dashboard/nosotros", label: "Nosotros", icon: <Users className="w-4 h-4" />, section: 'nosotros' },
    { href: "/equipo/dashboard/introduccion", label: "Introducción", icon: <BookOpen className="w-4 h-4" />, section: 'introduccion' },
    { href: "/equipo/dashboard/colaboradores", label: "Colaboradores", icon: <Users className="w-4 h-4" />, section: 'colaboradores' },
    { href: "/equipo/dashboard/clientes", label: "Clientes", icon: <Users className="w-4 h-4" />, section: 'clientes' },
    { href: "/equipo/dashboard/pendientes", label: "Pendientes", icon: <ListTodo className="w-4 h-4" />, section: 'pendientes' },
    { href: "/equipo/dashboard/renovaciones", label: "Renovaciones", icon: <History className="w-4 h-4" />, section: 'renovaciones' },
    { href: "/equipo/dashboard/finanzas", label: "Finanzas", icon: <DollarSign className="w-4 h-4" />, section: 'finanzas' },
    { href: "/equipo/dashboard/ventas", label: "Ventas", icon: <Handshake className="w-4 h-4" />, section: 'ventas' },
    { href: "/equipo/dashboard/accesos", label: "Accesos", icon: <KeyRound className="w-4 h-4" />, section: 'accesos' },
    { href: "/equipo/dashboard/calendario", label: "Calendario", icon: <Calendar className="w-4 h-4" />, section: 'calendario' },
    { href: "/equipo/dashboard/mi-progreso", label: "Mi Progreso", icon: <LineChart className="w-4 h-4" />, section: 'miProgreso' },
    { href: "/equipo/dashboard/documentacion", label: "Documentación", icon: <FileArchive className="w-4 h-4" />, section: 'documentacion' },
    { href: "/equipo/dashboard/herramientas", label: "Herramientas", icon: <Wrench className="w-4 h-4" />, section: 'herramientas' },
    { href: "/equipo/dashboard/feedback", label: "Feedback", icon: <MessageSquareText className="w-4 h-4" />, section: 'feedback' },
];

export default function DashboardNav() {
    const pathname = usePathname();
    const { user } = useAuth();

    const navItems = baseNavItems.map(item => {
        if (item.section === 'miProgreso' && user?.role === 'admin') {
            return { ...item, label: '¿Cómo va la empresa?' };
        }
        return item;
    });

    const userHasAccess = (section: string) => {
        if (!user) return false;

        // Admin and anyone with access to 'pendientes' can see the new dashboard
        if (section === 'dashboard') {
            return user.role === 'admin' || user.accessSections?.pendientes;
        }

        // "Nosotros", "Introduccion", and "Configuracion" are always visible for everyone.
        if (['nosotros', 'introduccion', 'configuracion', 'herramientas'].includes(section)) {
            return true;
        }

        // Admin has access to everything.
        if (user.role === 'admin') {
            return true;
        }

        // For non-admins, collaborators section is hidden
        if (section === 'colaboradores') return false;

        if (!user.accessSections) return false;

        return (user.accessSections as any)[section] === true;
    };

    return (
        <nav className="flex flex-col gap-2 flex-grow">
            <div className="flex-grow">
                {navItems.map(item => {
                    if (!userHasAccess(item.section)) {
                        return null;
                    }
                    return (
                        <Button
                            key={item.href}
                            variant={pathname === item.href ? "secondary" : "ghost"}
                            asChild
                            className="justify-start w-full mb-1"
                        >
                            <Link href={item.href} className="flex items-center gap-2">
                                {item.icon}
                                {item.label}
                            </Link>
                        </Button>
                    );
                })}
            </div>
        </nav>
    );
}
