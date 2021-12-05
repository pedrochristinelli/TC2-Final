import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Medico } from '../models/medico.model';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  constructor(private router: Router, private http : HttpClient, private authService : AuthService, private toast : ToastService) { }

  getMedicos(){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/medicos.php";
    let customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')});
    return this.http.get<any>(baseURL, {headers:customHeaders}).pipe(
      tap((response:any) => {
        if(response.status && response.status == 'Erro'){
          this.authService.logoutInvalidToken();
        }
      })
    );
  }

  postMedicos(nome : any, idEspecialidade : any){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/medicos.php";
    let body = new HttpParams();
    body = body.set("nome", nome);
    body = body.set("idEspecialidade", idEspecialidade);
    return this.http.post<any>(baseURL, body, {headers:new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')})}).pipe(
      tap((response:any) => {
        if(response.status && response.status == 'Erro'){
          if(response.msg == "Token incorreto ou inválido"){
            this.authService.logoutInvalidToken();
          } else {
            this.toast.failMessage("Ocorreu um erro no cadastro, confira os dados e tente novamente!");
          }
        }
      })
    );
  }

  putMedicos(medico : Medico){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/medicos.php";
    let body = new HttpParams();
    body = body.set("id", medico.id+"");
    body = body.set("nome", medico.nome);
    body = body.set("idEspecialidade", medico.idEspecialidade+"");
    return this.http.put<any>(baseURL, body, {headers:new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')})}).pipe(
      tap((response:any) => {
        if(response.status && response.status == 'Erro'){
          if(response.msg == "Token incorreto ou inválido"){
            this.authService.logoutInvalidToken();
          } else {
            this.toast.failMessage("Ocorreu um erro na edição, confira os dados e tente novamente!");
          }
        }
      })
    );
  }

  deleteMedico(id : any){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/medicos.php";
    let customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')});
    let params = {'id': id};
    return this.http.delete<any>(baseURL, {headers:customHeaders, params:{'id': id}}).pipe(
      tap((response:any) => {
        if(response.status && response.status == 'Erro'){
          if(response.msg == "Token incorreto ou inválido"){
            this.authService.logoutInvalidToken();
          } else {
            this.toast.failMessage("Ocorreu um erro ao deletar, tente novamente mais tarde!");
          }
        }
      })
    );
  }
}
