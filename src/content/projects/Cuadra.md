---
title: "Cuadra"
description: "App de finanzas personales para Windows, con versión Android en prueba cerrada en Google Play."
url: "https://github.com/pcanadas/cuadra-finances"
status: "beta"
order: 1
problem: "Controlar los gastos del hogar a partir de los extractos del banco, sin hojas de cálculo y sin entregar tus datos a terceros."
platform: "Windows · Android (en pruebas)"
stack: ["Tauri", "React", "Rust", "IndexedDB"]
cover: "/images/cuadra/dashboard_light.png"
coverAlt: "Dashboard de Cuadra con resumen anual, previsión del mes y presupuestos"
---

Cuadra es una app de finanzas personales que permite importar extractos bancarios, categorizar movimientos automáticamente y visualizar la evolución de gastos e ingresos. Toda la información se guarda localmente en el dispositivo — sin servidores, sin cuentas, sin compartir datos con nadie.

### Versión Android — en prueba cerrada

La app para Android está **en prueba cerrada en Google Play** (versión 1.1.2) y todavía no está disponible públicamente. Comparte código con la versión de escritorio (Tauri 2), con una interfaz pensada para el móvil:

- **Alta rápida** con el botón ＋: gasto, ingreso o transferencia en segundos
- **Importación de extractos** en PDF, CSV o Excel
- **Previsión del mes**, presupuestos y cierre de meses anteriores
- **Exportar** a Excel y copia de seguridad completa
- Gratis, sin anuncios, sin cuentas y con los datos solo en el móvil

Si quieres probarla antes de su publicación, [escríbeme](mailto:patricia@xyfos.com?subject=Probar%20Cuadra%20para%20Android) y te añado a la lista de testers. Consulta la [política de privacidad](/cuadra/privacidad/) y cómo [eliminar tus datos](/cuadra/eliminar-datos/).

<div class="not-prose grid max-w-md grid-cols-2 gap-4">
  <img src="/images/cuadra/android-inicio.webp" alt="Cuadra en Android: pantalla de inicio con gastos, ingresos y previsión del mes" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/cuadra/android-alta-rapida.webp" alt="Cuadra en Android: alta rápida de un gasto con categorías e importe" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
</div>

### Capturas (escritorio)

#### Dashboard (modo oscuro)

![Dashboard oscuro](/images/cuadra/dashboard_dark.png)

#### Dashboard (modo claro)

![Dashboard claro](/images/cuadra/dashboard_light.png)

#### Movimientos

![Movimientos](/images/cuadra/movimientos.png)

#### Evolución del saldo

![Cuentas](/images/cuadra/cuentas.png)

#### Subcategorías

![Subcategorías](/images/cuadra/subcategorias.png)

### Funcionalidades principales

- **Importación de extractos** — Bankinter (XLS nativo) y CSV/Excel genérico con mapeo de columnas
- **Categorización automática** por palabras clave con excepciones y subcategorías con auto-aprendizaje
- **Múltiples cuentas bancarias** con pestañas, badges de color y evolución de saldo
- **Transferencias internas** — contrapartida automática entre cuentas con matching por fecha e importe
- **Dashboard anual** — gráficos de barras, tarta, tablas por categoría × mes, comparativa interanual y widget de previsión mensual
- **Gastos fijos y planificación** — gastos e ingresos recurrentes con periodicidad configurable (mensual→anual), matching inteligente por subcategoría/categoría, sugerencias auto-detectadas y presupuestos por categoría
- **Exportar a Excel** — movimientos filtrados a XLSX
- **Historial de backups** — hasta 10 copias automáticas antes de operaciones destructivas
- **Tema oscuro/claro** con persistencia
- **Actualizaciones automáticas** firmadas con minisign

### Stack

React 19 · Vite 8 · Tauri 2 (Rust) · Zustand 5 · Dexie 4 (IndexedDB) · Tailwind CSS 4 · Recharts 3 · Vitest 5
