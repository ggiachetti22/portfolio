import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, Observable, map, noop } from "rxjs";
import { MyResponse, UserResponse } from "../interface/interfaces";
import { NonNullAssert } from "@angular/compiler";
import { environment } from "../../url/url.component";


const HttpOption = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
    // 'Authorization': `Bearer ${yourToken}` // Opcional
  })
}; // HttpOption;


@Injectable({
  providedIn: 'root'
})

export class LoginServices {

  private readonly LoginUsers: String = `https://www.loginusertoken.somee.com/api/Access/LoginAuth`;
  private readonly LoginUser: String = environment.apiUrlLoginUser + `/api/Access/LoginAuth`;
  // private userSession = new BehaviorSubject<UserResponse | null>(null);
  private userSession: BehaviorSubject<UserResponse | null>;
  private userNameSession: BehaviorSubject<String | null>;

  constructor(private http: HttpClient) {
    this.userSession = new BehaviorSubject<UserResponse | null>(JSON.parse(`${localStorage.getItem('usuario')}`));
    this.userNameSession = new BehaviorSubject<String | null>(this.myUserName);

    // const nombre = this.userNameSession?.value;
    // console.log(`this.userNameSession: ${this.myUserName} (${nombre})`);

  } // constructor;


  // DSLOIS, 1234;

  public loginUser(uName: String, Clave: String): Observable<MyResponse> {

    const body = JSON.stringify({ "email": uName,"userName": uName, "password": Clave });

    console.log(`----------------\n`);
    console.log(body);
    console.log(`----------------\n`);
    // { "email": uName, "userName": uName, "password": Clave, HttpOption }
    return this.http.post<MyResponse>(`${this.LoginUser}`, { "email": uName, "userName": uName, "password": Clave, HttpOption }).pipe(
      map( res => {
        const usuario: UserResponse = res.data;

        if (res.success === 1) {

          localStorage.setItem('usuario', JSON.stringify(usuario));

          localStorage.setItem('usuarioNombre', JSON.stringify(usuario.userName));

          this.userSession.next(usuario);
          this.userNameSession?.next(usuario.userName);

          let us = usuario.userName;

          const nombre = this.userNameSession?.value;
          console.log(`this.userName: ${this.myUserName} // (${nombre})\n`);

          console.log(`Acceso concedido!!\n\b${JSON.stringify(usuario)}`);
          console.log(`Acceso concedido!!\n\b${JSON.stringify(us)}`);

          // window.location.href = '/chat/?action=2';
          // alert(`Sesión de: ${nombre}!`);
        } // if;

        return res;
      }) // map;
    ); // pipe;
  } // LoginUser;


  // DSLOIS / 1234

  public get myUserName(): String | null { // | undefined
    // this.userNameSession?.asObservable().toString();
    this.userNameSession?.next(localStorage.getItem("usuarioNombre"));
    return this.userNameSession?.value;
  } // this.myUserName;

  public get userData(): UserResponse | null {
    console.log(`-----------------\n`);
    console.log(this.userSession.value?.userName);
    console.log(`-----------------\n`);
    console.log(this.userSession.value);
    console.log(`-----------------\n`);
    // this.userSession?.asObservable();
    return this.userSession.value;
  } // userData;


  public removeUser() {
    localStorage.removeItem("usuario");
    this.userSession.next(null);
  } // removeUser;







} // LoginServices;
