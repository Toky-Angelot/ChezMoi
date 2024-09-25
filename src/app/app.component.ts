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
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

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
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    CommonModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  title = 'HotelNareo';

  acceuil = `
  Notre site vous fait découvrir votre rêve à la découverte des nouveaux logements correspondant à votre demande. Tous en vous offrant le meilleur d'accedé à tous les options de reservation.
  Si vous voulez faire une réservation, veuillez cliquez s'il vous plait sur le boutton réservation
`
decouvrir = `
Découvrez un projet d’exception où chaque détail est conçu pour réaliser votre rêve. Laissez-vous séduire par des chambres élégantes et confortables, un spa luxueux pour des moments de détente absolue, un jardin verdoyant propice à la sérénité, et un restaurant raffiné où les saveurs se marient à la perfection. Un cadre unique qui invite à l’évasion et au bien-être, pensé pour vous offrir une expérience inoubliable dans un environnement alliant luxe et confort.
`
contact = `
N’hésitez pas à nous contacter pour toute question ou information supplémentaire. Notre équipe est à votre disposition pour vous accompagner et répondre à vos besoins. Ensemble, nous concrétiserons votre projet de rêve.
`
synth: any;
recognition: any;
isListening = false;
zoomEnabled = false;

constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {
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

    this.recognition.onend = () => {
      if (this.isListening) {
        this.recognition.start(); // Redémarre la reconnaissance vocale
      }
    };

    this.recognition.onerror = (event: any) => {
      console.error('Erreur de reconnaissance vocale:', event.error);
      if (this.isListening) {
        this.recognition.start(); // Redémarre la reconnaissance vocale en cas d'erreur
      }
    };
  }
}


ngOnInit(): void {
  this.showVoiceRecognitionPrompt();
}

showVoiceRecognitionPrompt() {
  this.confirmationService.confirm({
    message: "Souhaitez-vous activer la reconnaissance vocale pour naviguer sur le site ?",
    acceptButtonStyleClass:"p-button-danger p-button-text",
    rejectButtonStyleClass:"p-button-text p-button-text",
    accept: () => {
      this.startContinuousVoiceRecognition();
      this.messageService.add({severity:'success', summary: 'Activer', detail: 'Reconnaissance vocale activée.'});
    },
    reject: () => {
      this.stopVoiceRecognition();
      this.messageService.add({severity:'warn', summary: 'Désactiver', detail: 'Reconnaissance vocale désactivée.'});
    }
  });
}

toggleZoom() {
  this.zoomEnabled = !this.zoomEnabled;
}


// askForVoiceRecognitionPermission(): void {
//   const wantsVoiceRecognition = confirm("Souhaitez-vous activer la reconnaissance vocale en continu pour naviguer sur le site ?");
//   if (wantsVoiceRecognition) {
//     this.startContinuousVoiceRecognition();
//   } else {
//     this.stopVoiceRecognition();
//   }
// }

startContinuousVoiceRecognition(): void {
  this.recognition.continuous = true;
  this.recognition.start();
  
  this.recognition.onresult = (event: any) => {
    const command = event.results[0][0].transcript.toLowerCase();
    this.handleVoiceCommand(command);
  };

  this.recognition.onerror = (event: any) => {
    console.error("Voice recognition error: ", event.error);
  };

  this.recognition.onend = () => {
    // Restart the recognition if it stops
    this.recognition.start();
  };
}

stopVoiceRecognition(): void {
  this.recognition.continuous = false;
  this.recognition.stop();
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

  stopSpeech() {
    window.speechSynthesis.cancel();
  }

}

