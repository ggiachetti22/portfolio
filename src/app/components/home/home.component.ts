import { Component } from '@angular/core';
import { MailComponent } from '../mail/mail.component';
import { SectionIntroComponent } from '../section-intro/section-intro.component';
import { SectionPortfolioComponent } from '../section-portfolio/section-portfolio.component';
import { SectionServicesComponent } from '../section-services/section-services.component';
import { SectionTestimoniosComponent } from '../section-testimonios/section-testimonios.component';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    MailComponent,
    SectionIntroComponent,
    SectionPortfolioComponent,
    SectionServicesComponent,    
    SectionTestimoniosComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

} // HomeComponent;
