import { Component } from '@angular/core';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    ScrollAnimationDirective
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})

export class FooterComponent {
} // FooterComponent;

