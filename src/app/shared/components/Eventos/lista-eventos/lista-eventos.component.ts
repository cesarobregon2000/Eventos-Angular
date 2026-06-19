import { Component, EventEmitter, OnInit, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { listarEventoService } from '../../../../core/services/Evento/listar-evento.service';
import { ListaEvento } from '../../../../core/models/Evento/lista-evento';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-eventos.component.html',
  styleUrl: './lista-eventos.component.css'
})
export class ListaEventosComponent implements OnInit, OnDestroy {

@Output() eventoSeleccionado = new EventEmitter<ListaEvento>();

  eventos: ListaEvento[] = [];
  eventoActivo: number | null = null;

  private suspensoSub!: Subscription;

  constructor(private eventoService: listarEventoService) {}

  ngOnInit(): void {
    this.cargarEventos();

    // Escucha automática cuando el componente padre avisa que se creó un evento
    this.suspensoSub = this.eventoService.eventoCreado$.subscribe(() => {
      this.cargarEventos();
    });
  }

  ngOnDestroy(): void {
    if (this.suspensoSub) {
      this.suspensoSub.unsubscribe();
    }
  }

  cargarEventos(): void {
    this.eventoService.listarEventos().subscribe({
      next: (response: any) => {
        console.log('Estructura recibida de .NET:', response);

        // Mapea directamente el response.data de tu JSON exitoso
        if (response && response.data) {
          this.eventos = response.data;
        } else {
          this.eventos = [];
        }
      },
      error: (err) => {
        console.error('Error al conectar con la API de .NET:', err);
      }
    });
  }

  seleccionarEvento(evento: ListaEvento): void {
   this.eventoActivo = evento.eventoID;
  this.eventoSeleccionado.emit(evento);
  }

  getEstadoClass(estado: string): string {
    switch (estado?.toUpperCase()) {
      case 'ACTIVO':
        return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'INACTIVO':
        return 'bg-rose-100 text-rose-800 border border-rose-200';
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200';
    }
  }
}
