# Frontend - Sistema de Reservas "Eventos Vivos"

## Descripción
Interfaz de usuario desarrollada para interactuar con la API de reservas, cumpliendo con estándares de diseño responsivo y moderno.

## Tecnologías
**Framework:** Angular 18+ 

## Interfaz de Usuario

Gestion Eventos
<img width="2852" height="1508" alt="Gestion Eventos" src="https://github.com/user-attachments/assets/bc697f45-0b75-4344-97e6-bff8e9c2169b" />

Crear Evento
<img width="2868" height="1514" alt="Crear Evento" src="https://github.com/user-attachments/assets/3596a0a4-b420-4890-a936-0e6a5a1fe97a" />

Crear Reserva
<img width="2854" height="1502" alt="Crear Reserva" src="https://github.com/user-attachments/assets/8aef3a44-b771-4b09-9d72-8b2ddf219e8d" />

Reporte Eventos
<img width="2856" height="1524" alt="Reporte Eventos" src="https://github.com/user-attachments/assets/fb797c1d-a4cf-4ce4-a760-4e4ada2d8f61" />


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

##TiPS
si borro node moduls y da error en consola dentro de la carpeta del proyecto
npm install --save-dev @types/jasmine
npm install
