import { Routes, RouterModule } from "@angular/router";
import { UsuarioCadastroComponent } from './usuario-cadastro/usuario-cadastro.component';
import { NgModule } from '@angular/core';
import { UsuarioFiltroComponent } from './usuario-filtro/usuario-filtro.component';

const routes: Routes = [
    {
        path: 'inserir',
        component: UsuarioCadastroComponent
    },
    {
        path: '',
        component: UsuarioFiltroComponent
    }
];

@NgModule({
        imports: [ RouterModule.forChild(routes)],
        exports: [RouterModule]
})
export class UsuarioRoutingModule { }