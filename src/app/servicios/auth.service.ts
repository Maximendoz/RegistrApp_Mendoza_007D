import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Users } from '../pages/interfaces/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  //devuelve todos los objetos de tipo users almacenados en data
  GetAllUsers():Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios`);
  }

  //obtenemos un observable de acuerdo al username ingresado en login
  GetUserById(codigo:any):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?useremail=${codigo}`);
  }

  GetUserId(codigo:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${codigo}`);
  }

  crearUsuario(newUsuario: Users):Observable<Users>{
    return this.httpclient.post<Users>(`${environment.apiUrl}/usuarios`, newUsuario);
  }

  IsLogged(){
    return sessionStorage.getItem('useremail')!=null;
  }

  BuscarUsuarioId(id:number):Observable<Users>{
    return this.httpclient.get<Users>(`${environment.apiUrl}/usuarios/?id=${id}`);
  }

  ActualizarUsuario(usuario:any):Observable<Users>{
    return this.httpclient.put<Users>(`${environment.apiUrl}/usuarios/${usuario.id}`, usuario);
  }
}
