import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LivrosService } from 'src/app/livros/livros.service';

import { Livro } from "../livro";

@Component({
  selector: 'app-livros-form',
  templateUrl: './livros-form.component.html',
  styleUrls: ['./livros-form.component.css']
})
export class LivrosFormComponent implements OnInit {

  livro: Livro;
  livroSelecionado: Livro;
  success: boolean = false;
  errors: String[];
  mensagemSucesso: string;
  mensagemErro: string;
  id: number;

  constructor(
    private livroService: LivrosService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.livro = new Livro();
   }

  ngOnInit(): void {
    
    let params = this.activatedRoute.params
    params.subscribe(x => {
      if (x && x.id) {
          this.livroService.getLivroById(x.id).subscribe(
            response => this.livro = response,
            errorResponse => this.livro = new Livro()
          );
      }
  });
  
  }

  voltarParaListagem(){
    this.router.navigate(['/livros/lista']);
  }

  preparaDeletarLivro(livro: Livro){
    this.livroSelecionado = livro;
  }

  deletarLivro (livro: Livro){
    this.livroService.deletar(this.livroSelecionado)
      .subscribe(response => {
        this.mensagemSucesso = 'Livro deletado com sucesso.';
        this.voltarParaListagem();
        return this.mensagemSucesso;
      }, erro => this.mensagemErro = 'Ocorreu um erro ao deletar o livro.'
    )

  }

  onSubmit(){

    if (this.livro.id) {
      this.livroService.atualizar(this.livro)
      .subscribe(response =>{
        this.success = true;
        this.errors = [];
        this.voltarParaListagem();
      }, errorResponse => {
        this.errors = ['Erro ao atualizar o livro.']
      })
      
    } else {
      this.livroService
      .salvar(this.livro)
      .subscribe( response =>{
      this.success = true;
      this.errors = [];
      this.voltarParaListagem();
      } , errorResponse => {
        this.success = false;
        this.errors = errorResponse.error.errors;
      })

    }
  }

}
