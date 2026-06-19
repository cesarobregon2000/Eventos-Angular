import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ListaEvento } from '../../../../core/models/Evento/lista-evento';
import { listarEventoService } from '../../../../core/services/Evento/listar-evento.service';

@Component({
  selector: 'app-detalle-evento',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detalle-evento.component.html',
  styleUrl: './detalle-evento.component.css'
})
export class DetalleEventoComponent implements OnChanges {

  @Input() eventoId!: number;

  evento?: ListaEvento;

  cargando = false;

  constructor(
    private eventoService: listarEventoService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {

    if (
      changes['eventoId'] &&
      this.eventoId
    ) {
      this.obtenerEvento();
    }

  }

 obtenerEvento(): void {
  this.cargando = true;

  this.eventoService
    .listarEventoPorId(this.eventoId)
    .subscribe({
      next: (response: any) => {
        // SOLUCIÓN: Si data es un array, toma el primer índice [0], si es un objeto utilízalo directo
        if (response && response.data) {
          this.evento = Array.isArray(response.data) ? response.data[0] : response.data;
        } else {
          this.evento = undefined;
        }
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando detalle:', err);
        this.cargando = false;
      }
    });
}

}
