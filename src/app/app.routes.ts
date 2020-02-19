import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'usuario', pathMatch: 'full'},

    { path: 'usuario',
            loadChildren: () => import('./pages/usuario/usuario.module')
            .then(m => m.UsuarioModule)},

    { path: '**', component: NotFoundComponent }
];

@NgModule({
   imports: [
       RouterModule.forRoot(rootRouterConfig)
   ],
   exports: [
       RouterModule
   ]
})
export class AppRoutingModule { }