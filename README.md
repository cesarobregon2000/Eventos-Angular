# Frontend - Sistema de Reservas "Eventos Vivos"

## Descripción
Interfaz de usuario desarrollada para interactuar con la API de reservas, cumpliendo con estándares de diseño responsivo y moderno.

## Tecnologías
**Framework:** Angular 18+ 

## Diagramas de Proceso
A continuación, se detalla el flujo lógico del sistema para la gestión de reservas:
<img width="1178" height="237" alt="Crear Reserva" src="https://github.com/user-attachments/assets/6cee59f4-27aa-4e94-8ddb-79fd1d5c7bfb" />
<img width="1178" height="345" alt="Confirmar Pago" src="https://github.com/user-attachments/assets/3245a3a3-0ced-4d0e-8bdf-8e3a1a172872" />
<img width="760" height="1078" alt="Cancelar Reserva" src="https://github.com/user-attachments/assets/b873d348-2f5f-4770-9428-c5c40e7f900f" />
<img width="1178" height="1094" alt="Crear Evento" src="https://github.com/user-attachments/assets/6145083c-8a58-41ed-8819-395f323eb7be" />

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
