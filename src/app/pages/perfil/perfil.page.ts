import { Component, OnInit } from '@angular/core';
import { MenuController, } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  usuario = {
    id:'',
    nombre:'',
    apellido:'',
    password:'',
    useremail:'',
    jornada:'',
    role:'',
    isactive: false
  }

  constructor(
    private auth:AuthService,
    private router:Router,
    private menuController:MenuController,
    
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUsuarioById(this.getIdFromUrl());
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

  getUsuarioById(pasajeroid:number){
    this.auth.BuscarUsuarioId(pasajeroid).subscribe(
      (resp:any)=>{                 //resp llega en formato de arreglo de un objeto 
        this.usuario={
          id: resp[0].id,
          nombre: resp[0].nombre,
          apellido: resp[0].apellido,
          password: resp[0].password,
          useremail: resp[0].useremail,
          jornada: resp[0].jornada,
          role: resp[0].role,
          isactive: resp[0].isactive
        }
      }
    )
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

}
