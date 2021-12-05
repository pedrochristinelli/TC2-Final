import { Injectable } from '@angular/core';
import { listaMensagens } from 'src/toast-messages-list';
import { ToastMessage } from '../models/toast-message.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  listaMensagem : ToastMessage[] = listaMensagens;
  constructor() { }

  getMessages(): ToastMessage[] {
    return this.listaMensagem
  }

  getMessageById(id : string){
    return this.listaMensagem.find(x => x.id == id);
  }

  sendMessage(content: string, style: string | undefined) {
    const message = new ToastMessage(content, style)
    this.listaMensagem.push(message)
  }

  infoMessage(message: string) {
    this.sendMessage(message, 'info')
  }

  successMessage(message: string) {
    this.sendMessage(message, 'success')
  }

  failMessage(message: string) {
    this.sendMessage(message, 'danger')
  }

  dismissMessage(id: string) {
    let message  = this.getMessageById(id);
    this.listaMensagem = this.listaMensagem.filter(function(e) { return e !== message });
  }
}
