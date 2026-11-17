---
title: "Lo que reviso antes de publicar un proyecto"
date: 2026-11-17
description: "La lista que repaso antes de poner cualquier aplicación en producción: seguridad, datos y obligaciones legales, calidad, experiencia de usuario y operación."
tags: ["seguridad", "checklist", "producción"]
draft: false
---

Que una aplicación funcione en mi ordenador no significa que esté lista para publicarse. Entre una cosa y otra hay una lista de comprobaciones que repaso en cada proyecto, propio o de un cliente. No todo aplica siempre, pero recorrerla entera evita sorpresas.

## 1. Seguridad

- **HTTPS en todo el sitio**, con redirección desde HTTP y solo versiones modernas de TLS.
- **Cabeceras de seguridad**: HSTS, `nosniff`, política de referer, protección contra que otra web incruste la tuya y una política de seguridad de contenidos (CSP) tan estricta como permita el proyecto.
- **Validar todas las entradas en el servidor**, aunque ya se validen en el navegador: tamaño, formato, tipo. Consultas a la base de datos siempre parametrizadas y salida siempre escapada.
- **Limitar peticiones** en el login, el registro, los formularios y las API públicas, por IP y también con un límite global.
- **Que cada usuario acceda solo a lo suyo**, aunque cambie un número en la URL. Se prueba con dos cuentas.
- **Secretos fuera del repositorio**: contraseñas y claves solo en el servidor.
- **Dependencias sin vulnerabilidades conocidas** que afecten a producción.

Un ejemplo reciente: al repasar esta misma web encontré que el endpoint que recibe los comentarios de [Zenit](/projects/zenit/) limitaba los envíos por IP, pero varias peticiones simultáneas podían saltarse el límite. También faltaba la cabecera HSTS. Ninguna de las dos cosas se ve usando la web, y por eso hay que buscarlas expresamente.

## 2. Datos y obligaciones legales

En España, y en general en la UE:

- **Aviso legal** con los datos del titular, obligatorio si la web tiene actividad económica.
- **Política de privacidad** si se recoge cualquier dato personal, aunque sea un email.
- **Cookies**: si hay cookies que no son técnicas (analítica, publicidad, vídeos incrustados), hace falta un banner que permita rechazarlas tan fácilmente como aceptarlas. Si no las hay, no hace falta banner.
- **Términos y condiciones** si hay cuentas de usuario o venta.
- **Recoger solo lo necesario** y ofrecer una forma sencilla de borrar los datos.

## 3. Calidad

- **Tests automáticos** de lo crítico, y como mínimo comprobación de tipos y build antes de cada despliegue. Si fallan, no se publica.
- **Accesibilidad**: que se pueda usar con teclado, con contraste suficiente, textos alternativos en las imágenes y etiquetas en los formularios.
- **Rendimiento**: imágenes optimizadas y tiempos de carga razonables en el móvil.
- **Compatibilidad** con los navegadores y dispositivos que vaya a usar la gente.

## 4. Experiencia de usuario

- **Registro sencillo** si hay cuentas, por ejemplo con "Continuar con Google", manteniendo una alternativa para quien no use Google.
- **Que el primer minuto se entienda**: qué hacer al entrar por primera vez.
- **Recorrer la aplicación como un usuario nuevo**, o mejor aún, ver cómo lo hace otra persona.

## 5. Operación

- **Alertas** si algo falla, en lugar de enterarte cuando te avisa un cliente.
- **Copias de seguridad automáticas y probadas**: una copia que nunca se ha restaurado no sirve de garantía.
- **Saber volver atrás** si un despliegue sale mal.
- **Logs útiles** que no guarden contraseñas ni datos personales innecesarios.

## 6. Documentación

Cómo instalarlo, cómo desplegarlo, qué existe solo en el servidor y qué hacer si algo falla. Es lo que permite que el proyecto siga vivo cuando pasan meses sin tocarlo.

---

Esta lista no garantiza que no haya errores, pero sí que los más habituales no lleguen a producción. Si tienes una aplicación publicada y no sabes en qué punto está, [escríbeme](/#contacto) y la revisamos.
