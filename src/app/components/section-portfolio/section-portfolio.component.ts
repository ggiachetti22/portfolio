import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';

@Component({
  selector: 'app-section-portfolio',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    SliderComponent
  ],
  templateUrl: './section-portfolio.component.html',
  styleUrl: './section-portfolio.component.css'
})
export class SectionPortfolioComponent {

} // SectionPortfolioComponent;
