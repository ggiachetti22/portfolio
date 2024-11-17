import { NgOptimizedImage } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css',
})
export class SliderComponent implements AfterViewInit, OnInit {

@ViewChild('ContentBox') ContentBox!: ElementRef;
@ViewChild('fondo') fondo!: ElementRef;
@ViewChild('Navegadores') Navegadores!: ElementRef;
@ViewChild('BtnPrev') BtnPrev!: ElementRef;
@ViewChild('BtnNext') BtnNext!: ElementRef;
@ViewChild('play') play!: ElementRef;

public n: Number = 0;
public valorActual: Number = 25;
public valor: Number = 50;
public numero = new BehaviorSubject<Number>(0);

public VAfter: Number = 0;
public V: Number = 1;
public v: Number = (Number(this.valor) * Number(this.V)) + Number(this.valorActual);
private myFigures: HTMLElement[] = [];
private myNavigate: HTMLElement[] = [];
private myNavigateDiv: HTMLElement[] = [];
private btn: String[] = ["rgba(255, 255, 255,.08)", "rgba(255, 255, 255,.02)"]
private numeroArray: Number[] = [];
private sliderArray: String[] = [
  '../../../assets/img/0f4000a6-4710-432f-9f27-6b0b817abb24.webp',
  '../../../assets/img/12386a8b-ab44-4071-84f7-aceb9d27d1a5.webp',
  '../../../assets/img/15515204-22e9-4a58-bd9a-e8d46e29a89d.webp',
  '../../../assets/img/308c44ff-5d9e-4344-8ffe-0bc874574a13.webp',
  '../../../assets/img/d75583a9-4bd1-4004-802b-6f814c04a83f.webp'
];


private figureAltoPrev: Number = 400;
private figureAltoNext: Number = 400;
private event!: Event;
private intervalSlider: any;

constructor(private render: Renderer2, private router: Router) {
} // constructor;


ngOnInit(): void {
  setTimeout( () => { this.Current(); } , 250);
  // this.ResizeSlider(this.event);
} // ngOnInit;


ngAfterViewInit(): void {

  const figures = this.ContentBox.nativeElement.querySelectorAll('.figure'); // nativeElement por document
  const navigate = this.Navegadores.nativeElement.querySelectorAll('.navig');
  const navigateDiv = this.Navegadores.nativeElement.querySelectorAll('div');


  this.myFigures = Array.from(figures) as HTMLElement[];
  this.myNavigate = Array.from(navigate) as HTMLElement[];
  this.myNavigateDiv = Array.from(navigateDiv) as HTMLElement[];
      
  this.Navegador();
  this.ResizeSlider(this.event);


  // this.Current();

  this.Translate();
  this.IntervalSlider();

  this.clickFondo(1);
  this.Pintar(Number(this.V));

  this.arr();
  // console.log(`Array de números: [${this.numeroArray}]`);

  
  // this.valorActual = Number(this.valorActual) + (Number(this.valor) * Number(this.V));
  // console.log(`Valor Actual: (${this.valorActual})`);
  
} // ngAfterViewInit


public arr(): void {
  for (let k = 0; k < this.myFigures.length - 2; k++) {
    this.numeroArray[k] = k;
  } // for;

  // console.log(`Array de números: [${this.numeroArray}]`);
} // this.arr();

public IntervalSlider() {
  this.Current();
  this.ClearIntervalSlider();
  this.intervalSlider = setInterval(() => { this.nextClick(); }, 7000);
  // this.ClearIntervalSlider();
} // this.IntervalSlider();

public ClearIntervalSlider() {
  clearInterval(this.intervalSlider);
} // this.ClearIntervalSlider();


public clickPlay(): void {
  this.ClearIntervalSlider();
  this.n = 1 - Number(this.n);
  if (Number(this.n) === 0) {
    this.IntervalSlider();
    this.Pintar(Number(this.V));
    if (Number(this.V) === 0) this.Pintar(Number(this.myFigures.length - 3)); // if;
  } else {
    this.ClearIntervalSlider();
    this.Despintar();
  } // else;
  this.render.setStyle(this.play.nativeElement, 'background', `${this.btn[Number(this.n)]}`);
  // console.log(`Numero: ((${this.n}))`);
} // this.clickPlay();


public Current() {
  this.figureAltoPrev = Number(this.myFigures[Number(this.V)].offsetHeight);
  this.figureAltoNext = Number(this.myFigures[Number(this.V)].offsetHeight);
  this.render.setStyle(this.BtnPrev.nativeElement, 'height', `${this.figureAltoPrev}px`);
  this.render.setStyle(this.BtnNext.nativeElement, 'height', `${this.figureAltoNext}px`);
  console.log(`offsetHeight: ${this.figureAltoPrev}px == ${this.figureAltoNext}px\nActual: ${this.V}`);
} // this.Current();

public Pintar(n: Number) {
  this.myNavigate[Number(n)].style.background = 'rgba(255, 255, 255, .1)';
  this.myNavigate[Number(n)].style.borderRadius = '2rem';
  this.myNavigate[Number(n)].style.width = '100px';
  this.myNavigateDiv[Number(n)].style.transition = 'width 7s ease-in-out';
  this.myNavigateDiv[Number(n)].style.width = '100px';
  this.myNavigateDiv[Number(n)].style.background = 'rgb(255, 255, 255)';
} // this.Pintar(Number(this.V));

public Despintar() {
  for (let k = 0; k < this.myNavigate.length - 1; k++) {
    this.myNavigate[k].style.borderRadius = '50%';
    this.myNavigate[k].style.width = '7px';
    this.myNavigate[k].style.background = 'rgb(255, 255, 255)';
    this.myNavigateDiv[k].style.transition = 'none';
    this.myNavigateDiv[k].style.width = '0px';
  } // for;
} // this.Despintar();

public ResetPintar(n: Number) {
  this.myNavigateDiv[Number(n)].style.transition = 'none';
  this.myNavigateDiv[Number(n)].style.width = '0px';
  setTimeout(() => {
    this.myNavigateDiv[Number(n)].style.transition = 'width 7s ease-in-out';
    this.myNavigateDiv[Number(n)].style.width = '100px';
    this.myNavigateDiv[Number(n)].style.background = 'rgb(255, 255, 255)';
  }, 1);
} // this.ResetPintar(Number(n));

public Infinite(vl: Number) {
  this.VAfter = Number(this.V); // After;
  this.Despintar();
  this.render.setStyle(this.ContentBox.nativeElement, 'transition', 'all .3s ease-in-out');
  // console.log(`Valor previo: (${(Number(this.V))}) y this.VAfter: ((${Number(this.VAfter)}))`);
  // this.V = (Number(vl) + Number(this.numeroArray.length)) % this.numeroArray.length; // Valor;
  this.V = (Number(vl) + Number(this.myFigures.length)) % this.myFigures.length; // Valor;
  // console.log(`Valor actual: (${(Number(this.V))})`);
  if (Number(this.V) === 0) {
     setTimeout(() => {
      this.render.setStyle(this.ContentBox.nativeElement, 'transition', 'none');
       this.V = Number(this.myFigures.length - 3);
       this.Translate();
       if (this.n === 0) { this.Pintar(Number(this.V)); this.IntervalSlider(); } // if;
      // console.log(`Nuevo valor actual0: (${(Number(this.V))})`);
    }, 300);
  } // if;
  if (Number(this.V) === Number(this.myFigures.length - 3)) { 
    setTimeout(() => {
      this.render.setStyle(this.ContentBox.nativeElement, 'transition', 'none');
      this.V = 0;
      this.Translate();
      this.clickFondo(this.V);
      if (this.n === 0) { this.Pintar(Number(this.V)); this.IntervalSlider(); } // if;
      // console.log(`Nuevo valor actual.length - 3: (${(Number(this.V))})`);
    }, 300);
  } // if;
  // this.ResizeSlider();

  this.Despintar();
  this.ClearIntervalSlider();
  if (this.n === 0) { this.Pintar(Number(this.V)); this.IntervalSlider(); } // if;
  this.Translate();
  this.Current();
  this.clickFondo(this.V);
} // this.Infinite(this.V);


public prevClick() {
  this.Infinite(Number(this.V) - 1); // - 1
  console.log(`prevClickAfter: ${this.V}`);
  if (Number(this.V) === Number(this.myFigures.length - 1)) {
    this.render.setStyle(this.ContentBox.nativeElement, 'transition', 'none');
    this.V = Number(this.myFigures.length - 3);
    this.Translate();
    this.clickFondo(this.V);
    setTimeout(() => {
      this.render.setStyle(this.ContentBox.nativeElement, 'transition', 'all .3s ease-in-out');
      this.V = Number(this.myFigures.length - 4);
      this.clickFondo(this.V);
      if (this.n === 0) { this.Pintar(Number(this.V)); this.IntervalSlider(); } // if;
      this.Translate();
      this.clickFondo(this.V);
    }, 300);
  } // if;
} // prevClick();


public nextClick() {
  this.Infinite(Number(this.V) + 1); // + 1
  // console.log(`nextClickAfter: ${this.V}`);
  if (Number(this.V) === Number(this.myFigures.length - 2)) {
    this.render.setStyle(this.ContentBox.nativeElement, 'transition', 'none');
    this.V = 0;
    this.Translate();
    this.clickFondo(this.V);
    setTimeout(() => {
      this.render.setStyle(this.ContentBox.nativeElement, 'transition', 'all .3s ease-in-out');
      this.V = 1;
      this.clickFondo(this.V);
      if (this.n === 0) { this.Pintar(Number(this.V)); this.IntervalSlider(); } // if;
      this.Translate();
      this.clickFondo(this.V);
    }, 300);
  } // if;
  // this.clickFondo(this.V);
} // nextClick();



private clickFondo(n: Number):  void {
  // console.log(`Click Fondo: (${n})}`); // ${this.fondo.nativeElement}
  if(n === this.sliderArray.length) n = 0;
  this.render.setStyle(this.fondo.nativeElement, 'background', `url('${this.sliderArray[Number(n)]}') no-repeat center center / cover fixed`); // no-repeat center center / cover fixed;
} // this.clickFondo(this.V);



protected Translate() {
  const v = (Number(this.valor) * Number(this.V)) + Number(this.valorActual);
  this.ContentBox.nativeElement.style.marginLeft = `-${v}%`;
} // this.Translate();


@HostListener('window.resize', ['$event'])
public ResizeSlider(event: Event): void {

  window.addEventListener('resize', () => {
    const anchoWindow = window.innerWidth;
    // const figureAlto = Number(this.myFigures[0].offsetHeight);

    // console.log(`Ancho de Window: ((${anchoWindow}px))`);
    if (anchoWindow <= 550) {
      // console.log(`Resolución de wondows es menor a 550px`);
    } // if;

    this.Current();

  }); // resize;

} // this.ResizeSlider();



public Navegador() {
  this.myNavigate.forEach((nav, n) => {
    nav.addEventListener('click', () => {
      this.render.setStyle(this.ContentBox.nativeElement, 'transition', 'all .3s ease-in-out');
      this.Infinite(n);
      this.Translate();
      this.ClearIntervalSlider();
      this.IntervalSlider();
      this.ResetPintar(Number(n));
      this.clickFondo(n);
      // this.Pintar(Number(n));
    }); // addEventListener;
  }); // forEach;    
} // this.Navegador();


} // SliderComponent;
