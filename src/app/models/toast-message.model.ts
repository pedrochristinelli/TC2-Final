import * as uuid from 'uuid';

export class ToastMessage {
    id: string;
    content: string;
    style: string;
  
    constructor(content: string, style?: string) {
      this.id = uuid.v4()
      this.content = content
      this.style = style || 'info'
    }
  
  }