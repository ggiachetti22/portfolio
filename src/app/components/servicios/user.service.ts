import { Injectable } from "@angular/core";
import { environment } from "../../url/url.component";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { FormControl } from "@angular/forms";
import { MyResponse } from "../interface/interfaces";


const HttpOptions = {
    MyHeader: new HttpHeaders ({
        "Conten-Type": "application/json",
        "Authorization": "my-auth-token"
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
        this.http.post<MyResponse>(this.apiUrlUser + this.AddUserPath, 
            {"email": UserNameEmail.value, "password": Password, HttpOptions}).subscribe({
                    next: (opt) => {
                        console.log(`Usuario: (${opt})`);
                    }, // next;
                    error: (er) => {
                        console.error(er);
                    } // error;
                }) // subscribe;
    } // CreateUser();


} // UserServices;