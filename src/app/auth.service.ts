import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + "/api/usuarios"
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  usuario: Usuario;
  jwtHelper: JwtHelperService = new JwtHelperService;

  constructor(
    private http: HttpClient
  ) { }

  obterToken(){
    const tokenString = localStorage.getItem('access_token')
    if (tokenString) {
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  encerrarSessao(){
    localStorage.removeItem('access_token')
    sessionStorage.removeItem('usuarioEmail')
    sessionStorage.removeItem('authorities')
  }

  getUsuarioAutenticado() {
    const token = this.obterToken();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario;
    } 
    return null;
  }

  isAuthenticated() : boolean {
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false;
  }

  salvar(usuario: Usuario) : Observable<any> {
    return this.http.post<any>(this.apiURL, usuario);
  }

  tentarLogar(email: string, senha: string) : Observable<any> {
    const params = new HttpParams()
                    .set('username', email)
                    .set('password', senha)
                    .set('grant_type', 'password')

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.tokenURL, params.toString(), { headers } )
  }

}
