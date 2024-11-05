import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TitleServices } from '../servicios/title.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserServices } from '../servicios/user.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    LoginComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,    
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})

export class NewUserComponent implements OnInit {

  constructor(private titleService: TitleServices, private userServices: UserServices) {} // constructor;
  // , private userServices: UserServices


  public ngOnInit(): void {
    this.titleService.AddTitle(this.title);
  } // this.ngOnInit();

  
  public UserNameEmail = new FormControl('');
  public Password = new FormControl('');
  public UserName = new FormControl('');

  @ViewChild("myUserNameEmail") myUserNameEmail!: ElementRef;
  @ViewChild("myPassword") myPassword!: ElementRef;
  @ViewChild("myUseName") myUseName!: ElementRef;

  protected title: string = `Create Login`;
  public home: string = 'home?action=1';
  public login: string = 'login?action=3';

  public homeLink() {
    window.location.href = this.home;
  } // homeLink();

  public loginLink() {
    window.location.href = this.login;
  } // loginLink();



  public UserAdd(): void {
    this.userServices.CreateUser(this.UserNameEmail, this.Password);

    // this.UserNameEmail.setValue('');
    // this.Password.setValue('');
    // this.myUserNameEmail.nativeElement.focus();
  } // UserAdd();




} // NewUserComponent;
