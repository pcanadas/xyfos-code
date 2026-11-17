---
title: "Zenit: una app de finanzas con los datos solo en tu dispositivo"
date: 2026-10-30
description: "Cómo se construye una app de finanzas personales sin servidores ni cuentas de usuario, qué se gana y qué se sacrifica con esa decisión."
tags: ["zenit", "caso práctico", "privacidad", "tauri"]
draft: false
---

[Zenit](/projects/zenit/), que hasta hace unos días se llamaba Cuadra, es una app de finanzas personales para Windows y Android. Importa los extractos del banco, clasifica los movimientos y muestra en qué se va el dinero cada mes. Este artículo explica la decisión que más ha condicionado su diseño: **tus datos no salen de tu dispositivo**.

## Por qué sin servidor

Los movimientos bancarios dicen muchísimo de una persona: dónde vive, dónde compra, a qué dedica su tiempo, con quién comparte gastos. La mayoría de las apps de finanzas guardan esa información en sus servidores, y muchas se conectan al banco a través de un intermediario al que entregas tus credenciales o un permiso de acceso.

Zenit hace lo contrario:

- **Sin cuentas de usuario.** No hay registro ni contraseña.
- **Sin servidor.** Los datos se guardan en una base de datos local en el propio dispositivo.
- **Sin conexión con el banco.** Tú descargas el extracto desde tu banco y lo importas en la app.
- **Sin analítica ni publicidad.**

Así no hay ninguna base de datos central que pueda filtrarse, venderse o quedar expuesta, porque esa base de datos no existe.

## Lo que se sacrifica

Esta decisión tiene costes, y conviene decirlos claro:

- **No hay sincronización entre dispositivos**, por ahora. La versión de escritorio y la de Android son independientes y no comparten datos. Si algún día la hay, tendrá que respetar el mismo principio: que nadie más que tú pueda leer tus datos.
- **Si pierdes el dispositivo, pierdes los datos**, salvo que tengas una copia. Por eso la app facilita exportar a Excel y hacer copias de seguridad, y hace una copia automática antes de cualquier operación que borre o modifique muchos datos.
- **Importar requiere un paso manual**: descargar el extracto. A cambio, no hay que dar a nadie acceso a la cuenta del banco.

## Importar extractos que cuadren

Si no hay conexión con el banco, todo depende de que la importación sea buena. Es la parte que más trabajo ha llevado:

- Lectura de extractos en **PDF, CSV y Excel**, incluidos los que traen varias cuentas en un mismo archivo.
- **Sin duplicados** cuando importas extractos que se solapan en fechas.
- **Comprobación de saldos**: cada movimiento se contrasta con el saldo que indica el banco, para detectar si falta o sobra algo.
- **Categorización automática** por palabras clave, con excepciones y subcategorías.

## Dos versiones, una misma base

Zenit está construida con **Tauri** y **React**. Tauri permite empaquetar una interfaz web como aplicación nativa de escritorio y de Android, con instaladores ligeros porque usa el navegador del propio sistema en lugar de incluir uno entero.

Las dos versiones comparten código, pero no son la misma app con la pantalla encogida:

- **Escritorio**, para analizar con calma: importar extractos, revisar el mes o el año, planificar presupuestos y gastos fijos. Está disponible para Windows en Microsoft Store y en GitHub.
- **Android**, para el día a día: apuntar un gasto en segundos y consultar cómo va el mes. Está en prueba cerrada en Google Play.

## Lo que aplico a otros proyectos

Zenit es un producto propio, pero las decisiones son las mismas que tomo en proyectos para clientes:

- **Recoger solo los datos imprescindibles.** Cada dato que no guardas es un dato que no tienes que proteger.
- **Decir con claridad qué se sacrifica.** Toda arquitectura tiene costes; elegir bien es saber cuáles aceptas.
- **Invertir donde está el riesgo.** En Zenit, la importación de extractos; en otro proyecto será otra cosa.

Si tu proyecto maneja datos delicados y quieres pensar cómo tratarlos, [hablemos](/#contacto).
