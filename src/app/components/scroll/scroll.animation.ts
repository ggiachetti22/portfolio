import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})

export class ScrollAnimationDirective implements OnInit {

    protected observer!: IntersectionObserver;
  
    constructor(private elRf: ElementRef, private renderer: Renderer2) {}
  
    ngOnInit(): void {
      this.createObserver();
    } // ngOnInit;
  
    public createObserver(): void {

      const options = {
        root: null, // Usar el viewport actual
        threshold: 0.01 // Comienza la animación cuando el 0.1: 10% del componente es visible y 0.01: el 1%
      };
  
      this.observer = new IntersectionObserver( (entries) => {

        entries.forEach( (entry) => {

          if (entry.isIntersecting) {
            this.renderer.addClass(this.elRf.nativeElement, 'visible');
          } else {
            this.renderer.removeClass(this.elRf.nativeElement, 'visible');
          } // else;

        }); // forEach;

      } , options);
  
      this.observer.observe(this.elRf.nativeElement);

    } // createObserver;


  } // ScrollAnimationDirective;