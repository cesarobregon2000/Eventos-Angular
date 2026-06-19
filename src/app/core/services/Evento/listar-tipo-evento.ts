import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../models/result.model';
import { delay, Observable, of, tap } from 'rxjs';
import { TipoEvento } from '../../models/Evento/tipo-evento';

@Injectable({
  providedIn: 'root',
})
export class listarTipoEventoService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarTipoEventos(): Observable<Result<TipoEvento[]>> {
    return this.http.get<Result<TipoEvento[]>>(
      `${this.apiUrl}/Eventos/Listar-Tipo-Evento`
    );
  }



}
