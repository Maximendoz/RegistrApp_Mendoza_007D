import { Component, OnInit } from '@angular/core';
import { Users } from 'src/app/pages/interfaces/interfaces';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/servicios/servicio.service';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';

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
    jornada: "",
    role: "",
    anno: 0,
    semestre: "",
    asignatura: "",
    isactive: true
  }

  constructor(
    private authservice: AuthService,
    private router: Router,
    private toastcontroller: ToastController,
    private formBuilder: FormBuilder) {
      this.usuarioForm = this.formBuilder.group({
        'nombre': new FormControl('', [Validators.required, Validators.minLength(4)]),
        'apellido': new FormControl('', [Validators.required, Validators.minLength(4)]),
        'useremail': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', [Validators.required, Validators.minLength(8)]),
        'jornada': new FormControl('', [Validators.required]),
        'role': new FormControl('', [Validators.required]),
        'anno': new FormControl('', [Validators.required]),
        'semestre': new FormControl('', [Validators.required]),
        'asignatura': new FormControl('', [Validators.required])
      });
    }

  ngOnInit() {
  }

  crearUsuario() {
    if(this.usuarioForm.valid){
      this.newUsuario.nombre=this.usuarioForm.value.nombre;
      this.newUsuario.apellido=this.usuarioForm.value.apellido;
      this.newUsuario.useremail=this.usuarioForm.value.useremail;
      this.newUsuario.password=this.usuarioForm.value.password;
      this.newUsuario.jornada=this.usuarioForm.value.jornada;
      this.newUsuario.role=this.usuarioForm.value.role;
      this.newUsuario.anno=this.usuarioForm.value.anno;
      this.newUsuario.semestre=this.usuarioForm.value.semestre;
      this.newUsuario.asignatura=this.usuarioForm.value.asignatura;
      this.newUsuario.isactive=true;
      if(this.newUsuario.password === this.usuarioForm.value.password){
        this.authservice.crearUsuario(this.newUsuario).subscribe();
        this.showToast('Se registró el usuario');
        this.router.navigateByUrl('/login');
      }
      
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
