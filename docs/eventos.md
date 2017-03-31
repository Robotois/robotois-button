# Eventos del botón

Esta librería cuenta con un sistema que dispara eventos cuando el estado del botón ha cambiado, es decir, que se disparará un evento cuando el botón ha sido presionado y cuando ha sido liberado. De esta manera se puede ejecutar alguna acción para cada caso. Estos eventos se deben habilitar usando la función `enableEvents()`.

El siguiente ejemplo muestra la manera en que se puede utilizar dicho evento:

```javascript
button.enableEvents();

button.on('change',(estado) => {
  console.log(`Estado del Botón: ${estado}`);
});
```
