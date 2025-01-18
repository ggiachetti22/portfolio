import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { TitleServices } from '../servicios/title.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-testimonios',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './testimonios.component.html',
  styleUrl: './testimonios.component.css'
})
export class TestimoniosComponent implements AfterViewInit {

  public valor: boolean = false;

  constructor(private changeDtRef: ChangeDetectorRef, private titleService: TitleServices, private render: Renderer2) {} // constructor;

  public ngAfterViewInit(): void {
    this.titleService.Light.subscribe( (v) => {
      this.valor = Boolean(v);
    } ); // subscribe;
    this.changeDtRef.detectChanges();

    if(this.Box && this.Box?.nativeElement) {
      this.ancho = this.Box.nativeElement.offsetWidth;
      this.altura = this.Box.nativeElement.offsetHeight;
      this.Top = this.Box.nativeElement.offsetHeight - this.Box.nativeElement.offsetHeight;
      this.Center = this.ancho / 2;
    } // if;

    
  } // ngAfterViewInit();

  public Top = 0;
  public Left = 0;
  public Center = 0;
  public ancho = 0;
  public altura = 0;  
  public hi: string = "";
  @ViewChild('Box', {static: false}) Box!: ElementRef;


  public movemouse(): void {
    // this.render.setStyle(this.Hi.nativeElement, "border", "2px solid cyan");
    this.hi = "Hola";
  } // movemouse();


} // TestimoniosComponent;
