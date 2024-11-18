import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, InjectionToken, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { TitleServices } from './components/servicios/title.service';
import { NgIf } from '@angular/common';

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
    FooterComponent,
    NgIf
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})


export class AppComponent implements OnInit, AfterViewInit {

  public valor: boolean = false;

  public showFooter = true;

  constructor(private changeDtRef: ChangeDetectorRef, private titleServices: Title, private titleService: TitleServices, private render: Renderer2, private router: Router) {
    const myRouter = ['/chat', '/chat?action=2'];

    this.router.events.subscribe( () => {
      // this.showFooter = !this.router.url.includes('/chat'); // chat?action=2
      this.showFooter = !myRouter.some(rout => this.router.url.includes(rout));
    });
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
      this.ChangeColor(this.valor);
      // console.log(`Light: `, v);
    } );
    this.changeDtRef.detectChanges();
  } // ngAfterViewInit();


  private ChangeColor(v: boolean): void{
    const backgroundColor = v ? 'rgb(255, 255, 255)' : 'rgba(0, 0, 0, .8)';
    document.body.style.background = backgroundColor;

    /* if (v){
      this.render.setStyle(this.Container.nativeElement, 'background', 'rgba(0, 0, 255, 0.2)');
    } else {
      this.render.setStyle(this.Container.nativeElement, 'background', 'rgba(0, 0, 0, .8)');
    } // else; */

  } // this.ChangeColor(v);


  public setTitle(newTitle: string) {
    this.titleServices.setTitle(newTitle);
  } // this.setTitle(this.title);


  public title = '';


} // AppComponent;
