import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Paciente } from '../models/paciente.model';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private router: Router, private http : HttpClient, private authService : AuthService, private toast : ToastService) { }

  getPacientes(){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/pacientes.php";
    let customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')});
    return this.http.get<any>(baseURL, {headers:customHeaders}).pipe(
      tap((response:any) => {
        if(response.status && response.status == 'Erro'){
          this.authService.logoutInvalidToken();
        }
      })
    );
  }

  postPacientes(nome : any, dataNascimento : any){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/pacientes.php";
    let body = new HttpParams();
    body = body.set("nome", nome);
    body = body.set("dataNascimento", dataNascimento);
    return this.http.post<any>(baseURL, body, {headers:new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')})}).pipe(
      tap((response:any) => {
        if(response.status && response.status == 'Erro'){
          this.authService.logoutInvalidToken();
          if(response.status && response.status == "Erro"){
            if(response.msg == "Token incorreto ou inválido"){
              this.authService.logoutInvalidToken();
            } else {
              this.toast.failMessage("Ocorreu um erro no cadastro, confira os dados e tente novamente!");
            }
          }
        }
      })
    );
  }

  putPacientes(paciente : Paciente){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/pacientes.php";
    let body = new HttpParams();
    body = body.set("id", paciente.id+"");
    body = body.set("nome", paciente.nome);
    body = body.set("dataNascimento", paciente.dataNascimento);
    return this.http.put<any>(baseURL, body, {headers:new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')})}).pipe(
      tap((response:any) => {
        if(response.status && response.status == "Erro"){
          if(response.msg == "Token incorreto ou inválido"){
            this.authService.logoutInvalidToken();
          } else {
            this.toast.failMessage("Ocorreu um erro ao editar, confira os dados e tente novamente!");
          }
        }
      })
    );
  }

  deletePaciente(id : any){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/pacientes.php";
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
