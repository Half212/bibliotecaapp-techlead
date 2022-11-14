import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { LivrosService } from 'src/app/livros/livros.service';
import { Livro } from '../livro';

@Component({
  selector: 'app-livros-lista',
  templateUrl: './livros-lista.component.html',
  styleUrls: ['./livros-lista.component.css']
})
export class LivrosListaComponent implements OnInit {

  livros: Livro[] = [];
  usuarioLogado: string;
  authorities: string;

  constructor(
    private livroService: LivrosService,
     private router: Router) {}

  ngOnInit(): void {
    this.livroService.getLivros()
    .subscribe(response => this.livros = response);

    this.usuarioLogado = sessionStorage.getItem('usuarioEmail')!;

    this.authorities = sessionStorage.getItem('authorities')!;

  }

  novoCadastro(){
    this.router.navigate(['/livros/form']);
  }

}
