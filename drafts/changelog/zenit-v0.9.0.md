---
title: "Zenit — ahorro y metas, disponible para gastar y gastos fijos más claros"
date: 2026-10-29
version: "v0.9.0"
project: "Zenit"
platform: "Escritorio"
---

### Añadido

- **Ahorro y metas** — pestaña nueva. **Ahorro**: una cantidad que quieres guardar cada mes. **Metas**: una cantidad para una fecha (un viaje, un coche…); cada mes te dice cuánto apartar para llegar a tiempo. Puedes traspasar el dinero a una cuenta o dejarlo apartado sin moverlo, y cada mes se marca como conseguido, parcial o no conseguido
- **Disponible para gastar** en el Dashboard — cuánto te queda hasta fin de mes y cuánto al día: ingresos previstos − gastado − gastos fijos pendientes − lo que falta por apartar para ahorro y metas
- **Aviso al superar un presupuesto** en el Dashboard y en Gastos fijos

### Corregido

- **Gastos fijos** — lo pagado o cobrado en varios movimientos (un ingreso en dos partes, la compra del súper) ahora se suma y se ve el progreso
- **Cuentas** — los movimientos manuales y traspasos anteriores al primer extracto ya salen en la evolución del saldo
- Restaurar una copia de seguridad con gastos fijos fallaba, y desde el historial no se recargaban presupuestos ni gastos fijos

### Cambiado

- La base de datos se prepara para sincronizar entre dispositivos en el futuro: se actualiza sola la primera vez que abres la app, con una copia de seguridad automática antes. No cambia nada de lo que ves
