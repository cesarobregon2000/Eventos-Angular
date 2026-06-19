# Frontend - Sistema de Reservas "Eventos Vivos"

## Descripción
Interfaz de usuario desarrollada para interactuar con la API de reservas, cumpliendo con estándares de diseño responsivo y moderno.

## Tecnologías
**Framework:** Angular 18+ [cite: 98]

## Instrucciones de ejecución
1. Asegúrate de tener instalado Node.js y Angular CLI.
2. Navega a la carpeta del proyecto y descarga las dependencias:
   `npm install`
3.Configuración de la API
Para que la aplicación pueda comunicarse con el backend, debes configurar la URL de la API. Edita el archivo `src/environments/environment.ts` (o `environment.development.ts`) y define la ruta de tu API local:

```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:0000/api/v1.0' // Ajusta este puerto al puerto donde corra tu API de .NET
};
4. Ejecuta la aplicación:
   `ng serve -o`
5. Accede a `http://localhost:4200` en tu navegador.
