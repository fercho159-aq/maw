

import { pgTable, pgEnum, serial, text, varchar, timestamp, boolean, integer, jsonb, real, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// --- TABLAS PRINCIPALES ---

// Tabla de Colaboradores (Usuarios del sistema)
export const colaboradores = pgTable('colaboradores', {
    id: varchar('id', { length: 50 }).primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    username: varchar('username', { length: 100 }).notNull().unique(),
    password: text('password'),
    role: varchar('role', { length: 50 }).notNull(),
    email: varchar('email', { length: 255 }).notNull().unique(),
    color: varchar('color', { length: 50 }),
    birthday: text('birthday'),
    phone: varchar('phone', { length: 50 }),
    avatarUrl: text('avatar_url'),
    accessSections: jsonb('access_sections'),
    permissions: jsonb('permissions'),
    progressConfig: jsonb('progress_config'),
});

// Tabla de Clientes Activos
export const clients = pgTable('clients', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    representativeName: varchar('representative_name', { length: 255 }).notNull(),
    whatsapp: varchar('whatsapp', { length: 50 }).notNull(),
    email: varchar('email', { length: 255 }),
    managedAreas: jsonb('managed_areas').$type<string[]>(),
    instagramUrl: text('instagram_url'),
    facebookUrl: text('facebook_url'),
    tiktokUrl: text('tiktok_url'),
    instagramFollowers: integer('instagram_followers'),
    facebookFollowers: integer('facebook_followers'),
    tiktokFollowers: integer('tiktok_followers'),
    createdAt: timestamp('created_at').defaultNow(),
    hosting_renewal_date: timestamp('hosting_renewal_date'),
    domain_renewal_date: timestamp('domain_renewal_date'),
    service_renewal_date: timestamp('service_renewal_date'),
    // Campos de publicaciones (a nivel de cliente, no de pendiente)
    publicacionesAlMes: text('publicaciones_al_mes'),
    publicacionesALaSemana: text('publicaciones_a_la_semana'),
});

// Tabla de Prospectos (Pipeline de Ventas)
export const prospects_maw = pgTable('prospects_maw', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }),
    company: varchar('company', { length: 255 }),
    phone: varchar('phone', { length: 50 }),
    email: varchar('email', { length: 255 }),
    source: varchar('source', { length: 100 }).notNull(),
    status: varchar('status', { length: 50 }),
    responsable: varchar('responsable', { length: 100 }),
    createdAt: timestamp('created_at').defaultNow(),
    data: jsonb('data'),
    notas: text('notas'),
});

// Nueva tabla para finanzas personales
export const como_voy_en_mis_finanzas = pgTable('como_voy_en_mis_finanzas', {
    id: serial('id').primaryKey(),
    fecha: timestamp('fecha').notNull().defaultNow(),
    tipo: varchar('tipo', { length: 50 }).notNull(), // INGRESO o GASTO
    descripcion: text('descripcion'),
    monto: real('monto').notNull(),
    cuenta: varchar('cuenta', { length: 100 }).notNull(),
    detalle_cuenta: varchar('detalle_cuenta', { length: 255 }),
    categoria: varchar('categoria', { length: 100 }),
    nombre_otro: varchar('nombre_otro', { length: 255 }),
    cpc_id: integer('cpc_id'),
    requires_invoice: boolean('requires_invoice').notNull().default(false),
    con_iva: boolean('con_iva').default(false),
    iva: real('iva'),
});

// Tabla para Activos
export const activos_maw = pgTable('activos_maw', {
    id: serial('id').primaryKey(),
    nombre: varchar('nombre', { length: 255 }).notNull(),
    tipo: varchar('tipo', { length: 100 }).notNull(), // Ej. Circulante, Fijo
    valor: real('valor').notNull(),
    descripcion: text('descripcion'),
    fecha_adquisicion: timestamp('fecha_adquisicion').defaultNow(),
});

// Tabla para Pasivos
export const pasivos_maw = pgTable('pasivos_maw', {
    id: serial('id').primaryKey(),
    nombre: varchar('nombre', { length: 255 }).notNull(),
    tipo: varchar('tipo', { length: 100 }).notNull(), // Ej. Corto Plazo, Largo Plazo
    monto: real('monto').notNull(),
    descripcion: text('descripcion'),
    fecha_vencimiento: timestamp('fecha_vencimiento'),
});

// Tabla para Blog Posts
export const blog_posts = pgTable('blog_posts', {
    id: serial('id').primaryKey(),
    slug: varchar('slug', { length: 255 }).unique().notNull(),
    title: varchar('title', { length: 255 }).notNull(),
    category: varchar('category', { length: 100 }),
    excerpt: text('excerpt'),
    date: timestamp('date', { withTimezone: true }).defaultNow().notNull(),
    author: varchar('author', { length: 255 }),
    content: text('content').notNull(),
    featured_image_url: text('featured_image_url'),
    created_at: timestamp('created_at', { withTimezone: true }).defaultNow(),
    related_posts: text('related_posts'),
});


// --- TABLAS RELACIONADAS ---

// Perfil financiero de cada cliente
export const clientFinancialProfiles = pgTable('client_financial_profiles', {
    id: serial('id').primaryKey(),
    clientId: integer('client_id').notNull().unique().references(() => clients.id, { onDelete: 'cascade' }),
    billingDay: integer('billing_day').default(15),
    defaultInvoice: boolean('default_invoice').default(false),
    fechaCorte: integer('fecha_corte'),
    contenidoProgramadoHasta: timestamp('contenido_programado_hasta'),
});

// Tareas o "Pendientes" asignados a cada cliente
export const pendientes_maw = pgTable('pendientes_maw', {
    id: serial('id').primaryKey(),
    clientId: integer('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
    clienteName: varchar('cliente_name', { length: 255 }).notNull(),
    ejecutor: varchar('ejecutor', { length: 100 }).notNull(),
    categoria: varchar('categoria', { length: 50 }).notNull(),
    pendientePrincipal: text('pendiente_principal').notNull(),
    status: varchar('status', { length: 50 }).notNull().default('Trabajando'),
    completed: boolean('completed').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    priority: varchar('priority', { length: 50 }).notNull().default('Media'),
    publicacionesAlMes: text('publicaciones_al_mes'),
    publicacionesALaSemana: text('publicaciones_a_la_semana'),

    // Nuevas columnas para Ads
    hasFacebookAds: boolean('has_facebook_ads').default(false),
    facebookAdsMessages: text('facebook_ads_messages'),
    facebookAdsInteraction: text('facebook_ads_interaction'),

    hasTiktokAds: boolean('has_tiktok_ads').default(false),
    tiktokAdsMessages: text('tiktok_ads_messages'),
    tiktokAdsInteraction: text('tiktok_ads_interaction'),

    hasGoogleAds: boolean('has_google_ads').default(false),
    googleAdsMessages: text('google_ads_messages'),
    googleAdsInteraction: text('google_ads_interaction'),

    hasLinkedinAds: boolean('has_linkedin_ads').default(false),
    linkedinAdsMessages: text('linkedin_ads_messages'),
    linkedinAdsInteraction: text('linkedin_ads_interaction'),
});

// Eventos de grabación asociados a un pendiente
export const recordingEvents = pgTable('recording_events', {
    id: serial('id').primaryKey(),
    clientName: varchar('client_name', { length: 255 }).notNull(),
    assignedTo: varchar('assigned_to', { length: 100 }).notNull(),
    assignedToName: varchar('assigned_to_name', { length: 100 }).notNull(),
    fullStart: timestamp('full_start').notNull(),
    fullEnd: timestamp('full_end').notNull(),
    location: varchar('location', { length: 255 }),
    locationType: varchar('location_type', { length: 50 }),
    project: text('project'),
    assignedEquipment: jsonb('assigned_equipment').$type<string[]>(),
    equipmentNames: jsonb('equipment_names').$type<string[]>(),
    pendienteId: integer('pendiente_id').unique().references(() => pendientes_maw.id, { onDelete: 'cascade' }),
});

// Cuentas por cobrar de cada cliente
export const cuentasPorCobrar = pgTable('cuentas_por_cobrar', {
    id: serial('id').primaryKey(),
    clienteId: integer('client_id').notNull().references(() => clients.id, { onDelete: 'cascade' }),
    clienteName: varchar('cliente_name', { length: 255 }).notNull(),
    periodo: varchar('periodo', { length: 100 }).notNull(),
    monto: real('monto').notNull(),
    tipo: varchar('tipo', { length: 50 }).notNull(), // Ej: Iguala, Proyecto, Web
    fecha_cobro: text('fecha_cobro'),
    conIva: boolean('con_iva').default(false),
    concepto: text('concepto'),
});

// Movimientos financieros diarios (ingresos y gastos)
export const movimientosDiarios = pgTable('movimientos_diarios', {
    id: serial('id').primaryKey(),
    fecha: timestamp('fecha').defaultNow().notNull(),
    tipo: varchar('tipo', { length: 50 }).notNull(), // "Ingreso" o "Gasto"
    descripcion: text('descripcion').notNull(),
    monto: real('monto').notNull(),
    cuenta: varchar('cuenta', { length: 100 }).notNull(), // Banco o cuenta de origen/destino
    detalleCuenta: varchar('detalle_cuenta', { length: 255 }),
    categoria: varchar('categoria', { length: 100 }),
    nombreOtro: varchar('nombre_otro', { length: 255 }),
    cpcId: integer('cpc_id').references(() => cuentasPorCobrar.id, { onDelete: 'set null' }),
    clienteName: varchar('cliente_name', { length: 255 }), // Nombre del cliente para pagos de CxC
    conIva: boolean('con_iva').default(false),
    iva: real('iva'),
});

// Credenciales de acceso para plataformas de clientes
export const accesses = pgTable('accesses', {
    id: serial('id').primaryKey(),
    platform: varchar('platform', { length: 100 }).notNull(),
    client: varchar('client', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    notes: text('notes'),
    access_type: varchar('access_type', { length: 50 }).default('Plataforma/Business').notNull(),
});


// Tabla de Dominios Hostinger (Renovaciones)
export const dominios_hostinger = pgTable('dominios_hostinger', {
    id: serial('id').primaryKey(),
    dominio: varchar('dominio', { length: 255 }).notNull().unique(),
    status: varchar('status', { length: 50 }).notNull(),
    fecha_expiracion: timestamp('fecha_expiracion').notNull(),
    dias_restantes: integer('dias_restantes').notNull(),
});

// Tabla de Notificaciones de Renovación (log para evitar duplicados)
export const renovacion_notificaciones = pgTable('renovacion_notificaciones', {
    id: serial('id').primaryKey(),
    dominio_id: integer('dominio_id').notNull().references(() => dominios_hostinger.id),
    tipo: varchar('tipo', { length: 20 }).notNull(), // "7_dias", "3_dias", "mismo_dia"
    enviado_at: timestamp('enviado_at').defaultNow(),
});

// Tabla de QR Codes con Rastreo
export const qrCodesTracked = pgTable('qr_codes_tracked', {
    id: serial('id').primaryKey(),
    shortId: varchar('short_id', { length: 20 }).notNull().unique(),
    name: varchar('name', { length: 255 }).notNull(),
    qrType: varchar('qr_type', { length: 50 }).notNull(),
    originalContent: text('original_content').notNull(),
    scanCount: integer('scan_count').notNull().default(0),
    createdBy: varchar('created_by', { length: 50 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    active: boolean('active').notNull().default(true),
});

// Tabla de Escaneos de QR
export const qrScans = pgTable('qr_scans', {
    id: serial('id').primaryKey(),
    qrCodeId: integer('qr_code_id').notNull().references(() => qrCodesTracked.id, { onDelete: 'cascade' }),
    scannedAt: timestamp('scanned_at').defaultNow(),
    userAgent: text('user_agent'),
    ipHash: varchar('ip_hash', { length: 64 }),
});

// --- SISTEMA DE FEEDBACK VISUAL ---

export const projectStatusEnum = pgEnum('project_status', ['active', 'paused', 'completed']);
export const commentStatusEnum = pgEnum('comment_status', ['pending', 'in_progress', 'resolved', 'dismissed']);
export const commentPriorityEnum = pgEnum('comment_priority', ['low', 'medium', 'high']);

// Proyectos de feedback (sitios web de clientes a revisar)
export const feedbackProjects = pgTable('feedback_projects', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull(),
    siteUrl: text('site_url').notNull(),
    status: projectStatusEnum('status').notNull().default('active'),
    ownerId: varchar('owner_id', { length: 50 }).notNull().references(() => colaboradores.id),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Accesos de clientes al sistema de feedback
export const clientAccesses = pgTable('client_accesses', {
    id: serial('id').primaryKey(),
    clientName: varchar('client_name', { length: 255 }).notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    passwordHash: text('password_hash').notNull(),
    projectId: integer('project_id').notNull().references(() => feedbackProjects.id, { onDelete: 'cascade' }),
    isActive: boolean('is_active').notNull().default(true),
    lastLoginAt: timestamp('last_login_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
}, (table) => [
    uniqueIndex('client_accesses_email_project_idx').on(table.email, table.projectId),
]);

// Comentarios de feedback con posición visual
export const feedbackComments = pgTable('feedback_comments', {
    id: serial('id').primaryKey(),
    content: text('content').notNull(),
    pageUrl: varchar('page_url', { length: 500 }).notNull(),
    positionX: real('position_x').notNull(),
    positionY: real('position_y').notNull(),
    scrollY: real('scroll_y').notNull().default(0),
    viewportWidth: integer('viewport_width').notNull(),
    viewportHeight: integer('viewport_height').notNull(),
    status: commentStatusEnum('status').notNull().default('pending'),
    priority: commentPriorityEnum('priority').notNull().default('medium'),
    adminNotes: text('admin_notes'),
    projectId: integer('project_id').notNull().references(() => feedbackProjects.id, { onDelete: 'cascade' }),
    clientAccessId: integer('client_access_id').notNull().references(() => clientAccesses.id, { onDelete: 'cascade' }),
    resolvedAt: timestamp('resolved_at'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow(),
});

// Comentarios de feedback resueltos (historial)
export const feedbackCommentsResolved = pgTable('feedback_comments_resolved', {
    id: serial('id').primaryKey(),
    originalId: integer('original_id').notNull(),
    content: text('content').notNull(),
    pageUrl: varchar('page_url', { length: 500 }).notNull(),
    positionX: real('position_x').notNull(),
    positionY: real('position_y').notNull(),
    scrollY: real('scroll_y').notNull().default(0),
    viewportWidth: integer('viewport_width').notNull(),
    viewportHeight: integer('viewport_height').notNull(),
    priority: commentPriorityEnum('priority').notNull().default('medium'),
    adminNotes: text('admin_notes'),
    projectId: integer('project_id').notNull().references(() => feedbackProjects.id, { onDelete: 'cascade' }),
    clientAccessId: integer('client_access_id').notNull().references(() => clientAccesses.id, { onDelete: 'cascade' }),
    resolvedAt: timestamp('resolved_at'),
    createdAt: timestamp('created_at'),
    updatedAt: timestamp('updated_at'),
});

// --- RELACIONES ---

export const clientsRelations = relations(clients, ({ one, many }) => ({
    cuentasPorCobrar: many(cuentasPorCobrar),
    pendientes: many(pendientes_maw),
    financialProfile: one(clientFinancialProfiles, {
        fields: [clients.id],
        references: [clientFinancialProfiles.clientId],
    })
}));

export const clientFinancialProfilesRelations = relations(clientFinancialProfiles, ({ one }) => ({
    client: one(clients, {
        fields: [clientFinancialProfiles.clientId],
        references: [clients.id],
    })
}));

export const pendientesMawRelations = relations(pendientes_maw, ({ one }) => ({
    client: one(clients, {
        fields: [pendientes_maw.clientId],
        references: [clients.id],
    }),
    recordingEvent: one(recordingEvents, {
        fields: [pendientes_maw.id],
        references: [recordingEvents.pendienteId],
    })
}));

export const blogPostsRelations = relations(blog_posts, () => ({}));
export const dominiosHostingerRelations = relations(dominios_hostinger, ({ many }) => ({
    notificaciones: many(renovacion_notificaciones),
}));

export const renovacionNotificacionesRelations = relations(renovacion_notificaciones, ({ one }) => ({
    dominio: one(dominios_hostinger, {
        fields: [renovacion_notificaciones.dominio_id],
        references: [dominios_hostinger.id],
    }),
}));

export const cuentasPorCobrarRelations = relations(cuentasPorCobrar, ({ one, many }) => ({
    client: one(clients, {
        fields: [cuentasPorCobrar.clienteId],
        references: [clients.id],
    }),
    movimientos: many(movimientosDiarios)
}));

export const movimientosDiariosRelations = relations(movimientosDiarios, ({ one }) => ({
    cuentaPorCobrar: one(cuentasPorCobrar, {
        fields: [movimientosDiarios.cpcId],
        references: [cuentasPorCobrar.id]
    })
}));

export const recordingEventsRelations = relations(recordingEvents, ({ one }) => ({
    pendiente: one(pendientes_maw, {
        fields: [recordingEvents.pendienteId],
        references: [pendientes_maw.id],
    }),
}));

export const qrCodesTrackedRelations = relations(qrCodesTracked, ({ many }) => ({
    scans: many(qrScans),
}));

export const qrScansRelations = relations(qrScans, ({ one }) => ({
    qrCode: one(qrCodesTracked, {
        fields: [qrScans.qrCodeId],
        references: [qrCodesTracked.id],
    }),
}));


export const feedbackProjectsRelations = relations(feedbackProjects, ({ one, many }) => ({
    owner: one(colaboradores, {
        fields: [feedbackProjects.ownerId],
        references: [colaboradores.id],
    }),
    clientAccesses: many(clientAccesses),
    comments: many(feedbackComments),
}));

export const clientAccessesRelations = relations(clientAccesses, ({ one, many }) => ({
    project: one(feedbackProjects, {
        fields: [clientAccesses.projectId],
        references: [feedbackProjects.id],
    }),
    comments: many(feedbackComments),
}));

export const feedbackCommentsRelations = relations(feedbackComments, ({ one }) => ({
    project: one(feedbackProjects, {
        fields: [feedbackComments.projectId],
        references: [feedbackProjects.id],
    }),
    clientAccess: one(clientAccesses, {
        fields: [feedbackComments.clientAccessId],
        references: [clientAccesses.id],
    }),
}));

// --- TIPOS INFERIDOS ---

export type Client = typeof clients.$inferSelect;
export type NewClient = typeof clients.$inferInsert;
export type ClientFinancialProfile = typeof clientFinancialProfiles.$inferSelect;
export type NewClientFinancialProfile = typeof clientFinancialProfiles.$inferInsert;
export type PendienteMaw = typeof pendientes_maw.$inferSelect;
export type NewPendienteMaw = typeof pendientes_maw.$inferInsert;
export type RecordingEvent = typeof recordingEvents.$inferSelect;
export type NewRecordingEvent = typeof recordingEvents.$inferInsert;
export type CuentaPorCobrar = typeof cuentasPorCobrar.$inferSelect;
export type NewCuentaPorCobrar = typeof cuentasPorCobrar.$inferInsert;
export type MovimientoDiario = typeof movimientosDiarios.$inferSelect;
export type NewMovimientoDiario = typeof movimientosDiarios.$inferInsert;
export type Prospect = typeof prospects_maw.$inferSelect;
export type NewProspect = typeof prospects_maw.$inferInsert;
export type Colaborador = typeof colaboradores.$inferSelect;
export type NewColaborador = typeof colaboradores.$inferInsert;
export type Access = typeof accesses.$inferSelect;
export type NewAccess = typeof accesses.$inferInsert;
export type ComoVoyEnMisFinanzas = typeof como_voy_en_mis_finanzas.$inferSelect;
export type NewComoVoyEnMisFinanzas = typeof como_voy_en_mis_finanzas.$inferInsert;
export type Activo = typeof activos_maw.$inferSelect;
export type NewActivo = typeof activos_maw.$inferInsert;
export type Pasivo = typeof pasivos_maw.$inferSelect;
export type NewPasivo = typeof pasivos_maw.$inferInsert;
export type BlogPost = typeof blog_posts.$inferSelect;
export type NewBlogPost = typeof blog_posts.$inferInsert;
export type DominioHostinger = typeof dominios_hostinger.$inferSelect;
export type NewDominioHostinger = typeof dominios_hostinger.$inferInsert;
export type RenovacionNotificacion = typeof renovacion_notificaciones.$inferSelect;
export type NewRenovacionNotificacion = typeof renovacion_notificaciones.$inferInsert;
export type QrCodeTracked = typeof qrCodesTracked.$inferSelect;
export type NewQrCodeTracked = typeof qrCodesTracked.$inferInsert;
export type QrScan = typeof qrScans.$inferSelect;
export type NewQrScan = typeof qrScans.$inferInsert;
export type FeedbackProject = typeof feedbackProjects.$inferSelect;
export type NewFeedbackProject = typeof feedbackProjects.$inferInsert;
export type ClientAccess = typeof clientAccesses.$inferSelect;
export type NewClientAccess = typeof clientAccesses.$inferInsert;
export type FeedbackComment = typeof feedbackComments.$inferSelect;
export type NewFeedbackComment = typeof feedbackComments.$inferInsert;
