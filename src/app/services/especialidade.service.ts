import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadeService {
  constructor(private router: Router, private http : HttpClient, private authService : AuthService, private toast : ToastService) { }

  getEspecialidades(){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/especialidades.php";
    let customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')});
    return this.http.get<any>(baseURL, {headers:customHeaders}).pipe(
      tap((response:any) => {
        if(response.status && response.status == 'Erro'){
          this.authService.logoutInvalidToken();
        }
      })
    );
  }
}
