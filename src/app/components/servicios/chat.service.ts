import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Form, FormControl } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { MessageDTO, MyResponse } from "../interface/interfaces";
import { environment } from "../../url/url.component";

const HttpOption = {
    MyHeader: new HttpHeaders ({
      "Conten-Type": "application/jason",
      "Authorization": "my-auth-token"
    })
  } // HttpOption;
  
  
  @Injectable({
    providedIn: 'root'
  })

  export class ChatService {

    private readonly baseUrl: String = `https://localhost:7212/`;
    private getMsj: String = `api/Messager/ViewChatGroup`;
    private getMsjUser: String = `api/Messager/GetMessageUser/`;
    private sendMsj: String = `api/Messager/SendMessage`;
    private upMsj: String = `api/Messager/UpMessage`;
    private deleteMsj: String = `api/Messager/DeleteMessage/`;

    private readonly apiUrlMessager: string = environment.apiMessager;
    private readonly apiMessagerGroup: string = "/api/Messager/ViewMyMessages";
    private readonly apiAddMessagerGroup: string = "/api/Messager/AddChatGroup";
    
    constructor(protected http: HttpClient) {
    } // constructor;
  
    private stateSource1 = new BehaviorSubject<boolean>(false);
    private stateSource2 = new BehaviorSubject<boolean>(false);
    private stateSource3 = new BehaviorSubject<boolean>(false);
  
    public currentState1 = this.stateSource1.asObservable();
    public currentState2 = this.stateSource2.asObservable();
    public currentState3 = this.stateSource3.asObservable();
  
    private numberSource = new BehaviorSubject<Number>(0);
    public currentNumber = this.numberSource.asObservable();
  
    public get CurrentNumber(): Number {
      return this.numberSource.value;
    } // CurrentNumber;
    
    public changeNextNumber(_n: number) {
      this.numberSource.next(_n);
    } // changeNumber(..);
  
    public changeNextState1(state: boolean) {
      this.stateSource1.next(state);
    } // changeNextState1(state: boolean);
  
    public changeNextState2(state: boolean) {
      this.stateSource2.next(state);
    } // changeNextState1(state: boolean);
  
    public changeNextState3(state: boolean) {
      this.stateSource3.next(state);
    } // changeNextState1(state: boolean);
  

    public GetMessager(): Observable<MessageDTO[]> {
      return this.http.get<MessageDTO[]>(this.apiUrlMessager + `${this.apiMessagerGroup}`);
    } // GetMessager();

  
    public GetMsj(): Observable<MessageDTO[]> {
      return this.http.get<MessageDTO[]>(this.baseUrl + `${this.getMsj}`);
    } // GetMsj();
  

    public SendMsjGroup(userN: FormControl, message: FormControl, usuarioID: Number): void {
  
      this.http.post<MyResponse>(this.apiUrlMessager + `${this.apiAddMessagerGroup}`,
        { "userName": userN.value, "chatMsj": message.value, "timeMessage": new Date().toISOString(), "usuarioID": usuarioID, "conversacionID": 1, "statesMsj_ID": 1, HttpOption })
        .subscribe(
          { next: (sub) => { console.log(sub.upMessage); },
            error: (er) => { console.error(er); }
          });
  
    } // SendMsjGroup;

    
    public EnviarMsj(userN: FormControl, message: FormControl): void {
  
      this.http.post<MyResponse>(this.baseUrl + `${this.sendMsj}`,
        { "userName": userN.value, "chatMsj": message.value, "timeMessage": new Date().toISOString(), HttpOption })
        .subscribe(
          { next: (sub) => { console.log(sub.upMessage); },
            error: (er) => { console.error(er); }
          });
  
    } // EnviarMsj;
  
    private myID: Number = 0;
  
    public UpID() {
      this.currentNumber.subscribe(n => { this.myID = n; });
    } // this.UpID();
  
    public UpMessage(_id: Number, userN: FormControl, message: FormControl) {
      let upEdit: String = `${this.baseUrl}${this.upMsj}`;
      return this.http.put<MyResponse>(this.baseUrl + `${this.upMsj}`,
        { "messageID": _id, "userName": userN.value, "chatMsj": message.value, "timeMessage": new Date().toISOString(), HttpOption })
        .subscribe(
          { next: (a) => { console.log(a.data) }
          , error: (er) => { console.error(er); }
        });
    } // UpMessage();
  
    
    public DeleteMessage(msjID: Number): Observable<MyResponse> {
      // https://localhost:7212/api/Messager/DeleteMessage/20
      const urlDelete: String = `${this.baseUrl}${this.deleteMsj}${msjID}`;
      return this.http.delete<MyResponse>(urlDelete.toString());
    } // DeleteMessage();

}