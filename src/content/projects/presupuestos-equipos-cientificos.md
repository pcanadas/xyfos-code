---
title: "Presupuestos de equipos científicos"
description: "App de escritorio que genera, en unos clics, presupuestos en PDF con la imagen de la empresa para una distribuidora de equipamiento científico. El catálogo sale de un Excel que mantiene el propio equipo."
kind: "client"
status: "production"
order: 3
problem: "Cada presupuesto se montaba a mano: copiar fichas técnicas, sumar opciones y accesorios, aplicar descuentos e IVA. Llevaba tiempo, era fácil equivocarse y cada comercial lo hacía con un formato distinto."
platform: "Windows · App de escritorio"
stack: ["Electron", "React", "Vite", "jsPDF", "SheetJS"]
cover: "/images/presupuestos-equipos-cientificos/app.webp"
coverAlt: "La aplicación con un equipo seleccionado, sus opciones marcadas y el resumen del presupuesto con descuento e IVA"
---

Una distribuidora de equipamiento científico y de laboratorio, con clientes en España y Portugal, necesitaba que su equipo comercial preparara presupuestos más rápido, sin errores de cálculo y con el mismo aspecto profesional en todos.

La solución es una aplicación de escritorio para Windows. El equipo la usa **desde la primera versión, en febrero de 2026**, y es su herramienta definitiva desde la **versión 1.7, en junio de 2026**. Por confidencialidad, no se muestran su nombre ni sus datos.

### Cómo funciona

1. **Se elige el equipo** del catálogo.
2. **Se marcan las opciones y los accesorios**: la app solo muestra los compatibles con ese equipo y separa lo que va incluido de lo que tiene coste.
3. **Se rellenan los datos del cliente** y las condiciones: validez, plazo de entrega y descuento.
4. **Se genera el PDF**, que se guarda solo en la carpeta de presupuestos.

### Lo que resuelve

- **Catálogo en un Excel que mantiene el cliente.** Productos, opciones, características, aplicaciones y requisitos de instalación están en hojas de cálculo que el equipo ya sabía usar. Para cambiar un precio o añadir un equipo no hace falta tocar la aplicación.
- **Cálculos automáticos.** Precio base, opciones, descuento, base imponible, IVA y total, sin calculadora.
- **PDF con la imagen de la empresa.** Logo, foto del equipo, ficha técnica, tabla de opciones y accesorios, resumen de precios, condiciones comerciales y requisitos de instalación. El documento se reparte en las páginas que hagan falta.
- **Líneas libres.** Se pueden añadir productos fuera de catálogo con su cantidad y precio.
- **Sin conexión.** Funciona en el ordenador del comercial y los datos no salen de la empresa.

### Dos ediciones: España y Portugal

Hay una **edición en portugués** para el mercado portugués: la interfaz y el PDF están traducidos, con las condiciones fiscales que corresponden, como la exención de IVA en las entregas intracomunitarias. Cada edición tiene su propio instalador para Windows.

### Capturas

Capturas con un catálogo, una empresa y un cliente ficticios.

#### Equipo, opciones y resumen del presupuesto

![Selección de un evaporador rotativo con sus opciones marcadas y el resumen con subtotal, descuento, IVA y total](/images/presupuestos-equipos-cientificos/app.webp)

#### Datos del cliente y condiciones

![Formulario con el cliente, el número de presupuesto, la validez, el plazo de entrega, el descuento y las condiciones de pago](/images/presupuestos-equipos-cientificos/app-cliente.webp)

#### El PDF generado

<div class="not-prose grid gap-4 sm:grid-cols-2">
  <img src="/images/presupuestos-equipos-cientificos/pdf-opciones.webp" alt="Página del PDF con la descripción del equipo, sus características, aplicaciones, opciones y accesorios con precio" width="900" height="1273" loading="lazy" decoding="async" class="rounded-lg border border-line" />
  <img src="/images/presupuestos-equipos-cientificos/pdf-precios.webp" alt="Página del PDF con el resumen de precios, las condiciones generales y los requisitos de instalación" width="900" height="1273" loading="lazy" decoding="async" class="rounded-lg border border-line" />
</div>

### Stack

Electron · React 18 · Vite · jsPDF + jspdf-autotable · SheetJS (xlsx) · instalador NSIS
