import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button'; // <-- IMPORTANTE: Agregar esto
import { TooltipModule } from 'primeng/tooltip'; // <-- IMPORTANTE
import { ConfirmDialogModule } from 'primeng/confirmdialog'; // <-- IMPORTANTE
import { ConfirmationService } from 'primeng/api';
import { ListaReserva } from '../../../../core/models/Reserva/lista-reserva';
import { listarReservaService } from '../../../../core/services/Reserva/listar-reserva';
import { ConfirmarPagoService } from '../../../../core/services/Evento/confirmar-pago';
import { CancelarReservaService } from '../../../../core/services/Reserva/cancelar-reserva';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule, ButtonModule, TooltipModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './lista-reservas.component.html',
  styleUrl: './lista-reservas.component.css'
})
export class ListaReservasComponent implements OnChanges {
  @Input() eventoId!: number;
  reservas: ListaReserva[] = [];
  cargando = false;
@Input() permitirConfirmar: boolean = true;

  constructor(
    private reservaService: listarReservaService,
    private pagoService: ConfirmarPagoService,
    private cancelarService: CancelarReservaService,
    private confirmationService: ConfirmationService ,
    private router: Router
  ) {}

  get ocultarBotones(): boolean {
  // Oculta si la URL actual es '/reservas'
  return this.router.url.includes('/reservas');
}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['eventoId'] && this.eventoId) {
      this.obtenerReservas();
    }
  }

  obtenerReservas(): void {
    this.cargando = true;
    this.reservaService.listarReservas(this.eventoId.toString()).subscribe({
      next: (response) => {
        this.reservas = response.data ?? [];
        this.cargando = false;
      },
      error: (err) => {
        console.error(err);
        this.cargando = false;
      }
    });
  }


  getSeverity(estado: string): 'success' | 'warn' | 'danger' | 'info' {
    switch (estado.toLowerCase()) {
      case 'pagado': return 'success';
      case 'pendiente': return 'warn';
      case 'cancelado': return 'danger';
      default: return 'info';
    }
  }
mostrarModal = false;
mensajeModal = '';
tituloModal = '';

// Llama a esto desde tu botón en lugar de confirmationService

accionPendiente: () => Observable<any> = () => of(null);

abrirModal(titulo: string, mensaje: string, accion: () => Observable<any>) {
  this.tituloModal = titulo;
  this.mensajeModal = mensaje;
  this.accionPendiente = accion;
  this.mostrarModal = true;
}

ejecutarAccion() {
  this.accionPendiente().subscribe({
    next: () => {
      this.obtenerReservas();
      this.cerrarModal();
    },
    error: (err) => {
      const backendError = err.error;
      let mensajeFinal = 'Ocurrió un error al procesar la reserva.';
      if (backendError && backendError.errors && backendError.errors.length > 0) {
        mensajeFinal = backendError.errors[0];
      } else if (backendError && backendError.message) {
        mensajeFinal = backendError.message;
      } else if (err.status === 405) {
        mensajeFinal = "Error de método: No se pudo realizar la acción.";
      }

      alert(mensajeFinal); // O usa un Toast de PrimeNG para que se vea profesional
      this.cerrarModal();
    }
  });
}


cerrarModal() {
  this.mostrarModal = false;
}

confirmarPago(reservaId: number): void {
  this.abrirModal(
    'Confirmar Pago',
    '¿Está seguro de que desea confirmar el pago de esta reserva?',
    () => this.pagoService.confirmarPago(reservaId) // <-- SIN .subscribe() aquí
  );
}

cancelarReserva(reservaId: number): void {
  this.abrirModal(
    'Cancelar Reserva',
    '¿Está realmente seguro de que desea cancelar esta reserva?',
    () => this.cancelarService.CancelarReservaEvento(reservaId) // <-- SIN .subscribe() aquí
  );
}

}
