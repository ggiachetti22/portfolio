import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TitleServices } from '../servicios/title.service';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { UserServices } from '../servicios/user.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [
    //LoginComponent,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgClass
  ],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})

export class NewUserComponent implements OnInit, AfterViewInit {

  public valor!: boolean;

  constructor(private changeDtRef: ChangeDetectorRef, private titleService: TitleServices, private userServices: UserServices, private render: Renderer2) {} // constructor;
  // , private userServices: UserServices

  public ngOnInit(): void {
    this.titleService.AddTitle(this.title);
  } // this.ngOnInit();

  public ngAfterViewInit(): void {
    this.titleService.Light.subscribe( (v) => {
      this.valor = Boolean(v);
    } ); // subscribe;
    this.changeDtRef.detectChanges();
  } // ngAfterViewInit();
  
  public UserNameEmail = new FormControl('');
  public Password = new FormControl('');
  public ConfirmarPassword = new FormControl('');
  public UserName = new FormControl('');

  @ViewChild("myUserNameEmail") myUserNameEmail!: ElementRef;
  @ViewChild("myPassword") myPassword!: ElementRef;
  @ViewChild("myPasswordConfirm") myPasswordConfirm!: ElementRef;
  @ViewChild("myUseName") myUseName!: ElementRef;

  @ViewChild("EmailRef") EmailRef!: ElementRef;
  @ViewChild("PassRef") PassRef!: ElementRef;
  @ViewChild("ConfPassRef") ConfPassRef!: ElementRef;
  public MyEmal: string = '';
  public MyPass: string = '';
  public MyConfPass: string = '';

  protected title: string = `Create Login`;
  public home: string = 'home?action=1';
  public login: string = 'login?action=3';

  public homeLink() {
    window.location.href = this.home;
  } // homeLink();

  public loginLink() {
    window.location.href = this.login;
  } // loginLink();

  private cl: any;

  public UserAdd(): void {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    clearTimeout(this.cl);

    if(this.Password.value === '' && this.ConfirmarPassword.value === '' && this.UserNameEmail.value === '') {
      this.Pintar();
    } else if( this.UserNameEmail.value === '' ) {
      this.render.setStyle(this.EmailRef.nativeElement, "opacity", "1");
      this.MyEmal = `El campo mail está vacío`;
      this.render.setStyle(this.myUserNameEmail.nativeElement, "outline", "2px solid coral");
    } else if ( !emailPattern.test(`${this.UserNameEmail.value}`) ) {
      this.render.setStyle(this.EmailRef.nativeElement, "opacity", "1");
      this.MyEmal = `El Mail está mal escrito`;
      this.render.setStyle(this.myUserNameEmail.nativeElement, "outline", "2px solid coral");
    } else if( this.Password.value === '' ) {
      this.render.setStyle(this.PassRef.nativeElement, "opacity", "1");
      this.MyPass = `Completa el password`;
      this.render.setStyle(this.myPassword.nativeElement, "outline", "2px solid coral");
    } else if(Number(this.Password.value?.length) < 8) {
      this.render.setStyle(this.PassRef.nativeElement, "opacity", "1");
      this.MyPass = `El password debe tener mínimo 8 caracteres`;
      this.render.setStyle(this.myPassword.nativeElement, "outline", "2px solid coral");
    } else if( this.ConfirmarPassword.value === '' ) {
      this.render.setStyle(this.ConfPassRef.nativeElement, "opacity", "1");
      this.MyConfPass = `Campo comfirmar password se encuentra vacío`;
      this.render.setStyle(this.myPasswordConfirm.nativeElement, "outline", "2px solid coral");
    } else if (this.Password.value !== this.ConfirmarPassword.value) {
      this.render.setStyle(this.ConfPassRef.nativeElement, "opacity", "1");
      this.MyConfPass = `El password no coincide`;
      this.render.setStyle(this.myPasswordConfirm.nativeElement, "outline", "2px solid coral");
    } else {
      alert(`Se ha creado el usuario \"${this.UserNameEmail}\" con éxito!`);
      this.userServices.CreateUser(this.UserNameEmail, this.Password);
      setTimeout( () => {
        this.ClearInputs();
        window.location.href = '/login?action=3'
      } , 2000);
    } //else;

    clearTimeout(this.cl);
    this.cl = setTimeout( () => this.Despintar(), 3000);

  } // UserAdd();

  protected Pintar(): void {
    this.render.setStyle(this.myUserNameEmail.nativeElement, "outline", "2px solid coral");
    this.render.setStyle(this.myPassword.nativeElement, "outline", "2px solid coral");
    this.render.setStyle(this.myPasswordConfirm.nativeElement, "outline", "2px solid coral");
    this.render.setStyle(this.EmailRef.nativeElement, "opacity", "1");
    this.render.setStyle(this.PassRef.nativeElement, "opacity", "1");
    this.render.setStyle(this.ConfPassRef.nativeElement, "opacity", "1");
    this.MyEmal = `Campo vacío`;
    this.MyPass = `Campo vacío`;
    this.MyConfPass = `Campo vacío`;
  } // this.Pintar();

  protected Despintar(): void {
    this.render.setStyle(this.myUserNameEmail.nativeElement, "outline", null);
      this.render.setStyle(this.myPassword.nativeElement, "outline", null);
      this.render.setStyle(this.myPasswordConfirm.nativeElement, "outline", null);
      this.render.setStyle(this.EmailRef.nativeElement, "opacity", null);
      this.render.setStyle(this.PassRef.nativeElement, "opacity", null);
      this.render.setStyle(this.ConfPassRef.nativeElement, "opacity", null);
    /* setTimeout( () => {
    }, 3000); */
  } // this.Despintar();

  protected ClearInputs(): void {
    this.UserNameEmail.setValue('');
    this.Password.setValue('');
    this.ConfirmarPassword.setValue('');
    this.myUserNameEmail.nativeElement.focus();
  } // this.ClearInputs();



} // NewUserComponent;
