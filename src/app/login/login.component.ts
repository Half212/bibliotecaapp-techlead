import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nome: string;
  email: string;
  senha: string;
  mensagemSucesso: string;
  cadastrando: boolean;
  errors: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onSubmit() {
    this.authService
          .tentarLogar(this.email, this.senha)
          .subscribe( response =>{
            const access_token = JSON.stringify(response);
            localStorage.setItem('access_token', access_token);

            const helper = new JwtHelperService();
            const decodedToken = helper.decodeToken(access_token);
      
            sessionStorage.setItem('authorities', decodedToken.authorities);
            sessionStorage.setItem('usuarioEmail', decodedToken.user_name);
            this.router.navigate(['/home'])
          }, errorResponse =>{
            this.errors = ['Usuario e/ou senha incorretos.']
          })
  }

  preparaCadastrar(event:any){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro(){
    this.cadastrando = false;
  }

  cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.nome = this.nome;
    usuario.perfil = "CLIENTE";
    usuario.email = this.email;
    usuario.senha = this.senha;

    this.authService.salvar(usuario)
      .subscribe(response => {
        this.mensagemSucesso = "Usuário cadastrado com sucesso! Efetue o login.";
        this.errors = [];
        this.cadastrando = false;
        this.email='';
        this.senha='';
        this.nome='';
      }, errorResponse =>{
        this.mensagemSucesso = '';
        this.errors = errorResponse.error.errors;
      });
  }


}
