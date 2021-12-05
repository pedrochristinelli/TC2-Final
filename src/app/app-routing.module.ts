import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarConsultaComponent } from './adicionar-consulta/adicionar-consulta.component';
import { CadastrarMedicosComponent } from './cadastrar-medicos/cadastrar-medicos.component';
import { CadastrarPacientesComponent } from './cadastrar-pacientes/cadastrar-pacientes.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { ListarConsultaComponent } from './listar-consulta/listar-consulta.component';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { ListarPacientesComponent } from './listar-pacientes/listar-pacientes.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'cadastro', component: CadastroComponent},
  { path: 'cadastro-medico', component: CadastrarMedicosComponent},
  { path: 'cadastro-paciente', component: CadastrarPacientesComponent},
  { path: 'cadastro-consulta', component: AdicionarConsultaComponent},
  { path: 'listar-medicos', component:  ListarMedicosComponent},
  { path: 'listar-medicos/editar/:id', component:  CadastrarMedicosComponent},
  { path: 'listar-medicos/consulta/:medicoId', component:  ListarConsultaComponent},
  { path: 'listar-pacientes', component:  ListarPacientesComponent},
  { path: 'listar-pacientes/editar/:id', component:  CadastrarPacientesComponent},
  { path: 'listar-pacientes/consulta/:pacienteId', component:  ListarConsultaComponent},
  { path: 'listar-consultas', component:  ListarConsultaComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full' },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
