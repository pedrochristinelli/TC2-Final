import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../models/login-form.model';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm : LoginForm = {login: "", senha: ""};
  emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$";

  constructor(private toast: ToastService, private router: Router, private authService : AuthService) { }

  ngOnInit(): void {
    if(localStorage.getItem('auth')){
      this.router.navigate(['/home']);
    }
  }

  cadastro() : void{
    if(!this.cadastroForm.login){
      this.toast.failMessage("O campo Login não pode estar vazio!")
      if(!this.cadastroForm.senha){
        this.toast.failMessage("O campo Senha não pode estar vazio!")
      }
    } else if(!this.cadastroForm.senha){
      this.toast.failMessage("O campo Senha não pode estar vazio!")
    } else {
      this.authService.putCadastro(this.cadastroForm.login, this.cadastroForm.senha).subscribe((response) => {
        if(response.id){
          this.toast.successMessage("Usuario Cadastrado com sucesso!");
          this.router.navigate(['/login']);
        } else if(response.status && response.status == "Erro"){
          this.toast.failMessage("O login usado já existe no nosso sistema, escolha outro!");
        }
      });
    }
  }

}
