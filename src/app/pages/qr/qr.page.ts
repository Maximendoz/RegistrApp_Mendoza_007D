import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/servicio.service';
import { IPalabra } from '../interfaces/interfaces';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  public mensaje: string;

  useremail: any;
  anno: any;
  semestre: any;
  asignatura: any;

  data={
    texto:''
  }
  
  newPalabra: IPalabra={
    palabra: '',
    useremail: '',
    anno: 0,
    semestre: '',
    asignatura: ''
  }

  constructor(private authServis: AuthService, 
    private alertcontroller: AlertController,
    private router: Router) { 
      this.mensaje = 'Hola Mundo';
    }

  ngOnInit() {
    this.anno = sessionStorage.getItem('anno');
    this.semestre = sessionStorage.getItem('semestre');
    this.asignatura = sessionStorage.getItem('asignatura');
    this.useremail = sessionStorage.getItem('useremail');
  }

  generarQr(){
    this.mensaje = this.data.texto;
    this.newPalabra.useremail=this.useremail;
    this.newPalabra.anno=this.anno;
    this.newPalabra.semestre=this.semestre;
    this.newPalabra.asignatura=this.asignatura;
    this.newPalabra.palabra=this.mensaje;
    this.authServis.CrearPalabra(this.newPalabra).subscribe();
    this.mostrarMensaje();
    this.data.texto='';
  }

  async mostrarMensaje(){
    const alerta= await this.alertcontroller.create({ 
      header:'Palabra Creada',
      message: 'Su Qr ha sido almacenado',
      buttons: ['Ok']
    });
    alerta.present();
  }

}
