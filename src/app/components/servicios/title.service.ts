import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class TitleServices {

    public Light = new BehaviorSubject<boolean | null>(null);
    public Title = new BehaviorSubject<string>('App Flow Craft');
    public title = this.Title.asObservable();
    
    //  private userSes!: BehaviorSubject<string | null>;
    public light = this.Title.asObservable();


    public get CurrentTitle(): string {
        return this.Title.value;
    } // this.CurrentTitle();

    public AddTitle(t: string): void {
        this.Title.next(t);
    } // this.AddTitle();

    public get CurrentLight(): boolean {
        // Boolean(localStorage.getItem('Light'));
        return Boolean(this.Light.value);
    } // this.CurrentLight();

    public AddLight(l: boolean): void {
        // localStorage.removeItem('Light');
        // localStorage.setItem('Light', JSON.stringify(this.Light.next(l)));
        this.Light.next(l);
    } // this.AddLight();


} // TitleServices