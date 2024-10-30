import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, Observable, map, noop } from "rxjs";
import { MyResponse, UserResponse } from "../interface/interfaces";
import { NonNullAssert } from "@angular/compiler";


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

  private readonly baseUrl: String = `https://localhost:7212`; // api/Messager/SendMessage
  private readonly LoginUser: String = `https://localhost:7212/api/Access/login`;
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
    const body = JSON.stringify({ "userName": uName, "password": Clave });

    return this.http.post<MyResponse>(`${this.LoginUser}`, { "userName": uName, "password": Clave, HttpOption }).pipe(
      map( res => {
        const usuario: UserResponse = res.data;

        if (res.success === 1) {

          localStorage.setItem('usuario', JSON.stringify(usuario));

          localStorage.setItem('usuarioNombre', JSON.stringify(usuario.userName));

          this.userSession.next(usuario);
          this.userNameSession?.next(usuario.userName);

          let us = usuario.userName;

          const nombre = this.userNameSession?.value;
          console.log(` this.userName: ${this.myUserName} // (${nombre})\n`);

          console.log(`Acceso concedido!!\n\b${JSON.stringify(usuario)}`);
          console.log(`Acceso concedido!!\n\b${JSON.stringify(us)}`);
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
    console.log(this.userSession.value);
    // this.userSession?.asObservable();
    return this.userSession.value;
  } // userData;


  public removeUser() {
    localStorage.removeItem("usuario");
    this.userSession.next(null);
  } // removeUser;







} // LoginServices;
