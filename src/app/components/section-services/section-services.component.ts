import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';

@Component({
  selector: 'app-section-services',
  standalone: true,
  imports: [
    ScrollAnimationDirective
  ],
  templateUrl: './section-services.component.html',
  styleUrl: './section-services.component.css'
})
export class SectionServicesComponent {

}
