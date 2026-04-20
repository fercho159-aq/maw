-- Migración: Mover publicaciones_al_mes y publicaciones_a_la_semana de pendientes_maw a clients
-- Fecha: 2026-01-26

-- Paso 1: Agregar columnas a la tabla clients (si no existen)
ALTER TABLE clients
ADD COLUMN IF NOT EXISTS publicaciones_al_mes TEXT,
ADD COLUMN IF NOT EXISTS publicaciones_a_la_semana TEXT;

-- Paso 2: Migrar datos existentes de pendientes_maw a clients
-- Toma el valor del primer pendiente de cada cliente que tenga datos
UPDATE clients c
SET
    publicaciones_al_mes = subq.publicaciones_al_mes,
    publicaciones_a_la_semana = subq.publicaciones_a_la_semana
FROM (
    SELECT DISTINCT ON (client_id)
        client_id,
        publicaciones_al_mes,
        publicaciones_a_la_semana
    FROM pendientes_maw
    WHERE publicaciones_al_mes IS NOT NULL
       OR publicaciones_a_la_semana IS NOT NULL
    ORDER BY client_id, id ASC
) subq
WHERE c.id = subq.client_id;

-- Paso 3 (OPCIONAL - ejecutar después de verificar que todo funciona):
-- Eliminar columnas de pendientes_maw
-- ALTER TABLE pendientes_maw DROP COLUMN IF EXISTS publicaciones_al_mes;
-- ALTER TABLE pendientes_maw DROP COLUMN IF EXISTS publicaciones_a_la_semana;
