import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Consulta } from '../models/consulta.model';
import { Medico } from '../models/medico.model';
import { Paciente } from '../models/paciente.model';
import { AuthService } from './auth.service';
import { MedicoService } from './medico.service';
import { PacienteService } from './paciente.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  listaMedicos : Medico[] = [];
  listaPacientes : Paciente[] = [];

  constructor(private http : HttpClient, private authService : AuthService, private pacienteService: PacienteService, private medicoService: MedicoService, private toast : ToastService) { }

  postConsulta(idMedico : any, idPaciente: any, data: any){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/consultas.php";
    let body = new HttpParams();
    body = body.set("idMedico", idMedico);
    body = body.set("idPaciente", idPaciente);
    body = body.set("data", data);
    return this.http.post<any>(baseURL, body, {headers:new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')})}).pipe(
      tap((response:any) => {
        if(response.status && response.status == 'Erro'){
          if(response.msg == "Token incorreto ou inválido"){
            this.authService.logoutInvalidToken();
          } else {
            this.toast.failMessage("Ocorreu um erro no cadastro da consulta, confira os dados e tente novamente!");
          }
        }
      })
    );
  }

  getConsultas(){
    this.pacienteService.getPacientes().subscribe((response) => {
      this.listaPacientes = response
    });
    this.medicoService.getMedicos().subscribe((response) => {
      this.listaMedicos = response
    });      
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/consultas.php";
    let customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')});
    let listaConsulta: Consulta[] = [];
    return this.http.get<any>(baseURL, {headers:customHeaders}).pipe(
      tap((response:any) => {
        if(response.status && response.status == 'Erro'){
          this.authService.logoutInvalidToken();
        } else {
          for (let i = 0; i < response.length; i++) {
            let obj: Consulta = {
              id: response[i].id,
              idMedico : response[i].idMedico,
              idPaciente : response[i].idPaciente,
              data : response[i].data,
              nomeMedico  : this.getMedicoNomeById(response[i].idMedico),
              nomePaciente : this.getPacienteNomeById(response[i].idPaciente)
            };
            response[i] = obj;
            listaConsulta.push(obj);
          }
        }
      })
    )
  }

  private getMedicoNomeById(id : number){
    const y = this.listaMedicos.find(x => x.id == id)
    return typeof(y) == 'undefined'? "" : y.nome;
  }

  private getPacienteNomeById(id : number){
    const y = this.listaPacientes.find(x => x.id == id)
    return typeof(y) == 'undefined'? "" : y.nome;
  }

  deleteConsulta(id : any){
    let baseURL = "https://tiagoifsp.ddns.net/clinicaMedicaJWT/consultas.php";
    let customHeaders = new HttpHeaders({ Authorization: "Bearer " + localStorage.getItem('auth')});
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
