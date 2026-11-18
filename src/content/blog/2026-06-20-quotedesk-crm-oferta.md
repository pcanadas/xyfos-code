---
title: "QuoteDesk: por qué diseñé un CRM alrededor de la oferta"
date: 2026-06-20
description: "Los CRM genéricos giran en torno al contacto o a la oportunidad. Los equipos de venta técnica trabajan alrededor de la oferta. Así nació QuoteDesk y estas son las decisiones que hay detrás."
tags: ["quotedesk", "caso práctico", "crm", "laravel"]
draft: false
---

[QuoteDesk](/projects/quotedesk/) es el primer producto de Xyfos Code: un CRM para equipos de venta técnica. En este artículo cuento qué problema intenta resolver y por qué está construido como está.

## El problema

En la venta técnica (maquinaria, instrumentación, equipos industriales) el trabajo diario gira en torno a la **oferta**: un presupuesto para un cliente concreto, con un producto de una marca, un importe, un descuento, una probabilidad de cierre, una fecha prevista de compra y una serie de seguimientos hasta que el cliente decide.

Los CRM generalistas están pensados de otra forma. Su centro es el contacto o la "oportunidad", un concepto abstracto que el equipo tiene que adaptar a su manera de trabajar. El resultado suele ser el mismo: el CRM se rellena a regañadientes y las ofertas de verdad viven en una hoja de cálculo paralela.

## La decisión principal: la oferta es la entidad central

En QuoteDesk todo cuelga de la oferta:

- El **cliente** y sus **personas de contacto**, editables sin salir de la oferta.
- El **producto** y la **marca**, de un catálogo propio de cada empresa con autocompletado.
- Los **seguimientos**: cada llamada, visita o correo queda registrado en la oferta a la que pertenece.
- La vista de **ofertas inminentes**, con las que están cerca de su fecha prevista de compra, para no dejar escapar ninguna.

Cuando la estructura del programa coincide con la forma de pensar del equipo, no hace falta convencer a nadie de que lo use: es simplemente la forma más cómoda de trabajar.

## Clientes con jerarquía

Los clientes industriales rara vez son una sola ficha. Un mismo grupo puede tener varias empresas y cada una varios centros. QuoteDesk organiza los clientes en una **jerarquía de tres niveles** y, al dar de alta uno, comprueba si ya existe para no crear duplicados.

## Varias empresas, datos separados

QuoteDesk es un SaaS: varias empresas usan la misma aplicación, y cada una debe ver **solo sus datos**. Hay varias formas de conseguirlo; elegí la más sencilla de mantener:

- Una única base de datos en la que todas las tablas de negocio llevan el identificador de la empresa.
- Un filtro automático en cada consulta, de forma que el código no puede "olvidarse" de filtrar por empresa.
- Cada empresa trabaja en su propia ruta (`/t/nombre-empresa/...`), y el registro crea la empresa y su primer usuario administrador.

Es una regla que no admite excepciones: nada de negocio sin el identificador de la empresa.

## Lo que no se puede olvidar

Hay cosas que parecen secundarias y que deciden si una herramienta se usa o no:

- **Exportar a Excel** ofertas y contactos. Los equipos comerciales viven en Excel y seguirán necesitando sacar datos para un informe o una reunión.
- **Español e inglés**, a elección de cada usuario, porque muchos equipos de venta técnica trabajan con fabricantes y compañeros de otros países.
- **Roles**: administrador y comerciales no necesitan ver ni hacer lo mismo.
- **Informes y estadísticas** para saber cómo va la cartera sin montar una hoja aparte.

## Una tecnología aburrida, a propósito

QuoteDesk está hecho con Laravel, Vue y MySQL, y se aloja en un hosting gestionado sin servicios adicionales como Redis. No es la arquitectura más llamativa, pero es estable, conocida y barata de mantener. Para una herramienta de gestión, eso vale más que cualquier novedad.

## En qué punto está

QuoteDesk está en fase alfa, con los módulos principales funcionando. Cada versión queda documentada en el [changelog](/changelog).

Si tu equipo comercial trabaja con ofertas y sientes que tu CRM no encaja, o si tienes un problema parecido en otro ámbito, [escríbeme](/#contacto).
