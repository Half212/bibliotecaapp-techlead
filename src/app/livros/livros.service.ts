import { HttpClient } from '@angular/common/http';
import { ReturnStatement } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth.service';
import { Livro } from './livro';
@Injectable({
  providedIn: 'root'
})
export class LivrosService {

  apiURLBase: string = environment.apiURLBase + '/api/livros';

  constructor(private http: HttpClient,
    private authService: AuthService) 
  {}

  salvar(livro: Livro): Observable<Livro> {
    livro.usuarioEmail = this.authService.getUsuarioAutenticado();
    return this.http.post<Livro>(`${this.apiURLBase}`, livro);
  }

  atualizar(livro: Livro): Observable<any> {
    return this.http.put<any>(`${this.apiURLBase}/${livro.id}`, livro);
  }

  deletar(livro: Livro) : Observable<any>{
    return this.http.delete(`${this.apiURLBase}/${livro.id}`);
  }
  
  getLivros() : Observable<Livro[]> {
    return this.http.get<Livro[]>(this.apiURLBase);
  }

  getLivroById(id: number) : Observable<Livro> {
    return this.http.get<Livro>(`${this.apiURLBase}/${id}`);

  }

}
