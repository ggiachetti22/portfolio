import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';

@Component({
  selector: 'app-section-intro',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    SliderComponent
  ],
  templateUrl: './section-intro.component.html',
  styleUrl: './section-intro.component.css'
})
export class SectionIntroComponent {

} // SectionIntroComponent;
