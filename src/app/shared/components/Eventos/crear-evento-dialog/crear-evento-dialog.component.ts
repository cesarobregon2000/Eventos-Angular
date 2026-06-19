import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { TextareaModule } from 'primeng/textarea';

import { CrearEventoService } from '../../../../core/services/Evento/crear-evento.service';
import { listarTipoEventoService } from '../../../../core/services/Evento/listar-tipo-evento';
import { TipoEvento } from '../../../../core/models/Evento/tipo-evento';
import { listarVenuesService } from '../../../../core/services/Evento/listar-venues';

@Component({
  selector: 'app-crear-evento-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    TextareaModule
  ],
  templateUrl: './crear-evento-dialog.component.html',
  styleUrl: './crear-evento-dialog.component.css'
})
export class CrearEventoDialogComponent implements OnInit {

  @Input() visible = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() eventoCreado = new EventEmitter<void>();

  tiposEvento: TipoEvento[] = [];
  tiposVenues: any[] = []; // Cambiado a dinámico o tu modelo de Venue correspondiente
  guardando = false;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private eventoService: CrearEventoService,
    private tipoEventoService: listarTipoEventoService,
    private venueService: listarVenuesService
  ) {
    // Inicialización alineada exactamente con los formControlName del HTML
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipoVenuesId: [null, Validators.required], // Mismo nombre que el HTML
      tipoEventoId: [null, Validators.required],
      capacidadMaxima: [0, [Validators.required, Validators.min(1)]],
      fechaInicio: [null, Validators.required],
      fechaFin: [null, Validators.required],
      precioEntrada: [0, Validators.required] // Agregado correctamente al grupo
    });
  }

  ngOnInit(): void {
    this.cargarTiposEvento();
    this.cargarVenues();
  }

  cargarTiposEvento(): void {
    this.tipoEventoService.listarTipoEventos().subscribe({
      next: (response: any) => {
        this.tiposEvento = response.data;
      },
      error: (err) => console.error('Error cargando tipos de evento:', err)
    });
  }

  cargarVenues(): void {
    this.venueService.listarVenues().subscribe({
      next: (response: any) => {
        this.tiposVenues = response.data;
      },
      error: (err) => console.error('Error cargando venues:', err)
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.guardando = true;
    const formValue = this.form.value;

    // Conversión de fechas al formato ISO string esperado por .NET
    const payload = {
      titulo: formValue.titulo,
      descripcion: formValue.descripcion,
      venue: Number(formValue.tipoVenuesId),
      tipo_evento_id: Number(formValue.tipoEventoId),
      capacidad_maxima: formValue.capacidadMaxima,
      fecha_inicio: new Date(formValue.fechaInicio).toISOString(),
      fecha_fin: new Date(formValue.fechaFin).toISOString(),
      precio_entrada: formValue.precioEntrada
    };

    this.eventoService.crearEvento(payload).subscribe({
      next: () => {
        this.guardando = false;
        this.eventoCreado.emit();
        this.cerrar();
      },
      error: (err) => {
      const backendError = err.error;

      let mensajeFinal = 'Ocurrió un error al guardar el evento.';

      if (backendError && backendError.Errors && backendError.Errors.length > 0) {
        mensajeFinal = backendError.Errors[0];
      } else if (backendError && backendError.Message) {
        mensajeFinal = backendError.Message;
      }

      alert(mensajeFinal);
    }
    });
  }

  cerrar(): void {
    this.visible = false;
    this.visibleChange.emit(false);
    this.form.reset({
      capacidadMaxima: 0,
      precioEntrada: 0
    });
  }
}
