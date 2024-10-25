import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { Title } from '@angular/platform-browser';
import { TitleServices } from './components/servicios/title.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavComponent,
    FooterComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {

  constructor(private titleServices: Title, private titleService: TitleServices) {} // constructor;

  public ngOnInit(): void {
    this.titleService.title.subscribe(t => {
      this.title = t;
      this.setTitle(this.title);
      // console.log(`Titulo actual: (${t})`);
    }); // subscribe;
  } // this.ngOnInit();


  public setTitle(newTitle: string) {
    this.titleServices.setTitle(newTitle);
  } // this.setTitle(this.title);


  private title = '';


} // AppComponent;
