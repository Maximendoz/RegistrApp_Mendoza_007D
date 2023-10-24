import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  usuarios= {
  id:0,
  nombre: '',
  apellido: '',
  useremail: '',
  password: '',
  confirmacionPassword: '',
  jornada: '',
  role: '',
  isactive: true}

  constructor(private authService: AuthService,
    private router: Router,
    private menuController: MenuController
    ) { }

  ngOnInit() {

  }
  ionViewWillEnter(){
  this.GetUserById(this.getIdFromUrl());
  }

  getIdFromUrl(){
    let url=this.router.url;
    let arr=url.split("/",3);
    let id = parseInt(arr[2]);
    return id;
  }

  GetUserById(usuarioId:number){
    this.authService.BuscarUsuarioId(usuarioId).subscribe(
      (resp:any)=>{
        this.usuarios={
          id:resp[0].id,
          nombre:resp[0].nombre,
          apellido:resp[0].apellido,
          useremail:resp[0].useremail,
          password:resp[0].password,
          confirmacionPassword:resp[0].confirmacionPassword,
          jornada:resp[0].jornada,
          role:resp[0].role,
          isactive: true
        }
      }
    )
  }

  mostrarMenu() {
    this.menuController.open('first');
  }

}
