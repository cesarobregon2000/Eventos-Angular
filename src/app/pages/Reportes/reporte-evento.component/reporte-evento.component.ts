import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { ReporteEvento } from '../../../core/models/Evento/reporte-evento';
import { ReporteEventoService } from '../../../core/services/Evento/reporte-evento';

@Component({
  selector: 'app-reporte-evento',
  standalone: true,
  imports: [CommonModule, TableModule, TagModule],
  templateUrl: './reporte-evento.component.html',
  styleUrl: './reporte-evento.component.css',
})
export class ReporteEventoComponent implements OnInit {
  eventos: ReporteEvento[] = [];
  loading = false;

  constructor(private reporteService: ReporteEventoService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.loading = true;

    this.reporteService.obtenerReporte().subscribe({
      next: (resp) => {
        if (resp.isSuccess) {
        this.eventos = resp.data as ReporteEvento[];        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }
}
