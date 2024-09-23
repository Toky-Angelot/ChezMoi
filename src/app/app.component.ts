import { Component, HostListener, OnInit } from '@angular/core';
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
export class AppComponent implements OnInit {

  title = 'HotelNareo';

  acceuil = `
  Notre site vous fait découvrir votre rêve à la découverte des nouveaux logements correspondant à votre demande. Tous en vous offrant le meilleur d'acceder à tous les options de reservation.
  Si vous voulez faire une réservation, veuillez cliquez s'il vous plait sur le boutton réservation
`
decouvrir = `
  Découvrir
`
contact = `
  Contacter-nous
`
synth: any;
recognition: any;

constructor() {
  if (typeof window !== 'undefined') {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'fr-FR';
    this.recognition.interimResults = false;
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = (event: any) => {
      const command = event.results[0][0].transcript.toLowerCase();
      this.handleVoiceCommand(command);
    };
  }
}

ngOnInit(): void {
  this.startVoiceRecognition();
}

startVoiceRecognition() {
  this.recognition.start();
}

handleVoiceCommand(command: string) {
  if (command.includes('accueil')) {
    this.scrollToSection('acceuil');
  } else if (command.includes('découvrir')) {
    this.scrollToSection('about');
  } else if (command.includes('contacter')) {
    this.scrollToSection('footer');
  } else {
    console.log('Commande non reconnue:', command);
  }
}

scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

@HostListener('window:scroll', [])
  onScroll() {
    const acceuilSection = document.getElementById('acceuil');
    const aboutSection = document.getElementById('about');
    const footerSection = document.getElementById('footer');

    const acceuilVisible = this.isElementInViewport(acceuilSection);
    const aboutVisible = this.isElementInViewport(aboutSection);
    const footerVisible = this.isElementInViewport(footerSection);

    if (acceuilVisible) {
      this.speechAcceuil();
    } else if (aboutVisible) {
      this.speechDecouvrir();
    } else if (footerVisible) {
      this.speechContact();
    }
  }

  isElementInViewport(el: HTMLElement | null): boolean {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  speechAcceuil() {
    const synth = new SpeechSynthesisUtterance();
    synth.text = this.acceuil;
    synth.lang = 'fr-FR';
    window.speechSynthesis.speak(synth);
  }

  speechDecouvrir() {
    const synth = new SpeechSynthesisUtterance();
    synth.text = this.decouvrir;
    synth.lang = 'fr-FR';
    window.speechSynthesis.speak(synth);
  }

  speechContact() {
    const synth = new SpeechSynthesisUtterance();
    synth.text = this.contact;
    synth.lang = 'fr-FR';
    window.speechSynthesis.speak(synth);
  }


}

