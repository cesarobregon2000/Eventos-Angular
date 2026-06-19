import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Result } from '../../models/result.model';
import { delay, Observable, of, tap } from 'rxjs';
import { ListaVenues } from '../../models/Evento/lista-venues';

@Injectable({
  providedIn: 'root',
})
export class listarVenuesService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  listarVenues(): Observable<Result<ListaVenues[]>> {
    return this.http.get<Result<ListaVenues[]>>(
      `${this.apiUrl}/Eventos/listar-venues`
    );
  }



}
