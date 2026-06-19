import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CrearReservaService } from '../../../../core/services/Reserva/crear-reserva.service';

@Component({
  selector: 'app-crear-reserva',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-reserva.component.html'
})
export class CrearReservaComponent {

  constructor(private reservaService: CrearReservaService) {}

  private _eventoSeleccionado: any;

@Input()
  set eventoSeleccionado(evento: any) {
    this._eventoSeleccionado = evento;
    if (evento) {
      this.reserva.eventO_ID = evento.eventoID;
      console.log('ID asignado correctamente:', this.reserva.eventO_ID);
    }
  }

  get eventoSeleccionado(): any {
    return this._eventoSeleccionado;
  }

  @Output() reservaCreada = new EventEmitter<any>();

  reserva = {
    eventO_ID: 0,
    nombre: '',
    email: '',
    cantidad: 1
  };

  cancelar() {
    this.reserva = { eventO_ID: this._eventoSeleccionado?.id || 0, nombre: '', email: '', cantidad: 1 };
  }

guardarReserva() {
  const dataToSend = {
    eventO_ID: this.reserva.eventO_ID,
    nombre: this.reserva.nombre,
    email: this.reserva.email,
    cantidad: this.reserva.cantidad
  };

  this.reservaService.crearReserva(dataToSend).subscribe({
    next: (response) => {
      alert('Reserva guardada con éxito');
      this.reservaCreada.emit();
    },
    error: (err) => {
      const backendError = err.error;

      let mensajeFinal = 'Ocurrió un error al guardar la reserva.';

      if (backendError && backendError.Errors && backendError.Errors.length > 0) {
        mensajeFinal = backendError.Errors[0];
      } else if (backendError && backendError.Message) {
        mensajeFinal = backendError.Message;
      }

      alert(mensajeFinal);
    }
  });
}

}

