CREATE TABLE "accesses" (
	"id" serial PRIMARY KEY NOT NULL,
	"platform" varchar(100) NOT NULL,
	"client" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL
);

CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"representative_name" varchar(255) NOT NULL,
	"whatsapp" varchar(50) NOT NULL,
	"email" varchar(255),
	"managed_areas" jsonb,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "cuentas_por_cobrar" (
	"id" serial PRIMARY KEY NOT NULL,
	"cliente_id" integer NOT NULL,
	"cliente_name" varchar(255) NOT NULL,
	"periodo" varchar(100) NOT NULL,
	"monto" real NOT NULL,
	"tipo" varchar(50) NOT NULL
);

CREATE TABLE "movimientos_diarios" (
	"id" serial PRIMARY KEY NOT NULL,
	"fecha" timestamp DEFAULT now() NOT NULL,
	"tipo" varchar(50) NOT NULL,
	"descripcion" text NOT NULL,
	"monto" real NOT NULL,
	"cuenta" varchar(100) NOT NULL,
	"detalle_cuenta" varchar(255),
	"categoria" varchar(100),
	"nombre_otro" varchar(255)
);

CREATE TABLE "pendientes" (
	"id" serial PRIMARY KEY NOT NULL,
	"cliente" varchar(255) NOT NULL,
	"encargado" varchar(100) NOT NULL,
	"ejecutor" varchar(100) NOT NULL,
	"fecha_corte" integer NOT NULL,
	"status" varchar(50) NOT NULL,
	"pendiente_principal" text NOT NULL,
	"categoria" varchar(50) NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "prospects" (
	"id" serial PRIMARY KEY NOT NULL,
	"cliente" varchar(255) NOT NULL,
	"email" varchar(255),
	"telefono" varchar(50),
	"origen" varchar(50) NOT NULL,
	"status" varchar(50) NOT NULL,
	"responsable" varchar(100) NOT NULL,
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE "recording_events" (
	"id" serial PRIMARY KEY NOT NULL,
	"client_name" varchar(255) NOT NULL,
	"assigned_to" varchar(100) NOT NULL,
	"assigned_to_name" varchar(100) NOT NULL,
	"full_start" timestamp NOT NULL,
	"full_end" timestamp NOT NULL,
	"location" varchar(255),
	"location_type" varchar(50),
	"project" text,
	"assigned_equipment" jsonb,
	"equipment_names" jsonb,
	"pendiente_id" integer NOT NULL
);

CREATE TABLE "sub_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"completed" boolean DEFAULT false NOT NULL,
	"pendiente_id" integer
);

DO $$ BEGIN
 ALTER TABLE "cuentas_por_cobrar" ADD CONSTRAINT "cuentas_por_cobrar_cliente_id_clients_id_fk" FOREIGN KEY ("cliente_id") REFERENCES "public"."clients"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "recording_events" ADD CONSTRAINT "recording_events_pendiente_id_pendientes_id_fk" FOREIGN KEY ("pendiente_id") REFERENCES "public"."pendientes"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "sub_tasks" ADD CONSTRAINT "sub_tasks_pendiente_id_pendientes_id_fk" FOREIGN KEY ("pendiente_id") REFERENCES "public"."pendientes"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
