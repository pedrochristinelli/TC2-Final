import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false)
  isLoggedIn = this._isLoggedIn.asObservable();

  constructor(private router: Router, private http : HttpClient, private toast : ToastService) {
    const token = localStorage.getItem('auth');
    this._isLoggedIn.next(!!token);
  }

  logout(){
    localStorage.removeItem('auth')
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  logoutInvalidToken(){
    this.toast.failMessage("A sessão expirou! Faça login novamente para utilizar o sistema!")
    localStorage.removeItem('auth')
    this._isLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  postLogin(login : any, senha : any){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/administradores.php";
    let body = new HttpParams();
    body = body.set("login", login);
    body = body.set("senha", senha);
    return this.http.post<any>(baseURL, body).pipe(
      tap((response:any) => {
        if(response.token){
          this._isLoggedIn.next(true);
          localStorage.setItem('auth', response.token);
        }
      })
    );
  }

  putCadastro(login : any, senha : any){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/administradores.php";
    let body = new HttpParams();
    body = body.set("login", login);
    body = body.set("senha", senha);
    return this.http.put<any>(baseURL, body);
  }
}
