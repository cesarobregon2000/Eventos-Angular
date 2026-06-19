import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';

import { ListaEventosComponent } from '../../../shared/components/Eventos/lista-eventos/lista-eventos.component';
import { DetalleEventoComponent } from '../../../shared/components/Eventos/detalle-evento/detalle-evento.component';
import { ListaReservasComponent } from '../../../shared/components/Eventos/lista-reservas/lista-reservas.component';
import { CrearEventoDialogComponent } from '../../../shared/components/Eventos/crear-evento-dialog/crear-evento-dialog.component';
import { listarEventoService } from '../../../core/services/Evento/listar-evento.service'; // <-- Importa el servicio aquí en el padre
@Component({
  selector: 'app-eventos-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ListaEventosComponent,
    DetalleEventoComponent,
    ListaReservasComponent,
    CrearEventoDialogComponent
  ],
  templateUrl: './eventos-page.component.html',
  styleUrl: './eventos-page.component.css'
})
export class EventosPageComponent {
  eventoSeleccionadoId = 0;
  mostrarCrearEvento = false;

  // Inyectas el servicio en el padre también
  constructor(private eventoService: listarEventoService) {}

  seleccionarEvento(eventoId: number): void {
    this.eventoSeleccionadoId = eventoId;
  }

  abrirModalCrearEvento(): void {
    this.mostrarCrearEvento = true;
  }

  eventoCreado(): void {
    // SOLUCIÓN: En lugar de usar ViewChild, disparas el aviso global
    this.eventoService.notificarEventoCreado();
  }
}