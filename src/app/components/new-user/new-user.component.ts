import { Component, OnInit } from '@angular/core';
import { TitleServices } from '../servicios/title.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    LoginComponent,
    RouterModule
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})

export class NewUserComponent implements OnInit {

  constructor(private titleService: TitleServices) {} // constructor;

  public ngOnInit(): void {
    this.titleService.AddTitle(this.title);
  } // this.ngOnInit();

  
  protected title: string = `Create Login`;
  public home: string = 'home?action=1';
  public login: string = 'login?action=3';

  public homeLink() {
    window.location.href = this.home;
  } // homeLink();

  public loginLink() {
    window.location.href = this.login;
  } // loginLink();


} // NewUserComponent;
