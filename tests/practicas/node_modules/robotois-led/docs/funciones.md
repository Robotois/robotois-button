# Otras Funciones
En esa librería se proporcionan funciones que pueden ser útilies para ciertas aplicaciones, en donde se requiera indicar alarmas o eventos ocurridos.


## Función `toggle()`

Esta función implementa el encendido y apagado del LED manera automática, es decir que no se requiere especificar el estado del LED, sino que de manera automática se cambia el estado actual de éste. Esta función puede ser usada de la siguiente manera:

```javascript
// Encender y apagar cada segundo
setInterval(() => {
  led.toggle();
}, 1000);
```

## Función `blink()`
Esta función habilita/deshabilita el parpadeo del LED, es decir que de manera desatendida el LED puede estar parpadeando hasta cuando ésta funcionalidad sea deshabilitada. El siguiente ejemplo muestra cómo puede utilizarse esta función:

```javascript
led.blink(true);

setTimeout(() => {
  led.blink(false);
}, 5000);
```
