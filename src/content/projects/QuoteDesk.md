---
title: "QuoteDesk"
description: "CRM oferta-céntrico para equipos de ventas técnicas."
url: "https://quotedesk.xyfos.com/"
status: "alpha"
order: 2
problem: "Los CRM genéricos giran en torno al contacto o al deal, pero los equipos de venta técnica trabajan alrededor de la oferta."
platform: "SaaS · Web multi-tenant"
stack: ["Laravel", "Vue", "Inertia", "MySQL"]
cover: "/images/quotedesk/dashboard.webp"
coverAlt: "Panel de inicio de QuoteDesk con la cartera abierta, lo ganado este año, la tasa de éxito y las próximas actividades"
---

QuoteDesk es el primer producto de Xyfos Code. Un CRM diseñado alrededor de la oferta/presupuesto como entidad central — no del contacto ni del deal genérico — porque así trabajan realmente los equipos de venta técnica.

Hay una [versión a medida en producción](/projects/crm-ventas-equipos-cientificos/) que usa a diario el equipo comercial de una distribuidora de equipamiento científico.

**Multi-tenant por ruta** (`quotedesk.xyfos.com/t/{tenant}/...`), base de datos única con `tenant_id` en todas las tablas de negocio. Sin Redis, preparado para Hostinger.

### Módulos disponibles (alpha)

- **Panel de inicio** — Cartera abierta, ganado, tasa de éxito y próximas tareas
- **Calendario de actividades** — Visitas, llamadas, reuniones y tareas enlazadas a clientes y ofertas
- **Alertas de seguimiento** — Aviso en la app y email diario con las ofertas que necesitan atención
- **Ofertas en PDF** — Documento listo para enviar al cliente
- **Roles** — Administrador, responsable y comercial
- **Auth + Onboarding** — Registro crea tenant + primer usuario admin
- **Empresas** — Listado y detalle de distribuidores/empresas
- **Clientes** — CRUD completo con jerarquía de 3 niveles
- **Contactos de cliente** — CRUD + edición rápida desde la oferta
- **Ofertas** — CRUD completo (entidad central del CRM)
- **Seguimientos de oferta** — Registro de actividades por oferta
- **Ofertas inminentes** — Vista de ofertas próximas a vencer
- **Marcas y Productos** — Catálogo por tenant con autocomplete AJAX
- **Grupos de marketing** — Gestión de campañas
- **Usuarios/Comerciales** — Gestión de usuarios del equipo
- **Informes y estadísticas** — Resultados por marca y comercial, cumplimiento de seguimientos y efectividad hasta la respuesta del cliente
- **Empresas emisoras** — Las empresas propias desde las que se envían las ofertas
- **Demo pública** — Pruébalo sin registro en una empresa ficticia
- **Ayuda** — Preguntas frecuentes con buscador dentro de la aplicación
- **Español e inglés** — Cada usuario elige su idioma
- **Export Excel** — Descarga de ofertas y contactos

### Tus datos

- **Separados** — Cada empresa solo ve sus datos
- **Copiados cada día** — Copia de seguridad diaria verificada y cifrada, también fuera del servidor, en la Unión Europea
- **Bajo tu control** — Encargo del tratamiento (RGPD) al crear la empresa, exportación a Excel y baja de la empresa con todos sus datos desde el perfil

### Capturas

Capturas de una empresa de demostración con datos ficticios.

#### Panel de inicio

![Panel de inicio con la cartera abierta, lo ganado, la tasa de éxito, el gráfico de los últimos 12 meses y las próximas actividades](/images/quotedesk/dashboard.webp)

#### Ficha de oferta

![Ficha de una oferta con el cliente, el producto, el estado y los botones para programar una actividad y descargar el PDF](/images/quotedesk/oferta.webp)

#### Calendario de actividades

![Calendario mensual con visitas, llamadas y reuniones, y la lista de los próximos 7 días](/images/quotedesk/calendario.webp)

#### Seguimiento

![Ofertas que requieren atención: con el seguimiento vencido o sin actividad reciente](/images/quotedesk/seguimiento.webp)

#### En el móvil

<div class="not-prose grid grid-cols-2 gap-4 sm:grid-cols-3">
  <img src="/images/quotedesk/movil-dashboard.webp" alt="Panel de inicio en el móvil: cartera abierta, ganado este año y tasa de éxito" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/quotedesk/movil-grafico.webp" alt="Gráfico del importe ofertado y ganado en los últimos 12 meses" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/quotedesk/movil-menu.webp" alt="Menú lateral con todos los módulos" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/quotedesk/movil-oferta.webp" alt="Ficha de oferta con los botones para programar una actividad y descargar el PDF" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/quotedesk/movil-calendario.webp" alt="Calendario mensual de actividades" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/quotedesk/movil-seguimiento.webp" alt="Ofertas que requieren atención" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
</div>

### Stack

Laravel 12 · Inertia.js · Vue 3 · Tailwind CSS · MySQL · Laravel Breeze