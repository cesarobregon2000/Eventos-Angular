import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../models/result.model';
import { delay, Observable, of, tap } from 'rxjs';
import { ListaReserva } from '../../models/Reserva/lista-reserva';

@Injectable({
  providedIn: 'root',
})
export class listarReservaService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

 listarReservas(eventoId: string): Observable<Result<ListaReserva[]>> {
    return this.http.get<Result<ListaReserva[]>>(
      `${this.apiUrl}/Reservas/Listar-Reservas/${eventoId}`
    );
  }
}
