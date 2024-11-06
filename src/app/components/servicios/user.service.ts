import { Injectable } from "@angular/core";
import { environment } from "../../url/url.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { MyResponse } from "../interface/interfaces";


const MyHttpOptions = {
    MyHeader: new HttpHeaders ({
        "Content-Type": "application/json",
        // "Authorization": "my-auth-token"
    })
} // this.HttpOptions;

@Injectable({
    providedIn: 'root'
})

export class UserServices {


    private readonly apiUrlUser: string = environment.apiUrlLoginUser;
    private readonly AddUserPath: string = '/api/User/AddUser';

    constructor(private http: HttpClient) {} // constructor;


    public CreateUser(UserNameEmail: FormControl, Password: FormControl): void {

        const body = JSON.stringify({ "email": UserNameEmail.value, "password": Password.value });

        const payload = {
            email: UserNameEmail.value,
            password: Password.value
        }; // payload;

        const Payload = {
            "email": UserNameEmail.value,
            "password": Password.value
        }; // Payload;

        // {"email": UserNameEmail.value, "password": Password.value}

        this.http.post<MyResponse>(this.apiUrlUser + this.AddUserPath, 
            { "email": UserNameEmail.value, "password": Password.value, MyHttpOptions }).subscribe({
                    next: (opt) => {
                        if (opt) {
                            console.log(`Usuario creado exitosamente: ${opt}`);
                            // console.log(`Usuario creado exitosamente: ${JSON.stringify(opt)}`);
                        } else {
                            console.warn('La respuesta de la API fue null o no tiene el formato esperado.');
                        } // else;
                    }, // next;
                    error: (er) => {
                        console.error(er);
                    } // error;
                }) // subscribe;
    } // CreateUser();


} // UserServices;