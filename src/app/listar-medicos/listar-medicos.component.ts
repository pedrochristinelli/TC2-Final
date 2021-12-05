import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Medico } from '../models/medico.model';
import { MedicoService } from '../services/medico.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.css']
})
export class ListarMedicosComponent implements OnInit {

  listaMedicos: Medico[] = [];

  constructor(private toast: ToastService, private router: Router, private medicoService : MedicoService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login']);
    } else {
      this.medicoService.getMedicos().subscribe((response) => {
        this.listaMedicos = response
      });
    }
  }

  removeMedico(id : any){
    this.medicoService.deleteMedico(id).subscribe((response) => {
      if(response.status && response.status == "OK" ){
        this.toast.successMessage("Medico Deletado com sucesso!")
        this.medicoService.getMedicos().subscribe((response) => {
          this.listaMedicos = response
        });
      }
    });
  }
}
