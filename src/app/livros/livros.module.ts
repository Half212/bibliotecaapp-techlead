import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";

import { LivrosRoutingModule } from './livros-routing.module';
import { LivrosFormComponent } from './livros-form/livros-form.component';
import { LivrosListaComponent } from './livros-lista/livros-lista.component';


@NgModule({
  declarations: [
    LivrosFormComponent,
    LivrosListaComponent
  ],
  imports: [
    CommonModule,
    LivrosRoutingModule,
    FormsModule
  ], exports: [
    LivrosFormComponent,
    LivrosListaComponent
  ]
})
export class LivrosModule { }
