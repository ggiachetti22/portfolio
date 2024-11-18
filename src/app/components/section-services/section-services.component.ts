import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';
import { TitleServices } from '../servicios/title.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-section-services',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    NgClass
  ],
  templateUrl: './section-services.component.html',
  styleUrl: './section-services.component.css'
})
export class SectionServicesComponent implements AfterViewInit{

  public valor!: boolean;

  public constructor(private changeDtRef: ChangeDetectorRef, private titleService: TitleServices) {
  } // constructor;

  public ngAfterViewInit(): void {

    this.titleService.Light.subscribe( (v) => {
      this.valor = Boolean(v);
    } ); // subscribe;
    this.changeDtRef.detectChanges();
  } // ngAfterViewInit();



} // SectionServicesComponent;
