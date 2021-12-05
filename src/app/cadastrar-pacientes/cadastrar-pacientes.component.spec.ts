import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPacientesComponent } from './cadastrar-pacientes.component';

describe('CadastrarPacientesComponent', () => {
  let component: CadastrarPacientesComponent;
  let fixture: ComponentFixture<CadastrarPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CadastrarPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
