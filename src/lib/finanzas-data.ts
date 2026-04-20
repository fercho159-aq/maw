

export type Periodo = string;
export type MovimientoTipo = "Ingreso" | "Gasto";
export type CategoriaIngreso = "Proyecto" | "Iguala Contenido" | "Iguala Web" | "Iguala Ads" | "Renovaciones" | "Otros" | "Contenido" | "Ads" | "Web";
export type CategoriaGasto = "Publicidad" | "Sueldos" | "Comisiones" | "Impuestos" | "Personales" | "Otros" | "Renta";
export type Cuenta = "Cuenta Paola" | "Cuenta MAW" | "Cuenta Aldo" | "Efectivo";

// These types and initial data arrays are no longer needed as we fetch from the database.
// They are kept here for type reference if needed, but the arrays should be empty.

export interface CuentasPorCobrar {
  id: string;
  clienteId: string;
  clienteName: string;
  periodo: Periodo;
  monto: number;
  tipo: CategoriaIngreso;
  concepto?: string;
}

export interface MovimientoDiario {
  id: string;
  fecha: Date;
  tipo: MovimientoTipo;
  descripcion: string;
  monto: number;
  cuenta: Cuenta | string;
  detalleCuenta?: string;
  categoria?: CategoriaIngreso | CategoriaGasto;
  nombreOtro?: string;
}

// These are now fetched from the DB, so we keep the arrays empty.
export const initialCuentasPorCobrar: CuentasPorCobrar[] = [];
export const initialMovimientosDiarios: MovimientoDiario[] = [];
