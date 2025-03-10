import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Form, FormControl } from "@angular/forms";
import { BehaviorSubject, Observable } from "rxjs";
import { MessageDTO, MyResponse } from "../interface/interfaces";
import { environment } from "../../url/url.component";
import * as signalR from '@microsoft/signalr';


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
    private hubConnection!: signalR.HubConnection;
    private readonly apiMessagerGroup: string = "/api/Messager/ViewMyMessages";
    private readonly apiAddMessagerGroup: string = "/api/Messager/AddChatGroup";
    

    public messages: { userName: string; chatMsj: string; timeMessage: string } [] = [];

    constructor(protected http: HttpClient) {
      // this.startConnection();
      // this.addMessageListener();
      // this.stopConnection();
    } // constructor;



    /* private startConnection(): void {
      try {
        this.hubConnection = new signalR.HubConnectionBuilder()
        .withUrl(`${environment.apiMessager}/chatHub`, { transport: signalR.HttpTransportType.LongPolling })
        .build();
        console.log(`this.hubConnection.state: ${this.hubConnection.state}\n signalR.HubConnectionState.Connected: ${signalR.HubConnectionState.Connected}`);

      } catch (err) {
        console.log(`this.hubConnection.state: ${this.hubConnection.state}\n signalR.HubConnectionState.Connected: ${signalR.HubConnectionState.Connected}\n\n`);
        console.error('Error connecting to SignalR:', err);
        
        setTimeout( () => {
          this.startConnection(); 
        }, 5000);
      } // catch;
    } // this.startConnection();

    private addMessageListener(): void {
      this.hubConnection.on('ReceiveMessage', (data) => {
        this.messages.push(data);
      } );
    } // this.addMessageListener(); */


    /* public stopConnection(): void {
      this.hubConnection.stop();
    } // this.stopConnection(); */


    /* public sendMessage(userName: string, chatMsj: string, usuarioID: Number, conversacionID: Number) {
      this.hubConnection
        .invoke('SendMessage', userName, chatMsj, usuarioID, conversacionID)
        .catch((err) => console.error('Error sending message:', err));
    } // sendMessage; */


    public SendMsjGroup(userN: string, message: FormControl, usuarioID: Number): void {
      this.http.post<MyResponse>(this.apiUrlMessager + `${this.apiAddMessagerGroup}`,
        { "userName": userN, "chatMsj": message.value, "timeMessage": new Date().toISOString(), "usuarioID": usuarioID, "conversacionID": 1, "statesMsj_ID": 1, HttpOption})
        .subscribe(
          { next: (sub) => { console.log(sub); },
            error: (er) => { console.error(er); }
          });
    } // SendMsjGroup;

  
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