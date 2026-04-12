---
title: "Xyfos Sales"
description: "CRM oferta-céntrico para equipos de ventas técnicas."
url: "https://app.xyfos.com"
status: "alpha"
---

Xyfos Sales es el primer producto de Xyfos Code. Un CRM diseñado alrededor de la oferta/presupuesto como entidad central — no del contacto ni del deal genérico — porque así trabajan realmente los equipos de venta técnica.

**Multi-tenant por ruta** (`app.xyfos.com/t/{tenant}/...`), base de datos única con `tenant_id` en todas las tablas de negocio. Sin Redis, preparado para Hostinger.

### Módulos disponibles (alpha)

- **Auth + Onboarding** — Registro crea tenant + primer usuario admin
- **Empresas** — Listado y detalle de distribuidores/empresas
- **Clientes** — CRUD completo con jerarquía de 3 niveles
- **Contactos de cliente** — CRUD + edición rápida desde la oferta
- **Ofertas** — CRUD completo (entidad central del CRM)
- **Seguimientos de oferta** — Registro de actividades por oferta
- **Ofertas inminentes** — Vista de ofertas próximas a vencer
- **Marcas y Productos** — Catálogo por tenant con autocomplete AJAX
- **Grupos de marketing** — Gestión de campañas
- **Usuarios/Comerciales** — Gestión admin con roles
- **Informes y estadísticas** — Vistas de reporting
- **Export Excel** — Descarga de ofertas y contactos

### Stack

Laravel 12 · Inertia.js · Vue 3 · Tailwind CSS · MySQL · Laravel Breeze