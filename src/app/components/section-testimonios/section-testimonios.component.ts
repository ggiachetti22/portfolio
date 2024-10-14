import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';
import { TestimoniosComponent } from '../testimonios/testimonios.component';

@Component({
  selector: 'app-section-testimonios',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    TestimoniosComponent
  ],
  templateUrl: './section-testimonios.component.html',
  styleUrl: './section-testimonios.component.css'
})
export class SectionTestimoniosComponent {

}
