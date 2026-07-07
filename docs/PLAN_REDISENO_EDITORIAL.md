# Plan de Rediseño Editorial — MAW Soluciones

**Objetivo:** transformar mawsoluciones.com de landing de agencia genérica a sitio con diseño editorial de lujo, dirigido a empresas AAA (corporativos, enterprise, tickets altos). El sitio debe transmitir criterio, sobriedad y precio alto antes de que el visitante lea una sola palabra.

**Fecha:** 2026-07-06
**Stack actual:** Next.js 15 (App Router) · React 18 · Tailwind 3.4 · shadcn/ui (Radix) · Framer Motion 11 · Lenis

---

## 1. Diagnóstico del sitio actual

| Área | Estado actual | Problema para audiencia AAA |
|------|--------------|------------------------------|
| Tipografía | Montserrat en todo (400/700) | Genérica, asociada a PyME/startup barata |
| Color | Dark casi-negro + ámbar `#f5a623` | Acento naranja lee "oferta", no "premium" |
| Layout | Secciones apiladas full-width, cards shadcn | Sin ritmo editorial, sin jerarquía tipográfica |
| Efectos | Glitch, typewriter, parallax | Ruido visual; lo caro es quietud y precisión |
| Copy | "Transformamos Ideas en Resultados Digitales" | Promesa vaga; AAA compra casos, cifras y método |
| Logo | Tipográfico serif en componente | Aprovechable — base para identidad editorial |
| Prueba social | ~40 logos de clientes locales mezclados | Curar: mostrar 6-8 mejores, con caso de estudio |

## 2. Dirección de arte: "Editorial de lujo"

Referencias de tono: revista de arquitectura / consultora boutique (pentagram.com, instrument.com, area17.com, editoriales tipo *Monocle* / *Kinfolk*).

### 2.1 Tipografía
- **Display / headlines:** serif editorial con contraste — `Fraunces` (variable, Google Fonts) u opción `Instrument Serif`. Tamaños grandes: hero 6–9rem desktop, tracking apretado, leading 0.95–1.05.
- **Texto / UI:** grotesk neutra — `Inter` tight o `Geist Sans`. Nunca Montserrat.
- **Detalles:** mono discreta (`Geist Mono` / `JetBrains Mono`) para etiquetas, números de sección ("01 — Estrategia"), metadatos.
- Escala tipográfica modular (1.25) definida como tokens Tailwind.

### 2.2 Paleta
Quitar ámbar como protagonista. Base neutra cálida + un solo acento contenido:

```
--ivory:     #FAF7F2   (fondo claro principal)
--paper:     #F2EDE4   (fondo secciones alternas)
--ink:       #14120F   (texto, fondos dark)
--charcoal:  #2A2723   (superficies dark)
--stone:     #8A8378   (texto secundario, bordes)
--accent:    #9A6B2F   (bronce/oro viejo — SOLO detalles: rules, hover, números)
```

Modo claro como default (editorial = papel). Dark disponible pero invertido con los mismos tokens.

### 2.3 Layout y ritmo
- Grid editorial 12 columnas, márgenes generosos (`max-w-[1400px]`, padding lateral 6–10%).
- Whitespace agresivo: secciones con `py-32`+, aire entre bloques.
- Reglas horizontales finas (1px stone) como separadores, estilo revista.
- Números de sección y folios ("01", "02") en mono.
- Imágenes grandes a sangre parcial, ratio editorial (4:5, 3:2), tratamiento duotono/desaturado consistente.
- Asimetría deliberada: texto en 5 columnas, imagen en 6, columna vacía.

### 2.4 Motion
- Eliminar glitch y typewriter.
- Solo: fade+rise sutil al entrar en viewport (Framer Motion, 0.6s, ease-out), underline animado en links, cross-fade de imágenes. Lenis se queda.
- `prefers-reduced-motion` respetado en todo.

### 2.5 Copy (reposicionamiento AAA)
- Hero: afirmación corta con autoridad, no slogan rotativo. Ej: *"Ingeniería y diseño para empresas que operan en serio."*
- Lenguaje de consultora: método, entregables, casos con métricas.
- CTA: "Agendar conversación" en vez de "¡Contáctanos!".
- Precios/paquetes fuera de la home; AAA compra por conversación, no por pricing table.

## 3. Alcance

**Fase 1 (este plan):** páginas públicas de mayor impacto.
1. Sistema de diseño (tokens, tipografía, componentes base)
2. Home (`src/app/page.tsx` + `src/components/sections/*`)
3. Header (`src/components/header.tsx`) y Footer (`src/components/footer.tsx`)
4. Plantilla de servicio (`src/components/landing/service-landing.tsx` y bloques)
5. Portafolio (`portafolio/`) → reformular como "Casos" con narrativa
6. Contacto (`contacto/`)

**Fuera de alcance fase 1:** portal `/equipo`, `/feedback`, herramientas, cursos, blog (solo hereda tokens), APIs, backend.

## 4. Arquitectura multiagente

Orquestación con el tool `Workflow` de Claude Code (pipeline de subagentes). Cada agente recibe el brief de dirección de arte (sección 2) como contrato inmutable.

### Fase A — Fundación (secuencial, 1 agente)
**Agente `design-system`**
- Reescribe `src/app/globals.css`: tokens nuevos (paleta sección 2.2), light default.
- `tailwind.config.ts`: escala tipográfica, familias (`font-display`, `font-sans`, `font-mono`), spacing editorial.
- `src/app/layout.tsx`: carga Fraunces + Inter/Geist vía `next/font`.
- Componentes base editoriales en `src/components/editorial/`: `SectionHeading`, `Eyebrow` (etiqueta mono), `Rule` (separador), `EditorialImage`, `FadeIn`.
- **Gate:** build pasa + revisión visual antes de Fase B.

### Fase B — Páginas (paralelo con worktree isolation, 4 agentes)
Todos dependen de Fase A. Corren en paralelo, cada uno en su worktree:

| Agente | Alcance | Archivos clave |
|--------|---------|----------------|
| `home` | Hero editorial, About, Servicios curados, Casos destacados, prueba social curada, CTA final | `page.tsx`, `sections/hero.tsx`, `sections/about.tsx`, `sections/services.tsx`, `sections/testimonials.tsx` |
| `shell` | Header minimal (logo + 4 links + CTA), mega-menú sobrio, footer editorial tipo colofón | `header.tsx`, `footer.tsx`, `logo.tsx` |
| `service-template` | Rediseño de plantilla y bloques landing (hero, proceso numerado, FAQ sobrio; eliminar sticky-CTA agresivo y stats infladas) | `landing/*.tsx` |
| `cases-contact` | Portafolio → "Casos" con layout editorial; contacto como página de conversación (sin form largo) | `portafolio/*`, `contacto/*`, `sections/portfolio.tsx` |

### Fase C — Verificación adversarial (paralelo, 3 agentes)
- **`critic-aaa`:** revisa cada página con lente "¿un director de marketing de corporativo confiaría?"; señala todo lo que lea barato (emojis, signos de exclamación, colores saturados, stock genérico).
- **`consistency`:** audita tokens — cero colores hardcoded fuera del sistema, tipografías correctas, spacing consistente.
- **`qa-tech`:** `next build`, lighthouse, responsive (360/768/1440), dark mode, `prefers-reduced-motion`, links rotos.

Hallazgos regresan a agentes de Fase B (loop hasta que critic apruebe, máx. 2 rondas).

### Fase D — Integración (secuencial, 1 agente)
- Merge de worktrees, resolución de conflictos, build final, screenshots de evidencia, commit por página.

### Comando de arranque
```
"Ejecuta el plan de docs/PLAN_REDISENO_EDITORIAL.md con un workflow multiagente"
```

## 5. Riesgos

- **Fuentes:** Fraunces variable pesa ~200KB → subset latin + `display: swap`.
- **Light default:** el sitio hoy es dark default; revisar componentes shadcn que asumen dark (`theme-toggle`, charts del portal). Portal `/equipo` NO debe romperse: los tokens nuevos deben mantener contraste válido en ambos modos.
- **Imágenes de clientes:** calidad dispareja; el tratamiento duotono/desaturado las homogeneiza sin reemplazarlas.
- **SEO:** no tocar rutas ni metadata estructural; solo presentación y copy.

## 6. Criterios de aceptación

1. Cero Montserrat, cero ámbar `38 92%` en páginas públicas fase 1.
2. `next build` sin errores; sin regresión en portal `/equipo`.
3. Home pasa el test de squint: jerarquía clara con los ojos entrecerrados.
4. Todo color/fuente viene de tokens; `grep` de hex hardcoded en `src/components/sections|landing|editorial` regresa vacío.
5. Critic AAA aprueba sin hallazgos "lee barato" pendientes.
