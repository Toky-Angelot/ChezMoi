import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FondClocheComponent } from '../fond-cloche/fond-cloche.component';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [
    ButtonModule,
    FondClocheComponent,
    FormsModule
  ],
  templateUrl: './acceuil.component.html',
  styleUrl: './acceuil.component.scss'
})
export class AcceuilComponent  implements AfterViewInit {

  // text = `
  // Bonjour.

  // Votre rêve est notre réalité.

  // Bienvenue sur Chez-Moi. Ou plutôt Chez-vous. 

  // Votre refuge parfait, que ce soit pour un séjour temporaire ou un nouveau départ. Trouvez l'endroit où vous vous sentirez immédiatement chez vous, dans une ambiance chaleureuse et conviviale.
  // Découvrez votre havre de paix où chaque coin raconte un rêve. Ici, votre espace idéal devient réalité, que ce soit pour une nuit ou pour toujours.

  // Notre site vous fait découvrir votre rêve à la découverte des nouveaux logements correspondant à votre demande. Tous en vous offrant le meilleur d'acceder à tous les options de reservation.
  // Si vous voulez faire une réservation, veuillez cliquez s'il vous plait sur le boutton réservation
  // `;

  text = `Bonjour`

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

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
  
      ScrollTrigger.defaults({
        toggleActions:"play none none reverse"
      });
  
      gsap.to('.img-container', {
        scale: 80,
        ease: "ease",
        scrollTrigger: {
          trigger: '.video-section',
          scrub: 1,
          start: "top top",
          end: "bottom", 
          pin: true
        }
      });
  
      const tl = gsap.timeline();
  
      tl.from('.left-side div', {
        y: 150,
        opacity: 0,
        delay: 0.5
      })
      .from('.right-side', { 
        opacity: 0, 
        duration: 2 
      }, 0.5);
  
      ScrollTrigger.create({
        animation: tl,
        start: "top 1000",
        scrub: 3,
      });

      this.startTextToSpeech();
    }
  }
  
  // ngOnInit(): void {
  //   this.startTextToSpeech();
  // }
  

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }


  startTextToSpeech() {
    const synth = new SpeechSynthesisUtterance();
    synth.text = this.text;
    synth.lang = 'fr-FR'; // Assurez-vous que la langue est définie
    window.speechSynthesis.speak(synth);
  }
  
  speechAcceuil() {
    const synth = new SpeechSynthesisUtterance();
    synth.text = this.acceuil; // Corrigez cette ligne
    synth.lang = 'fr-FR'; // Assurez-vous que la langue est définie
    window.speechSynthesis.speak(synth);
  }

  speechDecouvrir() {
    const synth = new SpeechSynthesisUtterance();
    synth.text = this.decouvrir; // Corrigez cette ligne
    synth.lang = 'fr-FR'; // Assurez-vous que la langue est définie
    window.speechSynthesis.speak(synth);
  }

  speechContact() {
    const synth = new SpeechSynthesisUtterance();
    synth.text = this.contact; // Corrigez cette ligne
    synth.lang = 'fr-FR'; // Assurez-vous que la langue est définie
    window.speechSynthesis.speak(synth);
  }


  
  stopSpeech() {
      window.speechSynthesis.cancel();
  }
}
