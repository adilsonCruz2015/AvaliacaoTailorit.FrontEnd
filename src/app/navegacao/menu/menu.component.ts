import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  {

  nav: Nav[] = [
    {
      link: 'usuario',
      name: 'Cadastro de Usuário',
      exact: true,
      admin: true
    }
  ];
}

interface Nav {
  link: string;
  name: string;
  exact: boolean;
  admin: boolean;
}
