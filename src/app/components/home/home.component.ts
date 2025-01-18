import { Component, OnInit } from '@angular/core';
import { MailComponent } from '../mail/mail.component';
import { SectionIntroComponent } from '../section-intro/section-intro.component';
import { SectionPortfolioComponent } from '../section-portfolio/section-portfolio.component';
import { SectionServicesComponent } from '../section-services/section-services.component';
import { SectionTestimoniosComponent } from '../section-testimonios/section-testimonios.component';
import { ScrollAnimationDirective } from '../scroll/scroll.animation';
import { SubMenuComponent } from '../sub-menu/sub-menu.component';
import { TitleServices } from '../servicios/title.service';
import { environment } from '../../url/url.component';
import * as signalR from '@microsoft/signalr';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ScrollAnimationDirective,
    // SubMenuComponent,
    MailComponent,
    SectionIntroComponent,
    SectionPortfolioComponent,
    SectionServicesComponent,    
    SectionTestimoniosComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private titleService: TitleServices) {} // constructor;

  public ngOnInit(): void {

    this.titleService.AddTitle(this.title);

    console.log("this.MyConnection(); \n");
    this.MyConnection();
    
  } // this.ngOnInit();

  protected title: string = `Home Pages`;
  private readonly apiUrlMessager: string = environment.apiMessager;

  public MyConnection() : void {
    let connect = new signalR.HubConnectionBuilder().withUrl(this.apiUrlMessager + '/chatHub').build();
    connect.on("SendtMessageGroup", conn => {
      console.log("");
      console.log(conn);
      console.log("");
    });
    connect.start().then(() => console.log("Conexión éxitosa..!!"));
    // connect.start().then(() => connect.invoke("SendtMessageGroup", "Hola Mundo..!")); //.catch(er => console.error(er));
  } // this.MyConnection();

  

} // HomeComponent;
