---
title: "Cuadra"
description: "App de finanzas personales en dos versiones: escritorio para Windows y Android, en prueba cerrada en Google Play."
url: "https://github.com/pcanadas/cuadra-finances"
status: "beta"
order: 1
problem: "Controlar los gastos del hogar a partir de los extractos del banco, sin hojas de cálculo y sin entregar tus datos a terceros."
platform: "Windows · Android"
stack: ["Tauri", "React", "Rust", "IndexedDB"]
cover: "/images/cuadra/dashboard_light.png"
coverAlt: "Dashboard de Cuadra con resumen anual, previsión del mes y presupuestos"
editions:
  - name: "Escritorio"
    platform: "Windows"
    availability: "Disponible"
    tone: "live"
    summary: "Para analizar a fondo: importación de extractos, categorización automática, dashboard anual y planificación."
    link: { href: "https://github.com/pcanadas/cuadra-finances/releases/latest", label: "Descargar para Windows" }
  - name: "Android"
    platform: "Google Play"
    availability: "Prueba cerrada"
    tone: "testing"
    summary: "Para el día a día: apuntar un gasto en segundos, revisar el mes y consultar los gráficos desde el móvil."
    link: { href: "#android", label: "Ver la versión Android" }
---

Cuadra es una app de finanzas personales que permite importar extractos bancarios, categorizar movimientos automáticamente y visualizar la evolución de gastos e ingresos. Toda la información se guarda en el propio dispositivo — sin servidores, sin cuentas, sin compartir datos con nadie.

Hay **dos versiones independientes**, cada una con su propia numeración de versiones. Comparten el mismo código base (Tauri 2 + React), pero la interfaz está pensada para cada uso. Los datos no se sincronizan entre ellas.

## Escritorio

**Windows · Disponible.** Se instala con un instalador para Windows y se actualiza automáticamente. Es la versión más completa, pensada para revisar extractos y planificar con calma.

### Funcionalidades

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

### Capturas

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

## Android

**Google Play · Prueba cerrada.** La app móvil está en prueba cerrada en Google Play y todavía no está disponible públicamente. Es una adaptación al móvil, centrada en apuntar gastos al momento y consultar el mes de un vistazo.

<img src="/images/cuadra/android-banner.webp" alt="Cuadra para Android: tus finanzas personales, claras y en tu móvil. Gratis, sin anuncios y con tus datos solo en tu móvil" width="1024" height="500" loading="lazy" decoding="async" />

### Funcionalidades

- **Alta rápida** con el botón ＋: gasto, ingreso o transferencia en segundos
- **Importación de extractos** en PDF, CSV o Excel
- **Previsión del mes**, presupuestos y cierre de meses anteriores
- **Gráficos** por categoría, mes y año
- **Exportar** a Excel y copia de seguridad completa
- **Tema claro y oscuro**, iconos de categorías y tamaño de letra a tu gusto
- Gratis, sin anuncios, sin cuentas y con los datos solo en el móvil

### Capturas

<div class="not-prose grid grid-cols-2 gap-4 sm:grid-cols-3">
  <img src="/images/cuadra/android-inicio.webp" alt="Inicio: gastos, ingresos, balance y previsión del mes" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/cuadra/android-alta-rapida.webp" alt="Alta rápida de un gasto con categorías, importe y día" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/cuadra/android-movimientos.webp" alt="Movimientos ordenados por día, con buscador y filtros" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/cuadra/android-graficos.webp" alt="Gráficos de distribución de gastos y gastos mensuales por categoría" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/cuadra/android-modo-oscuro.webp" alt="Pantalla de inicio en modo oscuro" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/cuadra/android-ajustes.webp" alt="Ajustes: tema, tamaño de letra e iconos de categorías" width="540" height="960" loading="lazy" decoding="async" class="rounded-lg border border-line" />
</div>

### ¿Quieres probarla?

Si quieres probarla antes de su publicación, [escríbeme](mailto:patricia@xyfos.com?subject=Probar%20Cuadra%20para%20Android) y te añado a la lista de testers. Consulta la [política de privacidad](/cuadra/privacidad/) y cómo [eliminar tus datos](/cuadra/eliminar-datos/).

## Stack

React 19 · Vite 8 · Tauri 2 (Rust) · Zustand 5 · Dexie 4 (IndexedDB) · Tailwind CSS 4 · Recharts 3 · Vitest 5
