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

        const payload = {
            email: UserNameEmail.value,
            password: Password.value // aseguramos que accedemos a `.value` aquí
        };

        // {"email": UserNameEmail.value, "password": Password}

        this.http.post<MyResponse>(this.apiUrlUser + this.AddUserPath, { payload, MyHttpOptions }).subscribe({
                    next: (opt) => {
                        console.log(`Usuario: (${opt.data})\n\n`, JSON.stringify(opt.data));
                    }, // next;
                    error: (er) => {
                        console.error(er);
                    } // error;
                }) // subscribe;
    } // CreateUser();


} // UserServices;