import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TitleServices } from '../servicios/title.service';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginServices } from '../servicios/login.service';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../url/url.component';
import { NgClass } from '@angular/common';
// import { NewUserComponent } from '../new-user/new-user.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NgClass
    // NewUserComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, AfterViewInit {

  public valor: boolean = false;

  constructor(private changeDtRef: ChangeDetectorRef, private titleService: TitleServices, private router: Router, private route: ActivatedRoute, private loginService: LoginServices, private render: Renderer2) // private loginService: LoginServices
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


  public ngAfterViewInit(): void {

    this.titleService.Light.subscribe( (v) => {
      this.valor = Boolean(v);
    } ); // subscribe;
    
    this.changeDtRef.detectChanges();

  } // ngAfterViewInit();

  protected title: string = `Login Pages`;

  private readonly LoginUser: String = environment.apiUrlLoginUser + `/api/Access/LoginAuth`;

  public N = new BehaviorSubject<Number>(0);
  public n: Number = 0;
  public Ingresar: String = "Ingresar";
  public Ingreso: String[] = ["Ingresar", "Ingresado"];

  public Nombre = new FormControl('');
  public Clave = new FormControl('');

  private cl: any;

  @ViewChild("myUserNameEmail", {static: false}) myUserNameEmail!: ElementRef;
  @ViewChild("myPassword", {static: false}) myPassword!: ElementRef;
  @ViewChild("EmailRef", {static: false}) EmailRef!: ElementRef;
  @ViewChild("PassRef", {static: false}) PassRef!: ElementRef;
  public MyEmal: string = '';
  public MyPass: string = '';

  public loginEnter() {
    clearTimeout(this.cl);
    if (this.Clave.value === '' && this.Nombre.value === ''){
      this.Pintar();
      this.MyEmal = `Los campos están vacíos`;
      this.MyPass = `Los campos están vacíos`;
    } else if (this.Nombre.value === ''){
      this.render.setStyle(this.myUserNameEmail.nativeElement, "outline", "2px solid coral");
      this.render.setStyle(this.EmailRef.nativeElement, "opacity", "1");
      this.MyEmal = `El nombre de usuario es requerido`;
    } else if (this.Clave.value === '') {
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
    // console.log(`Ruta: ((${this.LoginUser}))`);

    this.N.next(Number(1 - Number(this.N.value)));
    this.n = Number(this.N.asObservable());
    this.Ingresar = this.Ingreso[Number(this.N.value)];

    const us: String = `${this.Nombre.value}`;
    const ps: String = `${this.Clave.value}`;

    this.loginService.loginUser(us, ps).subscribe({
      next: (resp) => {
        if (resp.success === 1) {
          alert(`Sesión de: ${this.loginService.myUserName}!`);
          window.location.href = '/chat/?action=2';
        } // if;
      }, error: (er) => {
        this.MyEmal = `Usuario o contraseña son incorrectos`;
        this.MyPass = `Usuario o contraseña son incorrectos`;
        this.Pintar();
        this.myUserNameEmail.nativeElement.setValue('');
        this.myUserNameEmail.nativeElement.focus();
        console.error(er);
      } // error;
    }); // subcribe;
  } // this.Login();




} // LoginComponent;
