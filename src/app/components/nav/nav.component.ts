import { NgClass } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';

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

  public UserSession:  any;
  
  constructor(protected renderer: Renderer2, protected router: Router, private route: ActivatedRoute) { } // constructor();

  ngOnInit(): void {

    this.route.queryParams.subscribe(p => {
      this.accion = parseInt(p['action'], 10); // 10 especificación de la base decimal;
      console.log(`(this.accion: ${this.accion})`);
      this.LinkActivo();
    });

    this.route.snapshot.params['ElID'];

    this.iniciar();

    this.ResizeSlider(this.event);

  } // ngOnInit();

  
  public iniciar(): void {
    setTimeout( () => {
      this.route.queryParams.subscribe( act => {
        this.btnCheck.nativeElement.checked = false;
        this.Cerrar();
        // const action = act['action'];
        // console.log(`this.route.queryParams: (`, action, `)`);
      }); // this.route.queryParams;
    },10);
  } // this.iniciar();



  public QueryParam(activateRoute: ActivatedRoute) {

    activateRoute = this.route;

    activateRoute.queryParams.subscribe(p => {

      this.accion = parseInt(p['action'], 10); // 10 especificación de la base decimal;

      console.log(`this.accion: ${this.accion}`);

      this.LinkActivo();
    
    });

    activateRoute.snapshot.params['ElID'];
    
  } // this.QueryParam();


  public Param(): void {
    this.porcentaje = Number(0);
    this.renderer.setStyle(this.navegador1.nativeElement, 'left', `0%`);
    // this.renderer.setStyle(this.navegador2.nativeElement, 'right', `0%`);
    // this.renderer.setStyle(this.navegador2.nativeElement, 'background', `red`);
  } // this.Param();



  public LinkActivo() {

    this.ValueDefault();
    if (this.accion === 1) {
      this.ElLink1 = true;
      console.log(`Acción: ${this.accion}\nValor 1: ${this.ElLink1}\nValor 2: ${this.ElLink2}\nValor 3: ${this.ElLink1}`);
    } else if (this.accion === 2) {
      this.ElLink2 = true;
      console.log(`Acción: ${this.accion}\nValor 1: ${this.ElLink1}\nValor 2: ${this.ElLink2}\nValor 3: ${this.ElLink2}`);
    } else if (this.accion === 3) {
      this.ElLink3 = true;
      console.log(`Acción: ${this.accion}\nValor 1: ${this.ElLink1}\nValor 2: ${this.ElLink2}\nValor 3: ${this.ElLink3}`);
    } 

    /*
     else if (this.accion === 4) {
      this.ElLink4 = true;
      console.log(`Acción: ${this.accion}\nValor 4: ${this.ElLink1}\nValor 2: ${this.ElLink2}\nValor 3: ${this.ElLink4}`);
    } else if (this.accion === 5) {
      this.ElLink5 = true;
      console.log(`Acción: ${this.accion}\nValor 5: ${this.ElLink1}\nValor 2: ${this.ElLink2}\nValor 3: ${this.ElLink5}`);
    }
      */
    
    else {
      this.ValueDefault();
      console.log("No es igual a nunguno..!");
    } // else;
  
  } // this.LinkActivo();



  public ValueDefault() {
    this.ElLink1 = false;
    this.ElLink2 = false;
    this.ElLink3 = false;
  } // this.ValueDefault();
  


  public V() {
    if (isNaN(this.accion)) {
      this.ElLink1 = true;
    } // if;
  } // V();



  @ViewChild("link1") link1!: ElementRef;
  @ViewChild("link2") link2!: ElementRef;
  @ViewChild("link3") link3!: ElementRef;


  @ViewChild('NavSection') NavSection!: ElementRef;
  @ViewChild("boxsection") boxsection!: ElementRef;
  @ViewChild("btnCheck") btnCheck!: ElementRef;
  @ViewChild("navegador1") navegador1!: ElementRef;
  // @ViewChild("navegador2") navegador2!: ElementRef;

  @ViewChild("parrafo1", { static: false }) parrafo1!: ElementRef;
  @ViewChild("parrafo2", { static: false }) parrafo2!: ElementRef;
  @ViewChild("parrafoBox", { static: false }) parrafoBox!: ElementRef;

  @ViewChild("MySection", { static: false}) MySection!: ElementRef;

  public Parrafo1: String = '↑';
  public Parrafo2: String = 'Hola';

  private porcentaje: Number = 0;
  public event!: Event;

  public accion: number = 0;
  public ID: number = 0;  
  public ElLink1: boolean = false;
  public ElLink2: boolean = false;
  public ElLink3: boolean = false;
  // public ElLink4: boolean = false;
  // public ElLink5: boolean = false;

  public Check: boolean = false;

  public BtnMenu(): void {
    const NavSection = this.NavSection.nativeElement.offsetWidth;
    const Check = !this.btnCheck.nativeElement.checked;
    this.Check = Check;

    if (NavSection <= 550 ) {
      this.porcentaje = Number(60);
    } else {
      this.porcentaje = Number(40);
    } // else;
    
    console.log(`Check: ((${this.Check}))\nCheck: ${Check}`);

    if (Check) {
      this.renderer.setStyle(this.MySection.nativeElement, 'background', 'rgba(0,0,0, .5)');

      this.renderer.setStyle(this.boxsection.nativeElement, 'z-index', `90`);
      this.renderer.setStyle(this.navegador1.nativeElement, 'left', `0%`);
      // this.renderer.setStyle(this.navegador2.nativeElement, 'right', `0%`);
      console.log(`Check True: (${Check})\n((${this.porcentaje}))`);
    } else {
      this.Cerrar();
      console.log(`Check False: (${Check})\n((${this.porcentaje}))`);
    } // else;

    console.log(`Window: ((${NavSection}))\n-------------------------\n`)

  } // this.BtnMenu();

  private Cerrar(): void {
    // if(!this.Check){
      const NavSection = this.NavSection.nativeElement.offsetWidth;
      const Check = !this.btnCheck.nativeElement.checked;

      /* if (NavSection <= 550 ) {
        this.porcentaje = Number(60);
      } else {
        this.porcentaje = Number(40);
      } // else; */

      this.porcentaje = Number(75);

      this.renderer.setStyle(this.MySection.nativeElement, 'background', 'transparent');

      this.renderer.setStyle(this.boxsection.nativeElement, 'z-index', `-10`);
      this.renderer.setStyle(this.navegador1.nativeElement, 'left', `-${this.porcentaje}%`);
      // this.renderer.setStyle(this.navegador2.nativeElement, 'right', `-${this.porcentaje}%`);
      // console.log(`Check Current: ((${this.Check}))`);
    // } //
  } // this.Cerrar();


  public Porcentaje(n: Number): Number {
    // let n: Number = 0;
    const NavSection = this.NavSection.nativeElement.offsetWidth;
    const Check = !this.btnCheck.nativeElement.checked;
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

      console.log(`\n\nWindow: ((${NavSection}))\n`);
      console.log(`Window: ((${anchoWindow}px)) alto: ((${altoWindow}))\nAlto de footer: ((..))\n\nAltura de this.parrafoBox: (( ${this.parrafoBox.nativeElement.offsetTop}px ))`);

      if (anchoWindow <= 550) {        
        // this.porcentaje = Number(60);
        // console.log(`Resolución menor a 550px ${anchoWindow}`);
      } else {
        this.btnCheck.nativeElement.checked = false;
        this.Cerrar();
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
    if (this.PositionInitial >= PositionActual) {
      
      NavSection?.classList.remove('NavToggle');
    } else {

      this.btnCheck.nativeElement.checked = false;
      this.Cerrar();

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

} // NavComponent;
