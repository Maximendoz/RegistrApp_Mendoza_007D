import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;

  constructor(public formBuilder: FormBuilder, private alertController: AlertController, public navCtrl: NavController, private menuController: MenuController) {

    this.formularioLogin = this.formBuilder.group({
      'email': new FormControl('', Validators.required),
      'password': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  async ingresar() {
    var f = this.formularioLogin.value;
    var usuarioString = localStorage.getItem('usuario');
    if (usuarioString !== null) {
      var usuario = JSON.parse(usuarioString);
      if (usuario.email == f.email && usuario.password == f.password) {
        console.log('Ingresado');
        localStorage.setItem('ingresado', 'true');
        this.navCtrl.navigateForward('/inicio');
      } else {
        const alert = await this.alertController.create({
          header: 'Datos incorrectos',
          message: 'Tienes que llenar todos los datos',
          buttons: ['Ok'],
        });
        await alert.present();
      }
    } else {
      // Manejo de caso cuando no se encuentra el valor en localStorage
    }
  }
  mostrarMenu(){
    this.menuController.open('first');
  }
}
