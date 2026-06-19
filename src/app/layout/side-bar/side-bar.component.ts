import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router'; // <-- REQUERIDO para routerLink

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterModule], // <-- Vincula aquí el módulo de rutas
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {
  menuFiltrado = computed(() => [
    { label: 'Inicio', icon: 'pi pi-home', route: '/' },
    { label: 'Eventos', icon: 'pi pi-calendar', route: '/eventos' },
        { label: 'reservas', icon: 'pi pi-bookmark', route: '/reservas' },
            { label: 'reporte', icon: 'pi pi-table', route: '/reporte' },
  ]);
}
