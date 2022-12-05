import {AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2} from "@angular/core";

@Directive({
  selector: '[highlight]'
})

export class HighlightDirective implements AfterViewInit{

  @Input() highlight:string = 'yellow';

  clicked: boolean = false;
  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.el.nativeElement, 'justify-content', 'center');
    this.setBeautifulStyles(this.highlight);
    // this.setBeautifulStyles(this.highlight);
  }

  setBeautifulStyles(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
    this.renderer.setStyle(this.el.nativeElement, 'color', 'black');
    if (color === 'brown' || color === 'black'){
      this.renderer.setStyle(this.el.nativeElement, 'color', 'white');
    }
  }

  getTheColor() {
    if (!this.clicked){
      this.clicked = !this.clicked;
      return 'brown';
    }
    this.clicked = !this.clicked;
    return this.highlight;
  }

  @HostListener('mouseenter') onMouseEnter(){
    this.setBeautifulStyles('lightgreen');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.clicked = false;
    this.setBeautifulStyles(this.highlight);
  }

  @HostListener('click') onClick() {
    this.setBeautifulStyles(this.getTheColor());
  }
}
