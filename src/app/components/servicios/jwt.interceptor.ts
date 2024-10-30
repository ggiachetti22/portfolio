import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginServices } from "./login.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private loginService: LoginServices) {
  } // constructor;


  intercept(solicitud: HttpRequest<any>, nextHandler: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.loginService.userData; // ?.keyToken;
    console.log(`User: ${user?.userName}\nToken: ${user?.keyToken}`);
    console.log(`User Data:`);
    console.log(this.loginService.userData);
    if (user) {
      solicitud = solicitud.clone({
        setHeaders: {
          Authorization: `Bearer ${user?.keyToken}`
        }
      }); // clone;
    } // if;
    return nextHandler.handle(solicitud);
  } // intercept;



} // JwtInterceptor;
