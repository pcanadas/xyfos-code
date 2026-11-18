---
title: "QuoteDesk — ayuda, empresas emisoras y copias de seguridad"
date: 2026-11-18
version: "v0.5.0"
project: "QuoteDesk"
---

QuoteDesk está listo para que cualquier empresa empiece a usarlo por su cuenta: con ayuda dentro de la aplicación, sus datos copiados cada día y más control sobre ellos.

### Añadido

- **Ayuda** — preguntas frecuentes por temas dentro de la aplicación, con buscador, enlazadas desde el menú lateral y el menú de usuario
- **Empresas emisoras** — los administradores dan de alta y renombran las empresas desde las que envían las ofertas
- **Cancelar la cuenta de la empresa** — un administrador puede borrar su empresa, sus usuarios y todos sus datos desde su perfil
- **Encargo del tratamiento** — el contrato de protección de datos (RGPD, art. 28) que se acepta al crear la empresa
- **Copias de seguridad** — copia diaria de los datos, verificada, cifrada y guardada también fuera del servidor, en la Unión Europea
- **Página de error propia** — en tu idioma y con un camino de vuelta, en lugar de la página técnica

### Mejorado

- **Seguridad** — límites de intentos en el registro y el cambio de contraseña, cabeceras de seguridad en todas las páginas, y el formulario de recuperar contraseña ya no revela si un email tiene cuenta
- **El último administrador** — no puede borrar su cuenta y dejar la empresa sin nadie que la gestione

### Corregido

- **Empresas nuevas** — no podían crear ninguna oferta porque les faltaba la empresa emisora; ahora se crea al registrarse, y las empresas que ya existían la reciben automáticamente
- **Perfil y exportaciones** — guardar el perfil, borrar la cuenta y descargar los Excel no hacían nada
- **Comerciales** — en las fichas de clientes y empresas veían ofertas de otros comerciales que luego no podían abrir; ahora solo ven las suyas
