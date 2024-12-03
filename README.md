# Proyecto API RESTful - Superintendencia de Bancos

Este proyecto consiste en el desarrollo de una API RESTful para la Superintendencia de Bancos de la República Dominicana, siguiendo las especificaciones técnicas proporcionadas. El frontend ha sido desarrollado en **React**, implementando la arquitectura de carpetas mostrada a continuación:

## Arquitectura del Frontend

```
src/
│
├── assets/         # Archivos estáticos (imágenes, estilos, etc.)
├── components/     # Componentes reutilizables
├── service/        # Lógica de negocio y conexión con la API
└── views/          # Vistas principales de la aplicación
```

## Especificaciones Técnicas del Backend

### Lenguaje y Framework
- **Lenguaje:** C#
- **Framework:** .NET 8

### Arquitectura
- Onion Architecture:
  - **Infraestructura**
  - **Aplicación**
  - **Servicios**
  - **Dominio**

### Características
- **Base de datos:** Archivo de texto plano.
- **Manejo de logs:** Serilog/log4net.
- **Documentación:** Generada automáticamente con Swagger.
- **Manejo de excepciones:** Implementación básica.
- **Autenticación:** Bearer Token con JWT.

### Requerimientos de Nomenclatura
- Clases, métodos, propiedades y enums en **PascalCase**.
- Variables locales y parámetros en **camelCase**.
- Constantes en **MAYÚSCULAS**.
- Interfaces deben iniciar con la letra `I`.

## Objetivo del Proyecto

Desarrollar una API RESTful que permita el mantenimiento y listado de las entidades gubernamentales de la República Dominicana. La base de datos utilizada está contenida dentro del proyecto en formato de archivo de texto plano.

## Entrega

El proyecto ha sido entregado a través de un repositorio Git, siguiendo las mejores prácticas de desarrollo.

