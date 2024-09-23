import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { AboutComponent } from './components/about/about.component';
import { FondClocheComponent } from './components/fond-cloche/fond-cloche.component';
import { ReservationComponent } from './components/reservation/reservation.component';
import { FooterComponent } from './components/footer/footer.component';
import { ImageReserveComponent } from './components/image-reserve/image-reserve.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { SpeechService } from './services/speech.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AcceuilComponent,
    AboutComponent,
    FondClocheComponent,
    ReservationComponent,
    FooterComponent,
    ImageReserveComponent,
    DialogModule,
    ButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  title = 'HotelNareo';

}

