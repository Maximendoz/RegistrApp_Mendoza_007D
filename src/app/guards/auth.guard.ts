import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../servicios/servicio.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private router: Router,
    private toastcontroller: ToastController,
    private authservice: AuthService) { }

  canActivate():
    | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authservice.IsLogged()) {
      this.showToast('Debe Iniciar sesión');
      this.router.navigateByUrl("/login");
      return false;
    }
    return true;
  }
  async showToast(msg: any) {
    const toast = await this.toastcontroller.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
