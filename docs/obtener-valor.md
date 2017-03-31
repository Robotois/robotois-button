# Obtener estado actual del botón
La función `getValue()` obtiene el estado actual del botón, lo cual retorna el valor `0` y `1`, cuando el botón no está presionado y cuando está presionado, respectivamente.

Un ejemplo básico sería:

```javascript
setInterval(() => {
  console.log("Estado: " + button.getValue());
}, 100);
```
