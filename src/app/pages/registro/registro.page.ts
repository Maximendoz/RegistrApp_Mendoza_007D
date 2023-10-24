import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/pages/interfaces/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuarioForm: FormGroup;

  newUsuario: Users = {
    id: 0,
    nombre: "",
    apellido: "",
    useremail: "",
    password: "",
    confirmacionPassword: "",
    jornada: "",
    role: "",
    isactive: true
  }

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toastcontroller: ToastController,
    private alertcontroller: AlertController,
    private formBuilder: FormBuilder
  ) {
    this.usuarioForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, Validators.minLength(4)]],
      useremail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmacionPassword: ['', [Validators.required, Validators.minLength(8)]],
      jornada: ['', Validators.required],
      role: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  crearUsuario() {
      this.authservice.crearUsuario(this.newUsuario).subscribe();
      this.showToast('Se registró el usuario');
      this.router.navigateByUrl('/login');
    if(this.newUsuario.password != this.newUsuario.confirmacionPassword){
      this.showToast('Las contraseñas no coinciden');
    }else{
      
    }
  }

  async showToast(msg: any) {
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
