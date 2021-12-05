import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Paciente } from '../models/paciente.model';
import { PacienteService } from '../services/paciente.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-cadastrar-pacientes',
  templateUrl: './cadastrar-pacientes.component.html',
  styleUrls: ['./cadastrar-pacientes.component.css']
})
export class CadastrarPacientesComponent implements OnInit {

  idadeError : any;
  nomeError : any;
  pacienteForm : Paciente = {
    id: 0,
    nome: "",
    dataNascimento: "",
    dataCadastro: ""
  }
  isEdit: boolean = false;
  buttonText = "Cadastrar";
  titleText = "Cadastrar Paciente";

  constructor(private toast: ToastService, private route: ActivatedRoute, private router: Router, private pacienteService : PacienteService) { }

  ngOnInit(): void {
    if(!localStorage.getItem('auth')){
      this.router.navigate(['/login']);
    } else {
      if(this.route.snapshot.params.id){
        this.buttonText = "Salvar"
        this.titleText = "Editar Paciente"
        this.isEdit = true;
        let id : number = +this.route.snapshot.params.id;
        this.pacienteForm.id = id;
        this.carregarPacienteById(this.pacienteForm.id);
      }
    }
  }

  cadastro(): void{
    let dataNascimento = new Date(this.pacienteForm.dataNascimento);
    let dataAtual = new Date();
    dataNascimento.setMinutes(dataAtual.getMinutes())
    dataNascimento.setSeconds(dataAtual.getSeconds())
    dataNascimento.setMilliseconds(dataAtual.getMilliseconds())
    if(!this.pacienteForm.nome){
      this.toast.failMessage("O campo Nome não pode estar vazio!")
      this.nomeError = true;
      if(!this.pacienteForm.dataNascimento){
        this.toast.failMessage("A Data de nascimento não pode estar vazia!")
        this.idadeError = true;
      } else if(dataAtual < dataNascimento){
        this.toast.failMessage("A Data de nascimento não pode estar no futuro!")
      }
    } else if(!this.pacienteForm.dataNascimento){
      this.nomeError = false;
      this.toast.failMessage("A Data de nascimento não pode estar vazia!")
      this.idadeError = true;
    } else if(dataAtual < dataNascimento){
      this.toast.failMessage("A Data de nascimento não pode estar no futuro!")
    } else {
      this.pacienteService.postPacientes(this.pacienteForm.nome, this.pacienteForm.dataNascimento).subscribe((response) => {
        this.idadeError = false;
        this.nomeError = false;
        if(response.id){
          this.toast.successMessage("Paciente Cadastrado com sucesso!");
          this.router.navigate(['/listar-pacientes']);
        }
      });
    }
  }

  editar() : void {
    let dataNascimento = new Date(this.pacienteForm.dataNascimento);
    let dataAtual = new Date();
    dataNascimento.setMinutes(dataAtual.getMinutes())
    dataNascimento.setSeconds(dataAtual.getSeconds())
    dataNascimento.setMilliseconds(dataAtual.getMilliseconds())
    if(!this.pacienteForm.nome){
      this.toast.failMessage("O campo Nome não pode estar vazio!")
      this.nomeError = true;
      if(!this.pacienteForm.dataNascimento){
        this.toast.failMessage("A Data de nascimento não pode estar vazia!")
        this.idadeError = true;
      } else if(dataAtual < dataNascimento){
        this.toast.failMessage("A Data de nascimento não pode estar no futuro!")
      }
    } else if(!this.pacienteForm.dataNascimento){
      this.nomeError = false;
      this.toast.failMessage("A Data de nascimento não pode estar vazia!")
      this.idadeError = true;
    } else if(dataAtual < dataNascimento){
      this.toast.failMessage("A Data de nascimento não pode estar no futuro!")
    } else {
      this.pacienteService.putPacientes(this.pacienteForm).subscribe((response) => {
        this.idadeError = false;
        this.nomeError = false;
        if(response.id){
          this.toast.successMessage("Paciente editado com sucesso!");
          this.router.navigate(['/listar-pacientes']);
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

  carregarPacienteById(id : number) : void{
    this.pacienteService.getPacientes().subscribe((response) => {
      const pacienteEditavel = response.find((x: { id: number; }) => x.id == id);
      this.pacienteForm.nome = pacienteEditavel.nome;
      this.pacienteForm.dataNascimento = pacienteEditavel.dataNascimento;
    });
    
  }

}
