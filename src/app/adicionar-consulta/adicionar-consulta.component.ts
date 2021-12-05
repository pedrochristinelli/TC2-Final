import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Consulta } from '../models/consulta.model';
import { Medico } from '../models/medico.model';
import { Paciente } from '../models/paciente.model';
import { ConsultaService } from '../services/consulta.service';
import { MedicoService } from '../services/medico.service';
import { PacienteService } from '../services/paciente.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-adicionar-consulta',
  templateUrl: './adicionar-consulta.component.html',
  styleUrls: ['./adicionar-consulta.component.css']
})
export class AdicionarConsultaComponent implements OnInit {

  dateError : any;
  pacienteError : any;
  medicoError : any;
  hourError : any;
  listaMedicos: Medico[] = [];
  listaPacientes: Paciente[] = [];
  formConsulta: Consulta = {
    id: 0,
    idMedico: 0,
    idPaciente: 0,
    data: "",
    nomePaciente: "",
    nomeMedico: ""
  }
  horario: string = ""

  constructor(private toast: ToastService, private router: Router, private pacienteService : PacienteService, private medicoService : MedicoService, private consultaService : ConsultaService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login']);
    } else {
      this.medicoService.getMedicos().subscribe((response) => {
        this.listaMedicos = response
      });
      this.pacienteService.getPacientes().subscribe((response) => {
        this.listaPacientes = response
      });
    }
  }

  cadastro(): void {
    if(this.formConsulta.idMedico == 0 || this.formConsulta.idPaciente == 0 || !this.formConsulta.data || !this.horario){
      if(this.formConsulta.idMedico == 0){
        this.toast.failMessage("O campo Medico não pode estar vazio!")
        this.medicoError = true;
      }

      if(this.formConsulta.idPaciente == 0){
        this.toast.failMessage("O campo Paciente não pode estar vazio!")
        this.pacienteError = true;
      }

      if(!this.formConsulta.data){
        this.toast.failMessage("O campo Data não pode estar vazio!")
        this.dateError = true;
      }
      
      if(!this.horario){
        this.toast.failMessage("O campo Horario não pode estar vazio!")
        this.hourError = true;
      }
    } else {
      this.dateError = false;
      this.pacienteError = false;
      this.medicoError = false;
      this.hourError = false;

      let dataCompleta = this.formConsulta.data+ " "+ this.horario;
      this.consultaService.postConsulta(this.formConsulta.idMedico, this.formConsulta.idPaciente, dataCompleta).subscribe((response) => {
        if(response.id){
          this.toast.successMessage("Consulta marcada com sucesso!");
          this.router.navigate(['/listar-consultas']);
        }
      });
    }
  }

  setPaciente(value: any) {
    let id : number = +value.target.value;
    this.formConsulta.idPaciente = id;
  }

  setMedico(value: any) {
    let id : number = +value.target.value;
    this.formConsulta.idMedico = id;
  }
}
