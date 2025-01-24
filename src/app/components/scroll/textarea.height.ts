import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from "@angular/core";


@Directive({
    selector: '[autoResizeTextarea]',
    standalone: true,
})

export class AutoResizeTextArea implements OnInit {

    constructor(private Elemento : ElementRef<HTMLTextAreaElement>, private renderer : Renderer2) {} // constructor;

    public ngOnInit(): void {
        this.adjunstResize(this.event);
    } // ngOnInit();

    private maxLines = 4;
    private pixeles = 12;
    private lineHeight = 1.5 * this.pixeles;
    public event!: Event;

    @HostListener('input')
    adjustHeight(): void {
        const textarea = this.Elemento.nativeElement;
        if (textarea) {
          this.renderer.setStyle(textarea, 'height', 'auto');
          textarea.style.height = Math.min(textarea.scrollHeight, this.maxLines * this.lineHeight) + 'px';
        } // if;
    } // adjustHeight;


    @HostListener('window.resize', ['$event'])
    public adjunstResize(event: Event): void {
        window.addEventListener('resize', () => {
          const anchoWindow = window.innerWidth;
          // const altoWindow = window.innerHeight;
          if(anchoWindow) {
            if (anchoWindow <= 650) {
              console.log("Menor a 650px");
              this.pixeles = 12;
              this.maxLines = 4;
              this.lineHeight = 1.5 * this.pixeles;
            } else {
              this.pixeles = 16;
              this.maxLines = 5;
              this.lineHeight = 1.5 * this.pixeles;
              console.log("Mayor a 650px");
            } // else;
          } // if

        }); // addEventListener;
    } // this.adjunstResize(this.event);


} // AutoResizeTextArea;