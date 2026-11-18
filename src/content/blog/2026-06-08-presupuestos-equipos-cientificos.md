---
title: "De la hoja de cálculo al PDF: una app de presupuestos para una distribuidora científica"
date: 2026-06-08
description: "Cómo una aplicación de escritorio sencilla, alimentada por el Excel que el equipo ya mantenía, convirtió el presupuesto a mano en unos pocos clics. Un proyecto real, en producción en España y Portugal."
tags: ["caso práctico", "software a medida", "electron", "presupuestos"]
draft: false
---

Este es el primer proyecto para un cliente que cuento en el blog. Es una distribuidora de equipamiento científico y de laboratorio con clientes en España y Portugal. Por confidencialidad, no doy su nombre ni muestro sus datos: las capturas de este artículo usan una empresa, un catálogo y un cliente ficticios.

Puedes ver la ficha completa en [Presupuestos de equipos científicos](/projects/presupuestos-equipos-cientificos/).

## El problema

Un equipo de laboratorio rara vez se vende solo. Cada presupuesto lleva el equipo base, varias opciones (unas incluidas, otras con coste), accesorios, un descuento, el IVA y unas condiciones comerciales. Además, el cliente espera una ficha técnica con las características, las aplicaciones y los requisitos de instalación.

Todo eso se montaba a mano: copiar la ficha del equipo, buscar el precio de cada opción, sumar, aplicar el descuento, calcular el IVA y dar formato al documento. Llevaba tiempo, era fácil equivocarse en un precio o en una suma, y cada comercial acababa con su propio formato.

## La solución: una app de escritorio y el Excel de siempre

El equipo ya tenía su catálogo en hojas de cálculo y sabía mantenerlo. En lugar de pedirles que lo pasaran a otro sistema, la aplicación **lee directamente ese Excel**: una hoja de productos, otra de opciones y accesorios, otras de características, aplicaciones y requisitos, y una de configuración con los datos de la empresa, el IVA y los valores por defecto.

Cambiar un precio o dar de alta un equipo sigue siendo editar una celda. No hace falta tocar la aplicación ni llamarme.

Con el catálogo cargado, preparar un presupuesto son cuatro pasos:

1. **Elegir el equipo.**
2. **Marcar las opciones y los accesorios.** Solo aparecen los compatibles con ese equipo, y se distingue lo incluido de lo que tiene coste.
3. **Rellenar el cliente y las condiciones:** validez, plazo de entrega, descuento y forma de pago.
4. **Generar el PDF**, que se guarda solo en la carpeta de presupuestos.

![La aplicación con un equipo seleccionado, sus opciones marcadas y el resumen del presupuesto con descuento e IVA (datos ficticios)](/images/presupuestos-equipos-cientificos/app.webp)

## Un PDF que parece hecho a mano (pero no lo está)

El documento es lo que ve el cliente final, así que le dediqué tanto tiempo como a la propia aplicación. Lleva el logo y los datos de la empresa, el número de presupuesto, el cliente, la imagen del equipo, su ficha técnica, la tabla de opciones y accesorios, el resumen de precios, las condiciones comerciales y los requisitos de instalación.

Parece sencillo, pero un presupuesto puede tener tres opciones o treinta. El reto estaba en que el contenido se repartiera bien entre páginas, sin cortar una opción por la mitad ni dejar un título huérfano al final de una hoja.

![Primera página del PDF con el logo y los datos de la empresa, el cliente y la imagen del equipo (datos ficticios)](/images/presupuestos-equipos-cientificos/pdf-portada.webp)

## Por qué escritorio y no una web

Hoy casi todo se hace en la web, y aquí elegí lo contrario a propósito:

- **Funciona sin conexión.** Un comercial puede preparar un presupuesto donde esté.
- **Los datos no salen de la empresa.** Precios, descuentos y clientes se quedan en el ordenador de quien los usa.
- **No hay servidor que mantener.** Ni hosting, ni cuentas de usuario, ni cuotas mensuales. Un instalador de Windows y listo.

Para un equipo pequeño con un proceso muy concreto, era la opción más simple y más barata de mantener. Está hecha con Electron y React, y los PDF se generan con jsPDF.

## Dos países, dos ediciones

Con la versión española en marcha llegó la petición de una edición para Portugal. No bastaba con traducir los textos: el presupuesto tenía que reflejar las condiciones fiscales de una venta desde España, como la **exención de IVA en las entregas intracomunitarias**. Hoy son dos ediciones con su propio instalador, una para cada mercado.

## Cómo ha ido

El equipo empezó a usarla con la primera versión, en febrero. Desde entonces ha ido creciendo con lo que pedía el uso real: ordenar mejor las opciones, añadir accesorios, permitir líneas libres para productos fuera de catálogo… Con la versión 1.7, publicada estos días, ha pasado a ser su herramienta definitiva para hacer presupuestos.

## Lo que me llevo

- **Empezar por lo que el equipo ya usa.** El Excel no era el problema, sino todo lo que se hacía a mano a partir de él. Mantenerlo como fuente de datos eliminó la mayor barrera para adoptar la herramienta.
- **El documento final importa tanto como la aplicación.** Es lo que llega al cliente y lo que se juzga.
- **Las primeras versiones, cuanto antes en manos de quien las usa.** Las mejores mejoras salieron de ver la herramienta en el trabajo diario, no de imaginarlas de antemano.

Si en tu empresa los presupuestos, las ofertas o cualquier otro documento se siguen montando a mano, [cuéntame cómo lo hacéis](/#contacto).
