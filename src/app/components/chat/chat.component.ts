import { Component, OnInit } from '@angular/core';
import { TitleServices } from '../servicios/title.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit {

  constructor(private titleService: TitleServices) {} // constructor;

  public ngOnInit(): void {
    this.titleService.AddTitle(this.title);
  } // this.ngOnInit();

  protected title: string = `Chat Pages`;

  
} // ChatComponent;
