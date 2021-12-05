import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'especialidade'
})
export class EspecialidadePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let retorno = ""
    switch(value){
      case 1:{
        retorno = 'Cardiologista';
        break;
      }
      case 2:{
        retorno = 'Oftalmologista';
        break;
      }
      case 3:{
        retorno = 'Ortopedista';
        break;
      }
      case 4:{
        retorno = 'Oncologista';
        break;
      }
      case 5:{
        retorno = 'Cirurgia Geral';
        break;
      }
      case 6:{
        retorno = 'Anestesista';
        break;
      }
    }
    return retorno;
  }
}
