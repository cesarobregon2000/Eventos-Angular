import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { EventosPageComponent } from './pages/Evento/eventos-page.component/eventos-page.component';
import { ReservaPageComponent } from './pages/Reserva/reserva-page.component/reserva-page.component';
import { ReporteEventoComponent } from './pages/Reportes/reporte-evento.component/reporte-evento.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: InicioComponent },
      { path: 'eventos', component: EventosPageComponent },
     { path: 'reservas', component: ReservaPageComponent },
     { path: 'reporte', component: ReporteEventoComponent }
],
   },
];
