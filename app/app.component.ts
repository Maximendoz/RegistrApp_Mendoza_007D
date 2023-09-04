import { Component } from '@angular/core';

interface Componente {
  name: string;
  icon: string;
  redirectTo: string;
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  componentes: Componente[]=[

    {
      name: 'Inicio',
      icon: 'home',
      redirectTo: '/inicio'
    },
    {
      name: 'Login',
      icon: 'person-circle',
      redirectTo: '/login'
    },
    {
      name: 'Registro',
      icon: 'person-add',
      redirectTo: '/registro'
    },
    {
      name: 'Info',
      icon: 'bookmark',
      redirectTo: '/info'
    },
  ]

  constructor() {}
  
}
