import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class TitleServices {

    public Title = new BehaviorSubject<string>('App Flow Craft');
    public title = this.Title.asObservable();

    public get CurrentTitle(): string {
        return this.Title.value;
    } // this.CurrentTitle();

    public AddTitle(t: string){
        this.Title.next(t);
    } // this.AddTitle();


} // TitleServices