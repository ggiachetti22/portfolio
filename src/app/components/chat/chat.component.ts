import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { TitleServices } from '../servicios/title.service';
import { NgClass, NgFor, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { MessageDTO } from '../interface/interfaces';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ChatService } from '../servicios/chat.service';
import { AutoResizeTextArea } from '../scroll/textarea.height';
import { LoginServices } from '../servicios/login.service';
// import { MessagerComponent } from '../Messager/messager.component';


@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    AutoResizeTextArea,
    NgFor,
    CommonModule,
    // MessagerComponent
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})

export class ChatComponent implements OnInit, AfterViewInit {

  protected title: string = `Chat Pages`;

  public valor!: boolean;

  constructor(private changeDtRef: ChangeDetectorRef, private titleService: TitleServices, private chatService : ChatService, private renderer : Renderer2, private loginService: LoginServices) {} // constructor;

  public ngOnInit(): void {
    this.titleService.AddTitle(this.title);
    // this.UpID();
    // this.GetM();
    this.ViewChatGroup();
    console.log('SendMsj => ID:', this.loginService.userData?.userID +' Nombre de Usuario: '+ this.loginService.userData?.userName);
  } // this.ngOnInit();

  
  public ngAfterViewInit(): void {
    this.titleService.Light.subscribe( (v) => {
      this.valor = Boolean(v);
    } ); // subscribe;
    this.changeDtRef.detectChanges();
  } // ngAfterViewInit();


  public listMessage?: Observable<MessageDTO[]>;
  public listMessage2?: MessageDTO[];
  // @ViewChild('text') ElText?: ElementRef;
  @ViewChild('hidden', { static: false }) hidden?: ElementRef;
  public message_ID = new FormControl(0);
  public Nombre = new FormControl('');
  public Mensaje = new FormControl('');
  protected myID: Number = 0; // this.myID
  @ViewChild('inputMessage', { static: false }) inputMessage?: ElementRef;
 
 
  /* public ArrayString? = [''];
 
  public AgregarString(arg: string) {
    this.ArrayString?.push(arg);
  } // AgregarString(); */

  public ViewChatGroup(): void {
    this.listMessage = this.chatService.GetMessager();
  } // this.ViewChatGroup();

 
  public GetM() {
    this.listMessage = this.chatService.GetMsj();
  } // GetM();
 
  public UpID() {
 
    // console.log(`Current Number: ${this.chatService.CurrentNumber}`);
 
    this.chatService.currentNumber.subscribe(
      { next: (n) => {
        this.myID = n;
        // console.log(`Nº: ${n}`);
      }, error: (er) => {
          console.error(er);
          }
      });
 
  } // this.UpID();
 
  public ClickBtn() {
    this.UpID();
    console.log(`\nElemento ID: (${this.myID})\n`);
  } // ClickBtn();
 
  public ID(): Number {
    this.UpID();
    return this.myID;
  } // this.ID();
 
  public Mmsj(): void {
    this.chatService.GetMsj().subscribe(
      { next: (sub) => {
        console.log(sub);
      }, error: (e) => { console.error(e); }
      });
 
  } // Mmsj();
 
  private EnfocarImput(): void {
    this.Mensaje.setValue('');
    this.ElNombre?.nativeElement.focus();
  } // this.EnfocarImput();
 

  public SendMsj() {
    // console.log("SendMsj");
    this.myID = Number(this.loginService.userData?.userID);

    const MensajeIncludes: Boolean = this.Mensaje.value?.includes(" ") ?? false;
    const MensajeSpace = this.Mensaje.value?.indexOf(" ");
    if (MensajeIncludes === false && MensajeSpace === -1) {
      this.chatService.SendMsjGroup(`${this.loginService.userData?.userName}`, this.Mensaje, Number(this.loginService.userData?.userID));
    } // if;

    setTimeout(() => {
      console.log('SendMsj => ID:', this.loginService.userData?.userID +' Nombre de Usuario: '+ this.loginService.userData?.userName);
      this.ViewChatGroup();
      // this.inputMessage?.nativeElement.setValue('');
    }, 500);
    

    // this.inputMessage?.nativeElement.focus();
    // this.ViewChatGroup();
  } // this.SendMsj();
 
 
  public upMessage() {
    this.chatService.UpMessage(this.myID, this.Nombre, this.Mensaje);
    console.log(`My ID: ${this.myID} ${this.Nombre.value} ${this.Mensaje.value}`);
    setTimeout(() => {
      this.GetM();
    }, 300);
  } // this.upMessage();
 
 
  public NumberID(): Number {
    return this.myID;
  } // NumberID();
 
 
  public async deleteMessage() {
 
    await this.chatService.DeleteMessage(this.myID).subscribe(
      {
        next: (el) => { console.log(`Eliminado: ${el.upMessage}\n${el.data}`); }
        , error: (e) => { console.error(`Error: ${e}`); }
      });
 
    await setTimeout(() => {
      this.GetM();
    }, 300);
 
 
    /* this.chatService.DeleteMessage(this.myID).subscribe(
      { next: (response) => { console.log(response.upMessage);
        this.GetM(); }
        , error: (err) => { console.error('Error:', err); }}); */
 
 
  } // this.deleteMessage();
 
 
  private enviar: String = "Enviar mensaje..";
  private enviado: String = "Mensaje enviado!";
  private env: String[] = [this.enviar, this.enviado];
  private en: String = this.env[0];
 
  private n: Number = 0;
  public nom: String = "";
  public mj: String = "";
  // public num = 0;
  // this.num = !this.num ? 1 : 0;
  public VisibleBox: Number | null = null;
  public PrevID: Number = 0;
  public Dark: String = "rgba(0, 0, 0, .25)";
  @ViewChild('Box1') Box1!: ElementRef;
  @ViewChild('Box2') Box2!: ElementRef;
  @ViewChild('Box3') Box3!: ElementRef;
  @ViewChild('caja') caja!: ElementRef;
  @ViewChild('ElNombre') ElNombre!: ElementRef;
  @ViewChild('ElMensaje') ElMensaje!: ElementRef;
 
  private Ev: HTMLElement | null = null;
  private E: HTMLElement | null = null;
 
  public ToggleBox(event : Event, id: Number): void {
    this.Ev = event.target as HTMLElement;
 
    this.VisibleBox = (this.VisibleBox === id) ? this.FunctionNull() : id;
 
    /* if (this.VisibleBox === id) {
      this.VisibleBox = null;
      this.InitNull();
    } else {
      this.VisibleBox = id;
    }// else; */
 
  } // ToggleBox();
 
  private FunctionNull(): null { // Number | null
    // const shouldReturnNull = Math.random() > 0.5;
    // return shouldReturnNull ? null : 3;
    this.InitNull();
    return null;
  } // this.FunctionNull();
 
  public ToggleNull(e: Event): void {
    this.E = e.target as HTMLElement;
    if (this.E.tagName !== 'B' && this.E.tagName !== 'LI' && this.E.tagName !== 'INPUT' && this.E.tagName !== 'H6' && this.E.tagName !== 'SPAN' && this.E.tagName !== 'BUTTON') {
      this.InitNull();
    } // if;
    this.caja.nativeElement.classList.remove('Press');
    setTimeout(() => { this.caja.nativeElement.classList.add('Press'); }, 100);
    console.log(this.E.tagName);
 
    /* setTimeout(() => {
      this.RestablecerStyle();
      this.EnfocarImput();
      console.log(`\nclick editar..! ${this.ID()}`);
    }, 1500); */
 
 } // ToggleNull();
 
  private NombreStyle(): void {
    this.renderer.setStyle(this.ElNombre.nativeElement, 'border', '2px solid tomato');
  } // this.NombreStyle();
 
 
  private MensajeStyle(): void {
    this.renderer.setStyle(this.ElMensaje.nativeElement, 'border', '2px solid tomato');
  } // this.MensajeStyle();
 

  public sendMsjGroup(): void {
    // EnviarMsjGroup
  } // sendMsjGroup();

 
  public sendMsj(): void {
    const NameSpace = this.Nombre.value?.indexOf(" ");
    const NameIncludes: Boolean = this.Nombre.value?.includes(" ") ?? false;
    if (NameIncludes === false && NameSpace === -1) {
      if (this.Nombre.value === "" && this.Mensaje.value === "") {
        this.NombreStyle();
        this.MensajeStyle();
        alert(`Verifica los campo estan vácios`);
      } else if (this.Nombre.value === "") {
        this.NombreStyle();
        alert(`Verifica el campo nombre no debe estar vácio`);
      } else if (this.Mensaje.value === "") {
        this.MensajeStyle();
        alert(`Verifica el campo mensaje no debe estar vácio`);
      } else {
        console.log(`click editar..! ${this.myID}`);
        this.renderer.setStyle(this.Box1.nativeElement, 'background', 'rgba(0,255,0,.5)');
        this.SendMsj();
        alert(`Se ha editado ${this.Nombre.value} con éxito`);
      } // else;
    } else {
      this.NombreStyle();
      alert(`El nombre de usuario no puede tener espacios`);
    } // else;
    setTimeout(() => {
      this.RestablecerStyle();
      this.EnfocarImput();
      console.log(`\nclick editar..! ${this.ID()}`);
    }, 1500);
  } // this.sendMsj();
 
 
  public BtnEdit() {
    const NameSpace = this.Nombre.value?.indexOf(" ");
    const NameIncludes: Boolean = this.Nombre.value?.includes(" ") ?? false;
    if (this.myID !== 0) {
      if (NameIncludes === false && NameSpace === -1) {
        if (this.Nombre.value === "" && this.Mensaje.value === "") {
          this.NombreStyle();
          this.MensajeStyle();
          alert(`Verifica los campo estan vácios`);
        } else if (this.Nombre.value === "") {
          this.NombreStyle();
          alert(`Verifica el campo nombre no debe estar vácio`);
        } else if (this.Mensaje.value === "") {
          this.MensajeStyle();
          alert(`Verifica el campo mensaje no debe estar vácio`);
        } else {
          console.log(`click editar..! ${this.myID}`);
          this.renderer.setStyle(this.Box1.nativeElement, 'background', 'rgba(0,255,0,.5)');
          this.upMessage();
          alert(`Se ha editado ${this.Nombre.value} con éxito`);
        } // else;
      } else {
        this.NombreStyle();
        alert(`El nombre de usuario no puede tener espacios`);
      } // else;
    } else {
      alert(`Primero selecciona un mensaje`);
    }// else
    
    setTimeout(() => {
      this.RestablecerStyle();
      this.EnfocarImput();
      console.log(`\nclick editar..! ${this.ID()}`);
    }, 1500);
 
  } // BtnEdit();
 
  protected InitNull() {
    this.chatService.changeNextNumber(0);
    this.VisibleBox = null;
  } // this.InitNull();
 
  private RestablecerStyle(): void {
    this.InitNull();
    this.renderer.setStyle(this.Box1.nativeElement, 'background', this.Dark);
    this.renderer.setStyle(this.ElNombre.nativeElement, 'border', '2px solid transparent');
    this.renderer.setStyle(this.ElMensaje.nativeElement, 'border', '2px solid transparent');
    this.Mensaje.setValue('');
  } // this.RestablecerStyle();
 
  public msjEliminar: String | null = null;
 
  public BtnBorrar() {
    this.deleteMessage();
  } // BtnBorrar();
 
  public BtnEliminar() {
    if (this.myID !== 0) {
      console.log(`click eliminar..! ${this.myID}`);
 
      this.renderer.setStyle(this.Box3.nativeElement, 'background', 'rgba(255,0,0,.5)');
      alert(`Se ha`);
 
      setTimeout(() => {
        this.renderer.setStyle(this.Box3.nativeElement, 'background', this.Dark);
        this.InitNull();
        console.log(`\nclick editar..! ${this.ID()}`);
      }, 1000);
      
    } // if;
  } // BtnEliminar();
 
 
  public Nom(): String {
    let n: string;
    n = this.nom.toUpperCase().trim();
    if (n.length <= 15) {
      return n;
    } // if
    return n.substring(0, 15);
  } // this.Nom();
 
  public Env(): String { return this.en; } // Env(..);
 
  public Btn() {
    this.n = 1 - Number(this.n);
    this.en = this.env[Number(this.n)];
    console.log(`\nthis.n: ${this.n}\n( ${this.env[Number(this.n)]} )`);
    
  } // Btn();





  /*
      <section id="Cont">
      
        <div id="Msj">
          <p>ID: <span>..</span></p>
      
          <p>...</p>
      
          <p id="parrafo" class="parrafo">...</p>
      
          <ng-template #TextMaxLength>
            <p id="parrafo" class="parrafo">...</p>
          </ng-template>
      
      
          <!-- <div #caja class="BoxBtn">
            <button #Box1 class="Bots">Editar</button>
            <button #Box2 class="Bots">Borrar</button>
            <button #Box3 class="BtnDelete Bots">Eliminar completamente</button>
          </div> -->
      
      
        </div>
      

        <div id="BoxForm" [ngClass]="valor ? 'ChatBack1' : 'ChatBack2'">
      
          <!-- <input #ElNombre [ngClass]="valor ? 'ChatColor1' : 'ChatColor2'" name="ElNombre" type="text" placeholder="Nombre.." maxlength="15" autofocus /> -->
          <!-- <input #ElMensaje [ngClass]="valor ? 'ChatColor1' : 'ChatColor2'" name="ElApellido" #text type="text" placeholder="Escribe mensaje.." /> -->
          <div class="custom-textarea" #ElMensaje [ngClass]="valor ? 'ChatColor1' : 'ChatColor2'" name="ElApellido" placeholder="Escribe aquí..." contenteditable="true"></div>
          <button class="enviar">
            <i class="icon-paper-plane-alt"></i>
            <span class="visually-hidden">➣</span>
          </button>
      
        </div>


      
        <!-- <main id="chat">
          <app-message (click)="ToggleBox($event, ID());" class="chat" *ngFor="let msj of listMessage | async" [oMessage]="msj"></app-message>
        </main> -->
      
        <!-- <app-message *ngFor="let a of ArrayString; let i = index" (ArrayString)="AgregarString($event)"></app-message> -->
      
      </section>
  */

  
} // ChatComponent;
