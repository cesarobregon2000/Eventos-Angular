import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../models/result.model';
import { delay, Observable, of, tap } from 'rxjs';
import { EventoResponse } from '../../models/Evento/crear-Evento/crear-evento';

@Injectable({
  providedIn: 'root',
})
export class CancelarReservaService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  CancelarReservaEvento(id: number): Observable<EventoResponse> {
    return this.http.post<EventoResponse>(
      `${this.apiUrl}/Reservas/cancelar-reserva/${id}`,
      {}
    );
  }
}
