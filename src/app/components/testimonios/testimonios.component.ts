import { AfterViewInit, Component, Renderer2 } from '@angular/core';
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

  constructor(private titleService: TitleServices, private render: Renderer2) {} // constructor;

  public ngAfterViewInit(): void {

    this.titleService.Light.subscribe( (v) => {
      this.valor = Boolean(v);
    } ); // subscribe;
    
  } // ngAfterViewInit();



} // TestimoniosComponent;
