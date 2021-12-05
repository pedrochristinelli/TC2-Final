import { Component, OnInit } from '@angular/core';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'toast-messages',
  templateUrl: './toast-messages.component.html',
  styleUrls: ['./toast-messages.component.css']
})
export class ToastMessagesComponent implements OnInit {

  messages: any;

  constructor(private toast: ToastService) { }

  ngOnInit(): void {
    this.messages = this.toast.getMessages()
  }

  dismiss(id: any) {
    this.toast.dismissMessage(id)
    this.messages = this.toast.getMessages()
  }

}
