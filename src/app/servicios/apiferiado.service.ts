import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiferiadoService {

  constructor(private http: HttpClient) { }

  obtenerFeriados(): Observable<any> {
    return this.http.get('https://apis.digital.gob.cl/fl/feriados');
  }
}