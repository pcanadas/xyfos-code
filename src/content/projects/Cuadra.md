---
title: "Cuadra"
description: "App de escritorio para gestión de finanzas personales del hogar."
url: "https://github.com/pcanadas/cuadra-finances"
status: "beta"
order: 1
problem: "Controlar los gastos del hogar a partir de los extractos del banco, sin hojas de cálculo y sin entregar tus datos a terceros."
platform: "Escritorio · Windows"
stack: ["Tauri", "React", "Rust", "IndexedDB"]
cover: "/images/cuadra/dashboard_light.png"
coverAlt: "Dashboard de Cuadra con resumen anual, previsión del mes y presupuestos"
---

Cuadra es una app de escritorio para Windows que permite importar extractos bancarios, categorizar movimientos automáticamente y visualizar la evolución de gastos e ingresos. Toda la información se guarda localmente en IndexedDB — sin servidores, sin cuentas, sin compartir datos con nadie.

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
