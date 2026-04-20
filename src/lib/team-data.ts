

export type Role = 'admin' | 'contabilidad' | 'ventas' | 'team_member' | 'julio' | 'alma' | 'fernando' | 'luis' | 'fany' | 'carlos' | 'paola' | 'cristhian' | 'daniel' | 'alexis' | 'bere' | 'kari' | 'aldair' | 'pedro' | 'encargado' | 'ejecutor';

export type TeamMember = {
    id: string;
    name: string;
    username: string;
    password?: string;
    role: Role;
    email: string;
    color: string;
    birthday?: string;
    phone?: string;
    avatarUrl?: string;
    accessSections?: Record<string, boolean>;
    permissions?: Record<string, any>;
    progressConfig?: Record<string, boolean>;
}

export const teamMembers: TeamMember[] = [
    { 
        id: 'admin-01', 
        name: 'Admin', 
        username: 'admin', 
        password: 'admin2025', 
        role: 'admin', 
        email: 'admin@agencia.com',
        color: '#7C3AED', // purple-600
        accessSections: { nosotros: true, introduccion: true, pendientes: true, finanzas: true, ventas: true, accesos: true, calendario: true, miProgreso: true, clientes: true, configuracion: true, documentacion: true, colaboradores: true, renovaciones: true, dashboard: true, tv: true },
        permissions: {
            finanzas: { agregarPagos: true, agregarGastos: true, agregarCuentasPorCobrar: true },
            ventas: { agregarProspectosDirecto: true, cambiarStatusProspectos: true, cambiarStatusSoloAsignados: false, verTodosProspectos: true },
            accesos: { ajustarAccesos: true, agregarNuevosAccesos: true },
            calendario: { cambiarFechas: true, cambiarFechasSoloAsignados: false, verCalendarioTodos: true, modificarCalendarioTodos: true, asignarEquipos: true },
            pendientes: { moverPendientes: true, reasignarResponsables: true, borrarPendientes: true },
            clientes: { agregarClientes: true, editarClientes: true, verSaldo: true },
        },
        progressConfig: { resumenVentasMes: true, gananciasPerdidas: true, desempenioOtrosUsuarios: true, proximasGrabaciones: true, llegadasTarde: true }
    },
    { 
        id: 'conta-01', 
        name: 'Contabilidad', 
        username: 'contabilidad', 
        password: 'conta2025', 
        role: 'contabilidad', 
        email: 'conta@agencia.com',
        color: '#6B7280', // gray-500
        accessSections: { nosotros: true, introduccion: true, finanzas: true, clientes: true, configuracion: true, documentacion: true, renovaciones: true, tv: true },
        permissions: {
            finanzas: { agregarPagos: true, agregarGastos: true, agregarCuentasPorCobrar: true },
            clientes: { agregarClientes: true, editarClientes: true, verSaldo: true },
        },
        progressConfig: {}
    },
     { 
        id: 'encargado-01', 
        name: 'Encargado', 
        username: 'encargado', 
        password: 'encargado2025', 
        role: 'encargado', 
        email: 'encargado@agencia.com',
        color: '#2563EB', // blue-600
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true, tv: true },
        permissions: {
            pendientes: { moverPendientes: true, reasignarResponsables: true, borrarPendientes: true },
            calendario: { cambiarFechas: true, verCalendarioTodos: true, modificarCalendarioTodos: true },
            clientes: { editarClientes: true },
        },
        progressConfig: {}
    },
     { 
        id: 'ejecutor-01', 
        name: 'Ejecutor', 
        username: 'ejecutor', 
        password: 'ejecutor2025', 
        role: 'ejecutor', 
        email: 'ejecutor@agencia.com',
        color: '#10B981', // emerald-500
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { moverPendientes: true, reasignarResponsables: false, borrarPendientes: false },
             calendario: { cambiarFechas: false, verCalendarioTodos: false },
        },
        progressConfig: {}
    },
    // Resto de usuarios como ejecutores para el ejemplo
    { 
        id: 'julio-01', 
        name: 'Julio', 
        username: 'julio', 
        password: 'julio2025', 
        role: 'encargado', 
        email: 'julio@agencia.com',
        color: '#D97706',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true, tv: true },
        permissions: {
            pendientes: { moverPendientes: true, reasignarResponsables: true, borrarPendientes: true },
            calendario: { cambiarFechas: true, verCalendarioTodos: true, modificarCalendarioTodos: true },
            clientes: { editarClientes: true },
        },
    },
    { 
        id: 'alma-01', 
        name: 'Alma', 
        username: 'alma', 
        password: 'alma2025', 
        role: 'ventas', 
        email: 'alma@agencia.com',
        color: '#DB2777',
         accessSections: { nosotros: true, introduccion: true, ventas: true, calendario: true, configuracion: true },
    },
    { 
        id: 'fernando-01', 
        name: 'Fernando', 
        username: 'fernando', 
        password: 'fer2025', 
        role: 'encargado', 
        email: 'fer@agencia.com',
        color: '#059669',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true, ventas: true, tv: true },
        permissions: {
            pendientes: { moverPendientes: true, reasignarResponsables: true, borrarPendientes: true },
        },
    },
    { 
        id: 'luis-01', 
        name: 'Luis', 
        username: 'luis', 
        password: 'luis2025', 
        role: 'encargado', 
        email: 'luis@agencia.com',
        color: '#2563EB',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true, tv: true },
        permissions: {
            pendientes: { moverPendientes: true, reasignarResponsables: true, borrarPendientes: true },
        },
    },
    { 
        id: 'fany-01', 
        name: 'Fany', 
        username: 'fany', 
        password: 'fany2025', 
        role: 'encargado', 
        email: 'fany@agencia.com',
        color: '#9333EA',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true, tv: true },
        permissions: {
            pendientes: { moverPendientes: true, reasignarResponsables: true, borrarPendientes: true },
        },
    },
    { 
        id: 'carlos-01', 
        name: 'Carlos', 
        username: 'carlos', 
        password: 'carlos2025', 
        role: 'encargado', 
        email: 'carlos@agencia.com',
        color: '#F59E0B',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true, tv: true },
        permissions: {
            pendientes: { moverPendientes: true, reasignarResponsables: true, borrarPendientes: true },
        },
    },
    { 
        id: 'paola-01', 
        name: 'Paola', 
        username: 'paola', 
        password: 'paola2025', 
        role: 'ejecutor', 
        email: 'paola@agencia.com',
        color: '#EC4899',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { borrarPendientes: false }
        },
    },
    { 
        id: 'cristhian-01', 
        name: 'Cristhian', 
        username: 'cristhian', 
        password: 'cristhian2025', 
        role: 'ejecutor', 
        email: 'cristhian@agencia.com',
        color: '#10B981',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { borrarPendientes: false }
        },
    },
    { 
        id: 'daniel-01', 
        name: 'Daniel', 
        username: 'daniel', 
        password: 'daniel2025', 
        role: 'ejecutor', 
        email: 'daniel@agencia.com',
        color: '#3B82F6',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { borrarPendientes: false }
        },
    },
    { 
        id: 'alexis-01', 
        name: 'Alexis Aldarozo', 
        username: 'alexis', 
        password: 'alexis2025', 
        role: 'ejecutor', 
        email: 'alexis@agencia.com',
        color: '#EF4444',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { borrarPendientes: false }
        },
    },
     { 
        id: 'bere-01', 
        name: 'Bere', 
        username: 'bere', 
        password: 'bere2025', 
        role: 'ejecutor', 
        email: 'bere@agencia.com',
        color: '#8B5CF6',
        accessSections: { nosotros: true, introduccion: true, clientes: true, pendientes: true, calendario: true, accesos: true, documentacion: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { borrarPendientes: false }
        },
    },
    { 
        id: 'kari-01', 
        name: 'Kari', 
        username: 'kari', 
        password: 'kari2025', 
        role: 'ejecutor', 
        email: 'kari@agencia.com',
        color: '#F97316',
        accessSections: { nosotros: true, introduccion: true, pendientes: true, calendario: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { borrarPendientes: false }
        },
    },
    { 
        id: 'aldair-01', 
        name: 'Aldair', 
        username: 'aldair', 
        password: 'aldair2025', 
        role: 'ejecutor', 
        email: 'aldair@agencia.com',
        color: '#14B8A6',
        accessSections: { nosotros: true, introduccion: true, pendientes: true, calendario: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { borrarPendientes: false }
        },
    },
    { 
        id: 'pedro-01', 
        name: 'Pedro', 
        username: 'pedro', 
        password: 'pedro2025', 
        role: 'ejecutor', 
        email: 'pedro@agencia.com',
        color: '#65A30D',
        accessSections: { nosotros: true, introduccion: true, pendientes: true, calendario: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { borrarPendientes: false }
        },
    },
    { 
        id: 'alexis-02', 
        name: 'Alexis Quiroz', 
        username: 'alexisquiroz', 
        password: 'alexis2025', 
        role: 'ejecutor', 
        email: 'alexis.quiroz@agencia.com',
        color: '#be123c',
        accessSections: { nosotros: true, introduccion: true, pendientes: true, calendario: true, configuracion: true, dashboard: true },
        permissions: {
             pendientes: { borrarPendientes: false }
        },
    }
];
