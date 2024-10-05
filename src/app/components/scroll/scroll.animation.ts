import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true,
})

export class ScrollAnimationDirective implements OnInit {
    observer!: IntersectionObserver;
  
    constructor(private el: ElementRef, private renderer: Renderer2) {}
  
    ngOnInit() {
      this.createObserver();
    }
  
    createObserver() {
      const options = {
        root: null, // Usar el viewport actual
        threshold: 0.1 // Comienza la animación cuando el 10% del componente es visible
      };
  
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.renderer.addClass(this.el.nativeElement, 'visible');
          } else {
            this.renderer.removeClass(this.el.nativeElement, 'visible');
          }
        });
      }, options);
  
      this.observer.observe(this.el.nativeElement);
    }
  } // ScrollAnimationDirective;