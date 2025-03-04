import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../url/url.component';
import { TitleServices } from '../servicios/title.service';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-mail',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgClass
  ],
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.css'
})
export class MailComponent implements AfterViewInit {

  private readonly ApiUrlEmail = environment.apiUrlEmail // Active in Production;
  private readonly enviarMensajeEmail = "/api/EmailMessage/SendEmailMessage"; // "https://www.sendemail.somee.com/api/EmailMessage/SendEmailMessage";

  public toEmail = new FormControl();
  public toMessage = new FormControl();
  public Msj: String = "Dejanos un mensaje";
  @ViewChild('correo', {static: false}) correo!: ElementRef;

  // "start": "ng serve --proxy-config proxy.conf.json -o",

  public valor: boolean = false;

  public constructor(private changeDtRef: ChangeDetectorRef, private http: HttpClient, private titleService: TitleServices) { } // constructor;

  public ngAfterViewInit(): void {

    this.titleService.Light.subscribe( (v) => {
      this.valor = Boolean(v);
    } ); // subscribe;
    
    if(!this.correo?.nativeElement) console.log("Elemñento no iniciado");
    this.changeDtRef.detectChanges();

  } // ngAfterViewInit();


  public SendMessageEmail(): void {    
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailPattern.test(this.toEmail.value)) {
      if(this.toEmail.value && this.toEmail.value.trim() && this.toMessage.value && this.toMessage.value.trim()) {
        this.Msj = `Mensaje enviado con éxito.!`;
        this.EnviarElMensaje();
      } else {
        this.Msj = `Debes completar los campos`;  
      } // else;
    } else {
      this.Msj = `Verifica el correo es incorrecto`;
    } // else;
    this.ResetTextArea();
  } // SendMessageEmail;


  private EnviarElMensaje(): void {
    var mySend = { toEmail: this.toEmail.value, toMessage: this.toMessage.value };
    // this.http.post(`${this.ApiUrlEmail}${this.enviarMensajeEmail}`, mySend, { responseType: 'text' }).subscribe
    this.http.post(`${this.ApiUrlEmail}${this.enviarMensajeEmail}`, mySend).subscribe({
      next: (resp) => { console.log(`Mensaje enviado con éxito.!! ${this.toEmail}, ${this.toMessage}`) },
      error: (er) => { console.error(er); }
    }); // subscribe;
  } // this.EnviarElMensaje();

  private ResetTextArea(): void {
    this.toEmail.setValue('');
    this.toMessage.setValue('');
    if(this.correo?.nativeElement) this.correo?.nativeElement.focus();
  } // this.ResetTextArea();


} // MailComponent;
