import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/servicio.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  
  id: any;

  constructor(public AuthService: AuthService,
    private router: Router,
    private menuController: MenuController,
  ) { this.ObtainStorage(); }

  ionViewWillEnter() {
    this.id = sessionStorage.getItem('id');
  }

  getIdFromUrl() {
    let url = this.router.url;
    console.log('URL:', url);

    let arr = url.split("/", 3);
    console.log('Array después de la división:', arr);

    let id = parseInt(arr[2]);
    console.log('ID obtenido:', id);

    return id;
  }

  ngOnInit() {

  }

  Users= {
    nombre: '',
    apellido: ''
  }

  ObtainStorage() {
    let nombre = sessionStorage.getItem("nombre");
    let apellido = sessionStorage.getItem("apellido");

    if (nombre) {
      this.Users.nombre = nombre;
    }

    if (apellido) {
      this.Users.apellido = apellido;
    }
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

}
