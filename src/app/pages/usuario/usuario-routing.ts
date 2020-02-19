import { Routes, RouterModule } from "@angular/router";
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    {
        path: '',
        component: UsuarioCadastroComponent
    }];

@NgModule({
        imports: [ RouterModule.forChild(routes)],
        exports: [RouterModule]
})
export class UsuarioRoutingModule { }