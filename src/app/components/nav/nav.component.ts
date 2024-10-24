import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    SubMenuComponent,
    NgClass
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})

export class NavComponent implements OnInit {

  @ViewChild("link1") link1!: ElementRef;
  @ViewChild("link2") link2!: ElementRef;
  @ViewChild("link3") link3!: ElementRef;
  public ElLink1: boolean = false;
  public ElLink2: boolean = false;
  public ElLink3: boolean = false;
  // public ElLink4: boolean = false;
  // public ElLink5: boolean = false;
  @ViewChild('NavSection') NavSection!: ElementRef;
  @ViewChild("boxsection") boxsection!: ElementRef;
  @ViewChild("btnCheck") btnCheck!: ElementRef;
  @ViewChild("navegador1") navegador1!: ElementRef;
  // @ViewChild("navegador2") navegador2!: ElementRef;
  @ViewChild("parrafo1", { static: false }) parrafo1!: ElementRef;
  @ViewChild("parrafo2", { static: false }) parrafo2!: ElementRef;
  @ViewChild("parrafoBox", { static: false }) parrafoBox!: ElementRef;
  @ViewChild("MySection", { static: false}) MySection!: ElementRef;
  @ViewChild("menu1", { static: false}) menu1!: ElementRef;
  @ViewChild("menu2", { static: false}) menu2!: ElementRef;
  @ViewChild("menu3", { static: false}) menu3!: ElementRef;

  public Check = new BehaviorSubject<boolean>(false);
  public UserSession:  any;
  
  private LocationNow: string[] = ['home','chat','login'];
  private h: string = "h";
  private c: string = "c";
  private l: string = "l";
  private home: string = "h";
  private chat: string = "c";
  private login: string = "l";
  private Lct: string = "";
  private In = this.Lct.indexOf('?') || undefined;
  private sitio: string = '';

  public Parrafo1: String = '↑';
  public Parrafo2: String = 'Hola';

  private porcentaje: Number = 0;
  public event!: Event;
  public eventClose!: Event;
  public accion: number = 0;
  public ID: number = 0;
  

  constructor(protected renderer: Renderer2, protected router: Router, private route: ActivatedRoute) { } // constructor();


  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.accion = parseInt(p['action'], 10); // 10 especificación de la base decimal;
      console.log(`(this.accion: ${this.accion})`);
      this.LinkActivo();
    });

    this.route.snapshot.params['ElID'];
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (hasVisited === null) {
      localStorage.setItem('hasVisited', 'true');
      console.log('El sitio carga por primera vez');
    } else {
      console.log('El sitio ya ha sido visitado anteriormente');
    }

    this.iniciar();
    this.ResizeSlider(this.event);

  } // ngOnInit();

  public iniciar(): void {
    setTimeout( () => {
      let LctConst = window.location.href;
      this.route.queryParams.subscribe( act => {
        let LctObs = window.location.href;
        if(LctObs !== LctConst) {
          this.btnCheck.nativeElement.checked = false;
          this.Check.next(false);
          this.Close();
          LctConst = LctObs;
          console.log('((LctObs !== LctConst))');
        }
        const action = act['action'];
        // console.log(`this.route.queryParams: (`, action, `)\nLctObs: (${LctObs}) == ${LctConst}`);
      }); // this.route.queryParams;
    },10);
  } // this.iniciar();



  public QueryParam(activateRoute: ActivatedRoute) {
    activateRoute = this.route;
    activateRoute.queryParams.subscribe(p => {
      this.accion = parseInt(p['action'], 10); // 10 especificación de la base decimal;
      this.LinkActivo();
      // console.log(`this.accion: ${this.accion}`);
    });
    activateRoute.snapshot.params['ElID'];  
  } // this.QueryParam();


  public Param(): void {
    this.porcentaje = Number(0);
    this.renderer.setStyle(this.navegador1.nativeElement, 'left', `0%`);
    // this.renderer.setStyle(this.navegador2.nativeElement, 'right', `0%`);
  } // this.Param();


  private MyLocation(): void {
    const Lct = window.location.href;
    this.h = this.LocationNow[0].toLowerCase().trim();
    this.c = this.LocationNow[1].toLowerCase().trim();
    this.l = this.LocationNow[2].toLowerCase().trim();  
    this.In = Lct.indexOf('?') || undefined;
    if(this.In === - 1) this.In = undefined;
    let Home = Lct.indexOf(this.h);
    let Chat = Lct.indexOf(this.c);
    let Login = Lct.indexOf(this.l); 
    this.home = Lct.substring(Home, this.In);
    this.chat = Lct.substring(Chat, this.In);
    this.login = Lct.substring(Login, this.In);
    console.log(`Location Now: `, Lct, `\nLocal Home: `, this.home, `\nLocal Chat: `, this.chat, `\nLocal Login: `, this.login, `\n(?): (${this.In})`);
  } // this.MyLocation();


  public LinkActivo() { 
    this.ValueDefault();
    this.MyLocation();
    if (this.accion === 1 || this.home === this.h) {
      this.ElLink1 = true;
      this.sitio = this.home;
      console.log(`Acción: ${this.accion}\nValor 1: ${this.ElLink1}\nValor 2: ${this.ElLink2}\nValor 3: ${this.ElLink3}\nthis.Check: (${this.Check.value})`);
    } else if (this.accion === 2 || this.chat === this.c) {
      this.ElLink2 = true;
      this.sitio = this.chat;
      console.log(`Acción: ${this.accion}\nValor 1: ${this.ElLink1}\nValor 2: ${this.ElLink2}\nValor 3: ${this.ElLink3}\nthis.Check: (${this.Check.value})`);
    } else if (this.accion === 3  || this.login === this.l) {
      this.ElLink3 = true;
      this.sitio = this.login;
      console.log(`Acción: ${this.accion}\nValor 1: ${this.ElLink1}\nValor 2: ${this.ElLink2}\nValor 3: ${this.ElLink3}\nthis.Check: (${this.Check.value})`);
    } 
    /*
     else if (this.accion === 4) {
      this.ElLink4 = true;
      console.log(`Acción: ${this.accion}\nValor 4: ${this.ElLink1}\nValor 2: ${this.ElLink2}\nValor 3: ${this.ElLink4}`);
    }
    */
    else {
      this.ValueDefault();
      // console.log("No es igual a nunguno..!");
    } // else;
    
  } // this.LinkActivo();


  public ValueDefault() {
    this.ElLink1 = false;
    this.ElLink2 = false;
    this.ElLink3 = false;
  } // this.ValueDefault();
  

  public V() {
    // isNaN(this.accion)
    if (this.sitio === 'home' || this.sitio === '') {
      this.ElLink1 = true;
    } // if;
  } // V();


  public BtnMenu(): void {
    const NavSection = this.NavSection.nativeElement.offsetWidth;
    const Check = !this.btnCheck.nativeElement.checked;
    this.Check.next(Check);
    const M = this.MySection.nativeElement;
    if (Check) {
      this.Open();
    } else {
      this.Close();
    } // else;
    console.log(`Window: ((${NavSection}))\nthis.Check: ((${this.Check}))\nCheck: (${Check})\n((${this.porcentaje}))\n-------------------------\nObservable: ${this.Check.value}`)
  } // this.BtnMenu();

  private OpenMenu(): void {
    this.renderer.removeClass(this.menu1.nativeElement, 'close1');
    this.renderer.removeClass(this.menu2.nativeElement, 'close2');
    this.renderer.removeClass(this.menu3.nativeElement, 'close3');

    this.renderer.addClass(this.menu1.nativeElement, 'open1');
    this.renderer.addClass(this.menu2.nativeElement, 'open2');
    this.renderer.addClass(this.menu3.nativeElement, 'open3');
  } // this.OpenMenu();

  private CloseMenu(): void {
    this.renderer.removeClass(this.menu1.nativeElement, 'open1');
    this.renderer.removeClass(this.menu2.nativeElement, 'open2');
    this.renderer.removeClass(this.menu3.nativeElement, 'open3');

    this.renderer.addClass(this.menu1.nativeElement, 'close1');
    this.renderer.addClass(this.menu2.nativeElement, 'close2');
    this.renderer.addClass(this.menu3.nativeElement, 'close3');
  } // this.CloseMenu();


  public CloseEvent(e: Event) {
    const E =  e.target;
    const M = this.MySection.nativeElement;
    if(M === E) {
      this.btnCheck.nativeElement.checked = false;
      this.Check.next(false);
      this.Close();
    } // if;
    // console.log('Evento Target: ', e.target);
  } // this.CloseEvent();


  private Open(): void {
    this.OpenMenu();
    this.porcentaje = Number(0);
    this.renderer.setStyle(this.boxsection.nativeElement, "display", "block");
    this.renderer.setStyle(this.boxsection.nativeElement, "visibility", "visible");
    this.renderer.setStyle(this.boxsection.nativeElement, "opacity", "1");
    setTimeout(() => {
      this.renderer.setStyle(this.MySection.nativeElement, 'background', 'rgba(0,0,0, .5)');
      this.renderer.setStyle(this.navegador1.nativeElement, 'left', `${this.porcentaje}%`);
      this.renderer.setStyle(document.body, "overflow", "hidden");
    } , 300);
  } // this.Open();

  
  private Close(): void {    
    this.CloseMenu();
    this.porcentaje = Number(75);
    this.renderer.setStyle(document.body, "overflow", "auto");
    this.renderer.setStyle(this.MySection.nativeElement, 'background', 'transparent');
    this.renderer.setStyle(this.navegador1.nativeElement, 'left', `-${this.porcentaje}%`);
    setTimeout(() => {
      this.renderer.setStyle(this.boxsection.nativeElement, "display", "none");
      this.renderer.setStyle(this.boxsection.nativeElement, "visibility", "hidden");
      this.renderer.setStyle(this.boxsection.nativeElement, "opacity", "0");
    } , 300);
  } // this.Close();



  public Porcentaje(n: Number): Number {
    // let n: Number = 0;
    const NavSection = this.NavSection.nativeElement.offsetWidth;
    // const Check = !this.btnCheck.nativeElement.checked;
    if (NavSection <= 550 ) {
      this.porcentaje = Number(60);
    } else {
      this.porcentaje = Number(40);
    } // else;
    return this.porcentaje;
  } // this.Porcentaje();



  // (window:scroll)="myScroll();


  // [ngClass]="ElLink1 ? 'link1 ' : 'link2' "

  protected PositionInitial = 0; // window.scrollY;

  @HostListener('window.resize', ['$event'])
  public ResizeSlider(event: Event): void {

    window.addEventListener('resize', () => {
      const anchoWindow = window.innerWidth;
      const altoWindow = window.innerHeight;
      const NavSection = this.NavSection.nativeElement.offsetWidth;
      // console.log(`\n\nWindow: ((${NavSection}))\n`);
      // console.log(`Window: ((${anchoWindow}px)) alto: ((${altoWindow}))\nAlto de footer: ((..))\n\nAltura de this.parrafoBox: (( ${this.parrafoBox.nativeElement.offsetTop}px ))`);
      if (anchoWindow <= 550) {        
        // this.porcentaje = Number(60);
        // console.log(`Resolución menor a 550px ${anchoWindow}`);
      } else {
        this.btnCheck.nativeElement.checked = false;
        this.Check.next(false);
        this.Close();
        // this.porcentaje = Number(40);
        // console.log(`Resolución es mayor a 550px`);
      } // else;

    }); // resize; 

  } // this.ResizeSlider($event);
 

  protected myScroll() { // (window:scroll)="myScroll();" // de forma dinámica;
    const NavSection = document.getElementById('NavSection');
    let PositionActual = window.scrollY;
    // this.Nom();
    // NavSection?.classList.toggle("NavToggle", window.scrollY > 0);
    // background: transparent;
    // background: rgba(0, 50, 150, .4);
    if (this.PositionInitial >= PositionActual) {
      this.renderer.setStyle(NavSection, 'background', null);
      NavSection?.classList.remove('NavToggle');
    } else {
      if (this.PositionInitial >= 60) this.renderer.setStyle(NavSection, 'background', 'transparent');
      NavSection?.classList.add('NavToggle');
    } // else;
    this.Parrafo2 = this.PositionInitial.toString();
    console.log(`ScrollY Inicial: (${this.PositionInitial})\nScrollY Actual: (${PositionActual})`);
    this.PositionInitial = PositionActual;
  }; // myScroll();


  public logoff() {
    window.location.href = 'login?action=5';
    // window.location.reload();
  } // logoff;






  /* openModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden"; // Deshabilita el scroll del fondo
      // this.renderer.setStyle(document.body, "overflow", "");
    }
  } */

  /* closeModal() {
    const modal = document.getElementById("myModal");
    if (modal) {
      modal.style.display = "none";
      // document.body.style.overflow = "auto"; // Vuelve a habilitar el scroll
      this.renderer.setStyle(document.body, "overflow", "auto");
    }
  } */



} // NavComponent;
