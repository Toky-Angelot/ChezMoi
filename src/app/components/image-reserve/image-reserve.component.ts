import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { DataService } from '../../shared/data.service';

@Component({
  selector: 'app-image-reserve',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    ToolbarModule
  ],
  templateUrl: './image-reserve.component.html',
  styleUrl: './image-reserve.component.scss'
})
export class ImageReserveComponent {

  constructor(
    public dataSharedService: DataService,
    ) {}

    toogletagToit() {
      this.dataSharedService.toogletagToit();
      }
  
    toogletagEtageOne() {
      this.dataSharedService.toogletagEtageOne();
    }
  
    toogletagEtageTwo() {
      this.dataSharedService.toogletagEtageTwo();
    }
  
    toogletagRdc() {
      this.dataSharedService.toogletagRdc();
    }

    
  
  
}
