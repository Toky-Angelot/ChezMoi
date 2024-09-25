import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMagnifier]'
})
export class MagnifierDirective {
  private zoomFactor = 2; // Facteur de zoom
  private magnifierSize = 100; // Taille de la loupe

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const element = this.el.nativeElement;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Créer une loupe en utilisant une transformation CSS
    this.renderer.setStyle(element, 'transform-origin', `${x}px ${y}px`);
    this.renderer.setStyle(element, 'transform', `scale(${this.zoomFactor})`);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    // Réinitialiser la transformation lorsque la souris quitte la zone
    this.renderer.removeStyle(this.el.nativeElement, 'transform');
  }
}
