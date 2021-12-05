import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Consulta } from '../models/consulta.model';
import { ConsultaService } from '../services/consulta.service';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-listar-consulta',
  templateUrl: './listar-consulta.component.html',
  styleUrls: ['./listar-consulta.component.css']
})
export class ListarConsultaComponent implements OnInit {

  listaConsultas: Consulta[] = [];

  constructor(private toast: ToastService, private route: ActivatedRoute, private router: Router, private consultaService : ConsultaService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login']);
    }else {
      this.consultaService.getConsultas().subscribe((response) => {
        this.listaConsultas = response
        if(this.route.snapshot.params.medicoId){
          let id : number = +this.route.snapshot.params.medicoId;
          this.carregarConsultasByMedicoId(id)
        }
        if(this.route.snapshot.params.pacienteId){
          let id : number = +this.route.snapshot.params.pacienteId;
          this.carregarConsultasByPacienteId(id)
        }
      });
    }
  }

  removeConsulta(id : any){
    this.consultaService.deleteConsulta(id).subscribe((response) => {
      if(response.status && response.status == "OK" ){
        this.toast.successMessage("Medico Deletado com sucesso!")
        this.consultaService.getConsultas().subscribe((response) => {
          this.listaConsultas = response
        });
      }
    });    
  }

  carregarConsultasByMedicoId(idMedico : number) : void{
    let listaFiltrada: Consulta[] = []
    for (let i = 0; i < this.listaConsultas.length; i++) {
      if(this.listaConsultas[i].idMedico == idMedico){
        listaFiltrada.push(this.listaConsultas[i])
      }
    }
    this.listaConsultas = listaFiltrada;
  }

  carregarConsultasByPacienteId(idPaciente : number) : void{
    let listaFiltrada: Consulta[] = []
    for (let i = 0; i < this.listaConsultas.length; i++) {
      if(this.listaConsultas[i].idPaciente == idPaciente){
        listaFiltrada.push(this.listaConsultas[i])
      }
    }
    this.listaConsultas = listaFiltrada;
  }
}
