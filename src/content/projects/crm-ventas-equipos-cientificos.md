---
title: "CRM de ofertas para un equipo comercial"
description: "Aplicación web interna con la que el equipo comercial de una distribuidora de equipamiento científico sigue cada oferta, desde que se envía hasta que el cliente compra o la descarta."
kind: "client"
status: "production"
order: 4
problem: "Cada comercial llevaba sus ofertas en su propio Excel. No había una vista común de la cartera, los seguimientos se olvidaban y preparar un informe para dirección suponía juntar hojas a mano."
platform: "Web · Uso interno"
stack: ["Laravel", "Blade", "Tailwind CSS", "Alpine.js", "Chart.js", "MariaDB"]
cover: "/images/crm-ventas-equipos-cientificos/app.webp"
coverAlt: "Panel de inicio con los contactos programados para hoy y el resumen de ofertas compradas, perdidas y pendientes"
---

Es la misma distribuidora de equipamiento científico para la que hice la [aplicación de presupuestos](/projects/presupuestos-equipos-cientificos/). Esta vez el problema no era preparar la oferta, sino lo que pasa después: saber en qué punto está cada una, a quién hay que llamar hoy y qué operaciones están a punto de cerrarse.

Es una versión de [QuoteDesk](/projects/quotedesk/) hecha a medida para este cliente, con sus estados, sus informes y su forma de trabajar. La usa a diario todo el equipo comercial. Por confidencialidad, no se muestran su nombre ni sus datos.

### Cómo funciona

1. **Se registra la oferta**: cliente, producto, importe, descuento, probabilidad y fecha prevista de compra.
2. **Se anota cada contacto**: llamada, email, visita, demo o videoconferencia, y cuándo toca el siguiente.
3. **El panel avisa cada mañana** de los contactos programados para hoy y de las operaciones inminentes.
4. **Se cierra la oferta** como comprada, perdida o sin compra, y pasa a las estadísticas.

### Lo que resuelve

- **Una sola cartera para todo el equipo.** Cada comercial ve sus ofertas y dirección ve el conjunto.
- **Ningún seguimiento se queda olvidado.** Las ofertas que necesitan atención y las de compra próxima aparecen solas.
- **Clientes como son en realidad.** Grupos, empresas y centros en tres niveles, y ventas a través de distribuidores con su cliente final.
- **Informes sin montar hojas a mano.** Ofertas por mes, por marca y por comercial, tasa de conversión, descuento medio y efectividad del seguimiento: cuántos contactos hacen falta hasta tener respuesta y qué canal funciona mejor.
- **Comentarios de dirección** en cada oferta.
- **Exportación a Excel** con filtros, para quien siga necesitando la hoja.
- **Migración de los Excel históricos.** Las ofertas que había se importaron, así que el equipo no empezó de cero.
- **Acceso con doble factor** obligatorio para todos los usuarios.

### Capturas

Capturas con clientes, productos, marcas y comerciales ficticios.

#### Panel de inicio

![Panel con los contactos programados para hoy, cada uno con su comercial y un botón para registrar el contacto, y el resumen de ofertas](/images/crm-ventas-equipos-cientificos/app.webp)

#### Ficha de una oferta

![Ficha de una oferta pendiente con el cliente, el producto, el importe, las fechas clave, los enlaces, el historial de contactos y un comentario de dirección](/images/crm-ventas-equipos-cientificos/oferta.webp)

#### Estadísticas

![Estadísticas con el reparto por resultado, la conversión, el tiempo medio de cierre y la actividad de contactos por dirección y por modo](/images/crm-ventas-equipos-cientificos/estadisticas.webp)

#### Efectividad del seguimiento

![Contactos necesarios hasta tener respuesta, tasa de respuesta por modo de contacto y tiempo medio hasta respuesta por comercial](/images/crm-ventas-equipos-cientificos/seguimiento.webp)

### Stack

Laravel 12 · Blade · Tailwind CSS · Alpine.js · Chart.js · PhpSpreadsheet · MariaDB
