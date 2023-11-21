import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userdata: any;

  usuario = {
    id: 0,
    nombre: "",
    apellido:"",
    useremail: "",
    password: "",
    jornada:"",
    role: "",
    isactive: false
  }

  loginForm: FormGroup;

  constructor(
    private authservice: AuthService,
    private router: Router,
    private alertcontroller: AlertController,
    private toastcontroller: ToastController,
    private builder: FormBuilder) {
    this.loginForm = this.builder.group({
      'useremail': new FormControl("", [Validators.required, Validators.email]),
      'password': new FormControl("", [Validators.required, Validators.minLength(8)])
    })
  }

  ngOnInit() {
  }

  login() {
    console.log("Codificando login");
    if (this.loginForm.valid) {
      this.authservice.GetUserById(this.loginForm.value.useremail).subscribe(resp => {
        this.userdata = resp;
        console.log(this.userdata);
        if (this.userdata.length > 0) {      //el objeto que buscamos existe en JSON
          this.usuario = {
            id: this.userdata[0].id,
            nombre: this.userdata[0].nombre,
            apellido: this.userdata[0].apellido,
            useremail: this.userdata[0].useremail,
            password: this.userdata[0].password,
            jornada: this.userdata[0].jornada,
            role: this.userdata[0].role,
            isactive: this.userdata[0].isactive
          }
          if (this.usuario.password === this.loginForm.value.password) {
            if (this.usuario.isactive) {
              sessionStorage.setItem('id', this.usuario.id.toString());
              sessionStorage.setItem('useremail', this.usuario.useremail);
              sessionStorage.setItem('nombre', this.usuario.nombre);
              sessionStorage.setItem('apellido', this.usuario.apellido);
              sessionStorage.setItem('jornada', this.usuario.jornada);
              sessionStorage.setItem('role', this.usuario.role);
              sessionStorage.setItem('ingresado', 'true');
              this.showToast('Hola y Bienvenido ' + this.usuario.nombre + '!');
              this.router.navigateByUrl('/inicio');
            }
            else {
              this.UserInactivo();
              this.loginForm.reset();
            }
          }
          else {
            this.Error();
            this.loginForm.reset();
          }
        }
        else {
          this.NoExiste();
          this.loginForm.reset();
        }
      })
    }
  }//login

  async showToast(msg: any) {
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

  async UserInactivo() {
    const alert = await this.alertcontroller.create({
      header: 'Usuario Inactivo',
      message: 'Debe contactarse con admin@duocuc.cl',
      buttons: ['OK']
    })
    await alert.present();
    return;
  }

  async Error() {
    const alert = await this.alertcontroller.create({
      header: 'Error',
      message: 'Contraseña incorrectos',
      buttons: ['OK']
    })
    await alert.present();
    return;
  }

  async NoExiste() {
    const alert = await this.alertcontroller.create({
      header: 'Error...',
      message: 'Usuario no existe',
      buttons: ['OK']
    })
    await alert.present();
    return;
  }

  public logout() {
    sessionStorage.removeItem('useremail');
    sessionStorage.removeItem('password');
    sessionStorage.removeItem('role');
    this.router.navigateByUrl('/login');
  }
}
