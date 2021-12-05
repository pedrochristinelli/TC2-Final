import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { ToastMessagesComponent } from './toast-messages/toast-messages.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { CadastrarPacientesComponent } from './cadastrar-pacientes/cadastrar-pacientes.component';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { CadastrarMedicosComponent } from './cadastrar-medicos/cadastrar-medicos.component';
import { AdicionarConsultaComponent } from './adicionar-consulta/adicionar-consulta.component';
import { EspecialidadePipe } from './especialidade.pipe';
import { ListarConsultaComponent } from './listar-consulta/listar-consulta.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    ToastMessagesComponent,
    HeaderComponent,
    HomeComponent,
    ListarPacientesComponent,
    CadastrarPacientesComponent,
    ListarMedicosComponent,
    CadastrarMedicosComponent,
    AdicionarConsultaComponent,
    EspecialidadePipe,
    ListarConsultaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
