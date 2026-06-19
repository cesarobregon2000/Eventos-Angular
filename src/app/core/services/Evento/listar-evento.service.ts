import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Result } from '../../models/result.model';
import { ListaEvento } from '../../models/Evento/lista-evento';

@Injectable({
  providedIn: 'root',
})
export class listarEventoService {
  private apiUrl: string = environment.apiUrl;
  
  private eventoCreadoSource = new Subject<void>();
  eventoCreado$ = this.eventoCreadoSource.asObservable();

  constructor(private http: HttpClient) {}

  notificarEventoCreado() {
    this.eventoCreadoSource.next();
  }

  listarEventos(): Observable<Result<ListaEvento[]>> {
    return this.http.get<Result<ListaEvento[]>>(`${this.apiUrl}/Eventos/Listar-Eventos`);
  }

  listarEventoPorId(eventoId: number): Observable<Result<ListaEvento>> {
    return this.http.get<Result<ListaEvento>>(`${this.apiUrl}/Eventos/Listar-Eventos-Id/${eventoId}`);
  }
}