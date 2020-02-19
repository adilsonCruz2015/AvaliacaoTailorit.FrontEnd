import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { UsuarioRoutingModule } from './usuario-routing';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UsuarioCadastroComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    ReactiveFormsModule
  ]
})
export class UsuarioModule { }
