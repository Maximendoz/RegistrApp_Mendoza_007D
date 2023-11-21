import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/servicio.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {

  usuario = {
    id: 0,
    nombre: '',
    apellido: '',
    useremail: '',
    password: '',
    jornada: '',
    role: '',
    anno: '',
    semestre: '',
    asignatura: '',
    isactive: false
  }

  constructor(private apiCrud: AuthService, 
    private router: Router,
    private alertcontroller: AlertController) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUsuarioId(this.getIdFromUrl());
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

  getUsuarioId(usuarioID:number){
    this.apiCrud.BuscarUsuarioId(usuarioID).subscribe(
      (resp:any)=>{
        console.log(resp);
        this.usuario={
          id: resp[0].id,
          nombre: resp[0].nombre,
          apellido: resp[0].apellido,
          useremail: resp[0].useremail,
          password: resp[0].password,
          jornada: resp[0].jornada,
          role: resp[0].role,
          anno: resp[0].anno,
          semestre: resp[0].semestre,
          asignatura: resp[0].asignatura,
          isactive: resp[0].isactive
        }
      }
    )
  }

  updateUsuario(){
    this.apiCrud.ActualizarUsuario(this.usuario).subscribe();
    this.mostrarMensaje();
    this.router.navigate(['/perfil', this.usuario.id]);
  }

  async mostrarMensaje(){
    const alerta = await this.alertcontroller.create({
      header: 'Usuario Actualizado ',
      message: 'Su información se ha modificado ',
      buttons: ['OK']
    });
    alerta.present();
  }
}
