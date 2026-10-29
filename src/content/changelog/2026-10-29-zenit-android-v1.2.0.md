---
title: "Zenit — bloqueo con huella, ahorro y metas, y disponible para gastar"
date: 2026-10-29
version: "v1.2.0"
project: "Zenit"
platform: "Android"
---

**Cuadra pasa a llamarse Zenit.** Misma app y tus datos de siempre: se actualiza encima sin perder nada.

### Añadido

- **Bloquear Zenit con la huella, la cara o el PIN del móvil** (Ajustes, desactivado por defecto) — lo pide al abrir la app; opcionalmente, también al volver a ella tras un rato fuera. Lo comprueba Android: Zenit no guarda ninguna contraseña ni dato biométrico
- **Ahorro y metas** (Más → Ahorro y metas) — guarda una cantidad cada mes o reúne una cantidad para una fecha, traspasándola a una cuenta o apartándola sin moverla. Cada mes se marca como conseguido, parcial o no conseguido
- **Disponible para gastar** en Inicio — cuánto te queda hasta fin de mes y cuánto al día
- **Aviso al superar un presupuesto**
- **Cuenta destino en categorías de traspaso, también hacia atrás** — p. ej. Cajero → Efectivo
- **Extractos con cabeceras en inglés** (Revolut, N26, Wise…)

### Corregido

- **Duplicados al importar extractos que se solapan** y pendientes del banco guardados sin saldo
- **Gastos fijos** — lo pagado o cobrado en varios movimientos ahora se suma y se ve el progreso
- **Cuentas** — los movimientos anteriores al primer extracto no salían en la evolución del saldo
- Restaurar una copia con gastos fijos fallaba
- Modo oscuro: algunos textos se oscurecían al tocarlos

### Cambiado

- La base de datos se prepara para sincronizar entre dispositivos en el futuro: se actualiza sola al abrir la app, con una copia de seguridad automática antes
