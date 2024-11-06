import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TitleServices } from '../servicios/title.service';
import { NewUserComponent } from '../new-user/new-user.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginServices } from '../servicios/login.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../url/url.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NewUserComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {


  constructor(private titleService: TitleServices, private router: Router, private route: ActivatedRoute, private loginService: LoginServices, private render: Renderer2) // private loginService: LoginServices
  {
    if (this.loginService.userData) {
      // this.router.navigate(['/home']); // home?action=1
      window.location.href = "/home?action=1";
      // window.location.reload();
    } // if;
  } // constructor;

  public ngOnInit(): void {
    this.titleService.AddTitle(this.title);
  } // this.ngOnInit();

  protected title: string = `Login Pages`;

  private readonly LoginUser: String = environment.apiUrlLoginUser + `/api/Access/LoginAuth`;

  public N = new BehaviorSubject<Number>(0);
  public n: Number = 0;
  public Ingresar: String = "Ingresar";
  public Ingreso: String[] = ["Ingresar", "Ingresado"];

  public Nombre = new FormControl('');
  public Clave = new FormControl('');

  private cl: any;

  @ViewChild("myUserNameEmail") myUserNameEmail!: ElementRef;
  @ViewChild("myPassword") myPassword!: ElementRef;
  @ViewChild("EmailRef") EmailRef!: ElementRef;
  @ViewChild("PassRef") PassRef!: ElementRef;
  public MyEmal: string = '';
  public MyPass: string = '';

  public loginEnter() {
    clearTimeout(this.cl);
    if(this.Clave.value === '' && this.Nombre.value === ''){
      this.Pintar();
      this.MyEmal = `Los Campos están vacíos`;
      this.MyPass = `Los Campos están vacíos`;
    } else if(this.Nombre.value === ''){
      this.render.setStyle(this.myUserNameEmail.nativeElement, "outline", "2px solid coral");
      this.render.setStyle(this.EmailRef.nativeElement, "opacity", "1");
      this.MyEmal = `El nombre de usuario es requerido`;
    } else if(this.Clave.value === '') {
      this.render.setStyle(this.myPassword.nativeElement, "outline", "2px solid coral");
      this.render.setStyle(this.PassRef.nativeElement, "opacity", "1");
      this.MyPass = `El password es requerido`;
    } else {
      this.Login();
    } //else

    this.cl = setTimeout( () => this.Despintar() , 3000);

  } // this.loginEnter();

  private Pintar(): void {
    this.render.setStyle(this.myUserNameEmail.nativeElement, "outline", "2px solid coral");
    this.render.setStyle(this.EmailRef.nativeElement, "opacity", "1");
    this.render.setStyle(this.myPassword.nativeElement, "outline", "2px solid coral");
    this.render.setStyle(this.PassRef.nativeElement, "opacity", "1");
  } // this.Pintar();

  private Despintar(): void {
    this.render.setStyle(this.myUserNameEmail.nativeElement, "outline", null);
    this.render.setStyle(this.EmailRef.nativeElement, "opacity", null);
    this.render.setStyle(this.myPassword.nativeElement, "outline", null);
    this.render.setStyle(this.PassRef.nativeElement, "opacity", null);
  } // this.Despintar();

  protected Login(): void {
    console.log(`Ruta: ((${this.LoginUser}))`);

    this.N.next(Number(1 - Number(this.N.value)));
    this.n = Number(this.N.asObservable());
    this.Ingresar = this.Ingreso[Number(this.N.value)];

    const us: String = `${this.Nombre.value}`;
    const ps: String = `${this.Clave.value}`;

    this.loginService.loginUser(us, ps).subscribe({
      next: (resp) => {
        if (resp.success === 1) {
          window.location.href = '/chat/?action=2';
          alert(`Sesión de: ${this.loginService.myUserName}!`);
        } else {
          console.log(`Response: ${resp.upMessage}`);
          this.MyEmal = `${resp.upMessage}`;
          this.MyPass = `${resp.upMessage}`;
          this.Pintar();
          this.myUserNameEmail.nativeElement.setValue('');
          this.myUserNameEmail.nativeElement.focus();
        } // else;
      },
      error: (er) => { console.error(er); }
    }); // subcribe;
  } // this.Login();




} // LoginComponent;
