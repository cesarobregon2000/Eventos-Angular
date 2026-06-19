import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../models/result.model';
import { delay, Observable, of, tap } from 'rxjs';
import { ReporteEvento } from '../../models/Evento/reporte-evento';

@Injectable({
  providedIn: 'root',
})
export class ReporteEventoService  {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  obtenerReporte(): Observable<Result<ReporteEvento[]>> {
    return this.http.get<Result<ReporteEvento[]>>(
      `${this.apiUrl}/Eventos/reporte-eventos`
    );
  }



}
