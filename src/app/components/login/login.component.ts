import { Component, OnInit } from '@angular/core';
import { TitleServices } from '../servicios/title.service';
import { NewUserComponent } from '../new-user/new-user.component';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginServices } from '../servicios/login.service';
import { BehaviorSubject } from 'rxjs';

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


  constructor(private titleService: TitleServices, private router: Router, private route: ActivatedRoute) // private loginService: LoginServices
  {
    // window.location.href = "/home?action=1";
  } // constructor;

  public ngOnInit(): void {
    this.titleService.AddTitle(this.title);
  } // this.ngOnInit();

  protected title: string = `Login Pages`;


  public N = new BehaviorSubject<Number>(0);
  public n: Number = 0;
  public Ingresar: String = "Ingresar";
  public Ingreso: String[] = ["Ingresar", "Ingresado"];

  public Nombre = new FormControl('');
  public Clave = new FormControl('');

  public home: string = 'home?action=1';

  public homeLink() {
    window.location.href = this.home;
  } // homeLink();

  // DSLOIS, 1234;

  public loginEnter() {
    this.N.next(Number(1 - Number(this.N.value)));
    this.n = Number(this.N.asObservable());
    this.Ingresar = this.Ingreso[Number(this.N.value)];
    // console.log(`Numero Subject: ${this.N.asObservable()} / / ${this.N.value}`);

    const us: String = `${this.Nombre.value}`;
    const ps: String = `${this.Clave.value}`;

  /* this.loginService.loginUser(us, ps).subscribe({
      next: (resp) => {
      const rN: Number = resp.success;
      const tK: string = resp.data;

      console.log(rN);
      console.log("\n");
      console.log(tK);

      if (resp.success === 1) {
        // this.router.navigate(['/home']); // /home?action=1
        window.location.href = '/chat/0?action=2';
        // window.location.reload();
        alert(`Sesión de: ${this.loginService.myUserName}!`);
      } // if;
    },

      error: (er) => { console.error(er); }

    }); // subcribe; */


  } // loginEnter;



} // LoginComponent;
