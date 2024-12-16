import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MessageDTO } from '../interface/interfaces';
import { ChatService } from '../servicios/chat.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-messager',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './messager.component.html',
  styleUrl: './messager.component.css'
})
export class MessagerComponent {

  constructor(protected chatService : ChatService){} // constructor;

  @Input() oMessage? : MessageDTO;

  private myID : Number = 0;

  @ViewChild('hidden') hiddenInput! : ElementRef;
  @ViewChild('Despliega') Despliega! : ElementRef;

  HiddenInput = new FormControl('');

  public Where() : void {
    this.myID = Number(this.oMessage?.messageID);
    this.chatService.changeNextNumber(Number(this.myID));
  } // thisWhere();

  public ID() : Number {
    this.myID = Number(this.oMessage?.messageID);
    return this.myID;
  } // this.ID();

  public Tx(s : string) : String {
    this.oMessage?.userName;
    return s;
  } // this.Tx(...);



} // MessagerComponent;
