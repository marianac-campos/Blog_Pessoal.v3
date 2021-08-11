import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../model/UserLogin';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getByIdUser(id: number): Observable<User> {
    return this.http.get<User>(`https://blogcplus.herokuapp.com/usuario/${id}`)
  }

  entrar(userLogin: UserLogin): Observable<UserLogin> {
    return this.http.post<UserLogin>('https://blogcplus.herokuapp.com/usuario/logar', userLogin)
  }

  cadastrar(user: User): Observable<User> {
    return this.http.post<User>('https://blogcplus.herokuapp.com/usuario/cadastrar', user)
  }

  logado() {
    let ok = false

    if (environment.token != '') {
      ok = true
    }

    return ok
  }

  adm() {
    let ok = false

    if (environment.tipo == 'adm') {
      ok = true
    }

    return ok
  }

  atualizar(user: User): Observable<User> {
    return this.http.put<User>('https://blogcplus.herokuapp.com/usuario/alterar', user)
  }
}
