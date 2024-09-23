import { CommonModule } from '@angular/common';
import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-fond-cloche',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './fond-cloche.component.html',
  styleUrl: './fond-cloche.component.scss'
})
export class FondClocheComponent {

  public images: string[] = [];
  currentImageIndex = 0;
  isMouseDown = false;
  startX = 0;
  startTouchX = 0;

  @ViewChild('imageList') imageList!: ElementRef;
  @ViewChild('threeDImage') threeDImage!: ElementRef;

  constructor(private renderer: Renderer2) {
    this.generateImagePaths();
  }

  ngAfterViewInit(): void {
    const images = this.imageList.nativeElement.querySelectorAll('li');
    const container = this.threeDImage.nativeElement;
  
    this.showImage(images, this.currentImageIndex);
  
    this.renderer.listen(container, 'wheel', (event: WheelEvent) => {
      event.preventDefault();
    });
  
    this.startAutoDragAndSwipe(images, 100);
  }
  
  startAutoDragAndSwipe(images: NodeListOf<HTMLLIElement>, intervalTime: number) {
    setInterval(() => {
      this.nextImage(images);
    }, intervalTime);
  }
    
  // Fonction pour afficher une image
  showImage(images: NodeListOf<HTMLLIElement>, index: number) {
    images.forEach((img, i) => {
      this.renderer.setStyle(img, 'display', i === index ? 'block' : 'none');
    });
  }
  
  // Fonction pour passer à l'image suivante
  nextImage(images: NodeListOf<HTMLLIElement>) {
    this.currentImageIndex = (this.currentImageIndex + 1) % images.length;
    this.showImage(images, this.currentImageIndex);
  }
  
  // Fonction pour revenir à l'image précédente
  prevImage(images: NodeListOf<HTMLLIElement>) {
    this.currentImageIndex = (this.currentImageIndex - 1 + images.length) % images.length;
    this.showImage(images, this.currentImageIndex);
  }
  
  private generateImagePaths(): void {
    const numberOfImages = 120; // Nombre total d'images
    for (let i = 0; i < numberOfImages; i++) {
      const imagePath = `/assets/cloche/CLOCHE_${this.padNumber(i, 5)}.png`;
      this.images.push(imagePath);
    }
  }

  private padNumber(num: number, size: number): string {
    let s = num + '';
    while (s.length < size) s = '0' + s;
    return s;
  }

}
