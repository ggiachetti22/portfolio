import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';
import { BannerComponent } from '../banner/banner.component';


@Component({
  selector: 'app-section-intro',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    BannerComponent
  ],
  templateUrl: './section-intro.component.html',
  styleUrl: './section-intro.component.css'
})

export class SectionIntroComponent {
} // SectionIntroComponent;

