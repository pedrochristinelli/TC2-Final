import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from '../models/login-form.model';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toast: ToastService, private authService : AuthService, private router: Router) { }

  loginForm : LoginForm = {login: "", senha: ""};

  ngOnInit(): void {
    if(localStorage.getItem('auth')){
      this.router.navigate(['/home']);
    }
  }

  login() : void{
    if(!this.loginForm.login){
      this.toast.failMessage("Login não pode estar vazio!");
      if(!this.loginForm.senha) this.toast.failMessage("Senha não pode estar vazia!");
    } else if(!this.loginForm.senha){
      this.toast.failMessage("Senha não pode estar vazia!");
    } else {
      this.authService.postLogin(this.loginForm.login, this.loginForm.senha).subscribe((response) => {
        if(response.token){
          this.router.navigate(['/home']);
        } else {
          this.toast.failMessage("Login Falhou! Verifique se seu usuario ou senha estão corretos!");
        }
      });
    }
  }

}
