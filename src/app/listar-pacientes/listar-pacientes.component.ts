import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Paciente } from '../models/paciente.model';
import { PacienteService } from '../services/paciente.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-listar-pacientes',
  templateUrl: './listar-pacientes.component.html',
  styleUrls: ['./listar-pacientes.component.css']
})
export class ListarPacientesComponent implements OnInit {

  listaPacientes: Paciente[] = [];

  constructor(private toast: ToastService, private router: Router, private pacienteService : PacienteService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login']);
    } else {
      this.pacienteService.getPacientes().subscribe((response) => {
        this.listaPacientes = response
      });
      
    }
  }

  removePaciente(id : any){
    this.pacienteService.deletePaciente(id).subscribe((response) => {
      if(response.status && response.status == "OK" ){
        this.toast.successMessage("Medico Deletado com sucesso!")
        this.pacienteService.getPacientes().subscribe((response) => {
          this.listaPacientes = response
        });
      }
    });
  }
}
