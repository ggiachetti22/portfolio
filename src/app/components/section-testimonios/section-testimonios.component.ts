import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';

@Component({
  selector: 'app-section-testimonios',
  standalone: true,
  imports: [
    ScrollAnimationDirective
  ],
  templateUrl: './section-testimonios.component.html',
  styleUrl: './section-testimonios.component.css'
})
export class SectionTestimoniosComponent {

}
