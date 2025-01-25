import { Component, OnInit } from '@angular/core';
import { MailComponent } from '../mail/mail.component';
import { SectionIntroComponent } from '../section-intro/section-intro.component';
import { SectionPortfolioComponent } from '../section-portfolio/section-portfolio.component';
import { SectionServicesComponent } from '../section-services/section-services.component';
import { SectionTestimoniosComponent } from '../section-testimonios/section-testimonios.component';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';
import { TitleServices } from '../servicios/title.service';
import { BannerComponent } from '../banner/banner.component';
// import { SubMenuComponent } from '../sub-menu/sub-menu.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    // SubMenuComponent,
    ScrollAnimationDirective,
    MailComponent,
    SectionIntroComponent,
    SectionPortfolioComponent,
    SectionServicesComponent,    
    SectionTestimoniosComponent,
    BannerComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private titleService: TitleServices) {} // constructor;

  public ngOnInit(): void {

    this.titleService.AddTitle(this.title);
    
  } // this.ngOnInit();

  protected title: string = `Home Pages`;

} // HomeComponent;
