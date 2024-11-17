import { AfterViewInit, Component, ElementRef, InjectionToken, OnInit, Renderer2, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { TitleServices } from './components/servicios/title.service';

// export const IMAGE_CONFIG = new InjectionToken('IMAGE_CONFIG');

/* providers: [
  {
    provide: IMAGE_CONFIG,
    useValue: {
      disableImageSizeWarning: true,
      disableImageLazyLoadWarning: true
    }
  }
] */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent implements OnInit, AfterViewInit {

  constructor(private titleServices: Title, private titleService: TitleServices, private render: Renderer2) {
    console.log("App-Component", this.titleService.CurrentLight);
  } // constructor;

  @ViewChild('Container') Container!: ElementRef;

  public ngOnInit(): void {
    this.titleService.title.subscribe(t => {
      this.title = t;
      this.setTitle(this.title);
    }); // subscribe;


  } // this.ngOnInit();


  public ngAfterViewInit(): void {
    this.titleService.Light.subscribe( (v) => {
      this.valor = Boolean(v);
      this.ChangeLight(Boolean(v));
      console.log(`Light: `, v);
    } );
  } // ngAfterViewInit();


  public valor: boolean = false;


  private ChangeLight(v: boolean): void{
    if (v){
      this.render.setStyle(this.Container.nativeElement, 'background', 'rgba(0, 0, 255, 0.2)');
    } else {
      this.render.setStyle(this.Container.nativeElement, 'background', 'rgba(0, 0, 0, .8)');
    } // else;
  } // this.ChangeLight(v);


  public setTitle(newTitle: string) {
    this.titleServices.setTitle(newTitle);
  } // this.setTitle(this.title);


  public title = '';


} // AppComponent;
