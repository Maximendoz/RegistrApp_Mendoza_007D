import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(private alertController: AlertController, public formBuilder: FormBuilder, public navCtrl: NavController, private menuController: MenuController) {
    
    this.formularioRegistro = this.formBuilder.group({
    'nombre': new FormControl('', Validators.required),
    'apellido': new FormControl('', Validators.required),
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required),
    'confirmacionPassword': new FormControl('', Validators.required),
    'jornada': new FormControl('', Validators.required)
  }); }

  ngOnInit() {
  }

  async mostrarMensaje(){
    const alert = await this.alertController.create({
      header: 'Gracias!!',
      message: 'Sus datos han sido registrados!',
      buttons: ['OK'],
    });
    await alert.present();
  }

  async guardar(){
    var f = this.formularioRegistro.value;

    if(this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: 'Datos incompletos!',
        message: 'Tienes que llenar todos los datos!',
        buttons: ['OK'],
      });
      await alert.present();
      return
    }else{
      this.mostrarMensaje();
    }

    var usuario = {
      email: f.email,
      password: f.password
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));
  }

  mostrarMenu(){
    this.menuController.open('first');
  }
}
