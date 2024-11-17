import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";



@Injectable({
    providedIn: 'root'
})

export class TitleServices {

    private _lightKey = 'Light';
    public Light = new BehaviorSubject<boolean>(false);
    public Title = new BehaviorSubject<string>('App Flow Craft');
    public title = this.Title.asObservable();
    
    constructor() {
        const initialLight = this.getStoredLight(); // Recupera el valor almacenado en localStorage.
        this.Light.next(initialLight); // Emite el valor inicial.
    } // constructor;


    public get CurrentTitle(): string {
        return this.Title.value;
    } // this.CurrentTitle();

    public AddTitle(t: string): void {
        this.Title.next(t);
    } // this.AddTitle();
    

    private getStoredLight(): boolean {
        const storedLight = localStorage.getItem(this._lightKey);
        return storedLight ? JSON.parse(storedLight) : false; // Predeterminado: false
    } // getStoredLight();

    

    public get CurrentLight(): boolean {
        return Boolean(this.Light.value);
    } // this.CurrentLight();

    public AddLight(l: boolean): void {
        localStorage.setItem(this._lightKey, JSON.stringify(l));
        this.Light.next(l);
    } // this.AddLight();


} // TitleServices