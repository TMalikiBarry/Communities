import {AfterViewInit, Directive, ElementRef, Input, Renderer2} from "@angular/core";

@Directive({
  selector: '[highlight]'
})

export class HighlightDirective implements AfterViewInit{

  @Input() color:string = 'yellow';

  // @Input() highlight:string = 'yellow';

  constructor(private el: ElementRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.renderer.setStyle(this.el.nativeElement, 'display', 'flex');
    this.renderer.setStyle(this.el.nativeElement, 'justify-content', 'center');
    this.setBeautifulStyles(this.color);
    // this.setBeautifulStyles(this.highlight);
  }

  setBeautifulStyles(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
