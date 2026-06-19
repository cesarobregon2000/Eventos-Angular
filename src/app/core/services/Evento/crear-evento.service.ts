import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../models/result.model';
import { delay, Observable, of, tap } from 'rxjs';
import { EventoResponse } from '../../models/Evento/crear-Evento/crear-evento';

@Injectable({
  providedIn: 'root',
})
export class CrearEventoService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

 crearEvento(data: {
    titulo: string;
    descripcion: string;
    venue: number;
    tipo_evento_id: number;
    capacidad_maxima: number;
    fecha_inicio: string;
    fecha_fin: string;
    precio_entrada: number;
  }): Observable<EventoResponse> {

    return this.http.post<EventoResponse>(
      `${this.apiUrl}/Eventos/Crear-Evento`,
      data
    );
  }
}


