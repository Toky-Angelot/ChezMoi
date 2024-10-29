import { Component } from '@angular/core';
import { FondClocheComponent } from '../fond-cloche/fond-cloche.component';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    FondClocheComponent,
    CarouselModule,
    ButtonModule,
    TagModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {}