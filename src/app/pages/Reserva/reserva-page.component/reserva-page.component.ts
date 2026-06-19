import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaEventosComponent } from '../../../shared/components/Eventos/lista-eventos/lista-eventos.component';
import { CrearReservaComponent } from '../../../shared/components/Reservas/crear-reserva/crear-reserva.component';
import { ListaReservasComponent } from '../../../shared/components/Eventos/lista-reservas/lista-reservas.component';
import { ListaEvento } from '../../../core/models/Evento/lista-evento';
@Component({
  selector: 'app-reserva-page',
  standalone: true,
  imports: [CommonModule, ListaEventosComponent, CrearReservaComponent, ListaReservasComponent],
  templateUrl: './reserva-page.component.html'
})
export class ReservaPageComponent {
eventoSeleccionado: ListaEvento | null = null;
  manejarSeleccion(evento: ListaEvento): void {
    console.log('Objeto evento recibido:', evento);
    this.eventoSeleccionado = evento;
  }

  actualizarListaReservas(): void {
    console.log('Reserva realizada, recargando lista...');
  }
}
