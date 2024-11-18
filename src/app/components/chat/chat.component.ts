import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TitleServices } from '../servicios/title.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit, AfterViewInit {

  protected title: string = `Chat Pages`;

  public valor!: boolean;

  constructor(private changeDtRef: ChangeDetectorRef, private titleService: TitleServices) {} // constructor;

  public ngOnInit(): void {
    this.titleService.AddTitle(this.title);
  } // this.ngOnInit();

  
  public ngAfterViewInit(): void {
    this.titleService.Light.subscribe( (v) => {
      this.valor = Boolean(v);
    } ); // subscribe;
    this.changeDtRef.detectChanges();
  } // ngAfterViewInit();



  
} // ChatComponent;
