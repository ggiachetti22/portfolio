import { Component } from '@angular/core';
import { SliderComponent } from '../slider/slider.component';

@Component({
  selector: 'app-section-intro',
  standalone: true,
  imports: [
    SliderComponent
  ],
  templateUrl: './section-intro.component.html',
  styleUrl: './section-intro.component.css'
})
export class SectionIntroComponent {

} // SectionIntroComponent;
