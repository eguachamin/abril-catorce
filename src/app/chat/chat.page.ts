// src/app/chat/chat.page.ts

import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../services/chat.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss']
})
export class ChatPage implements OnInit {
  messages: Message[] = [];
  newMessage: string = '';
  userName: string = 'Anon';

  constructor(
    private chatService: ChatService,
    private auth: Auth
  ) {}

  async ngOnInit() {
    const user = await this.auth.currentUser;
    if (user) {
      this.userName = user.displayName || user.email || 'Anon';
    }

    this.chatService.getMessages().subscribe((msgs: Message[]) => {
      this.messages = msgs;
    });
  }

  sendMessage() {
    const messageContent = this.newMessage.trim();
    if (messageContent === '') return;

    this.chatService.sendMessage(messageContent, this.userName);
    this.newMessage = '';
  }
}
