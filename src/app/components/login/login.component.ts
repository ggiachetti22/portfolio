import { Component, OnInit } from '@angular/core';
import { TitleServices } from '../servicios/title.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(private titleService: TitleServices) {} // constructor;

  public ngOnInit(): void {
    this.titleService.AddTitle(this.title);
  } // this.ngOnInit();

  protected title: string = `Login Pages`;

} // LoginComponent;
