import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-section-portfolio',
  standalone: true,
  imports: [
    SliderComponent
  ],
  templateUrl: './section-portfolio.component.html',
  styleUrl: './section-portfolio.component.css'
})
export class SectionPortfolioComponent {

} // SectionPortfolioComponent;
