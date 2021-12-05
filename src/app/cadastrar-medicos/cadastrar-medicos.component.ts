import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidade } from '../models/especialidade.model';
import { Medico } from '../models/medico.model';
import { AuthService } from '../services/auth.service';
import { EspecialidadeService } from '../services/especialidade.service';
import { MedicoService } from '../services/medico.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-cadastrar-medicos',
  templateUrl: './cadastrar-medicos.component.html',
  styleUrls: ['./cadastrar-medicos.component.css']
})
export class CadastrarMedicosComponent implements OnInit {

  listaEspecialidades: Especialidade[] = []
  especialidadeError : any;
  nomeError : any;
  constructor(private toast: ToastService, private route: ActivatedRoute, private router: Router, private medicoService : MedicoService, private especialidadeService: EspecialidadeService) { }
  medicoForm: Medico = { id: 0, nome: "", idEspecialidade: 0, dataCadastro: ""}
  especialidadeId: number = 0;
  isEdit: boolean = false;
  buttonText = "Cadastrar";
  titleText = "Cadastrar Medico";

  ngOnInit(): void {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login']);
    } else {
      this.especialidadeService.getEspecialidades().subscribe((response) => {
        this.listaEspecialidades = response;
      });
      if(this.route.snapshot.params.id){
        this.buttonText = "Salvar"
        this.titleText = "Editar Medico"
        this.isEdit = true;
        let id : number = +this.route.snapshot.params.id;
        this.medicoForm.id = id;
        this.carregarMedicoById(this.medicoForm.id);
      }
    }
  }

  cadastro() : void{
    if(!this.medicoForm.nome){
      this.toast.failMessage("O campo Nome não pode estar vazio!")
      this.nomeError = true;
      if(this.medicoForm.idEspecialidade == 0){
        this.toast.failMessage("Selecione algo em Especialidade!")
        this.especialidadeError = true;
      }
    } else if(this.medicoForm.idEspecialidade == 0){
      this.nomeError = false;
      this.toast.failMessage("Selecione algo em Especialidade!")
      this.especialidadeError = true;
    } else {
      this.medicoService.postMedicos(this.medicoForm.nome, this.medicoForm.idEspecialidade).subscribe((response) => {
        this.especialidadeError = false;
        this.nomeError = false;
        if(response.id){
          this.toast.successMessage("Medico Cadastrado com sucesso!");
          this.router.navigate(['/listar-medicos']);
        }
      });
    }
  }

  editar(){
    if(!this.medicoForm.nome){
      this.toast.failMessage("O campo Nome não pode estar vazio!")
      this.nomeError = true;
      if(this.medicoForm.idEspecialidade == 0){
        this.toast.failMessage("Selecione algo em Especialidade!")
        this.especialidadeError = true;
      }
    } else if(this.medicoForm.idEspecialidade == 0){
      this.nomeError = false;
      this.toast.failMessage("Selecione algo em Especialidade!")
      this.especialidadeError = true;
    } else {
      this.medicoService.putMedicos(this.medicoForm).subscribe((response) => {
        this.especialidadeError = false;
        this.nomeError = false;
        if(response.id){
          this.toast.successMessage("Medico editado com sucesso!");
          this.router.navigate(['/listar-medicos']);
        }
      });
    }
  }

  buttonExec(): void{
    if(this.isEdit){
      this.editar();
    } else {
      this.cadastro();
    }
  }

  setPlan(value: any) {
    this.medicoForm.idEspecialidade = value.target.value;
  }

  carregarMedicoById(id : number) : void{
    this.medicoService.getMedicos().subscribe((response) => {
      const medicoEditavel = response.find((x: { id: number; }) => x.id == id);
      this.medicoForm.nome = medicoEditavel.nome;
      this.medicoForm.idEspecialidade = medicoEditavel.idEspecialidade;
      this.especialidadeId = medicoEditavel.idEspecialidade;
      this.medicoForm.dataCadastro = medicoEditavel.dataCadastro;
    });
    
  }
}
