import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  componentes: Componente[] = [

    {
      name: 'Inicio',
      icon: 'home',
      redirectTo: '/inicio'
    },
    {
      name: 'Info',
      icon: 'bookmark',
      redirectTo: '/info'
    }


  ]

  constructor(private router: Router) { }

  public logout() {
    sessionStorage.removeItem('useremail');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('ingresado');
    this.router.navigateByUrl('/login');
  }
  

}
