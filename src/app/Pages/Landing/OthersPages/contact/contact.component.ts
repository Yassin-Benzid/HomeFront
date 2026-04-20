import AOS from 'aos';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Navbar7Component } from "../../../../layout/navbar-7/navbar-7.component";
import { Footer5Component } from "../../../../layout/footer-5/footer-5.component";
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ContactService } from '../../../../service/contact.service';

@Component({
    selector: 'app-contact',
    imports: [CommonModule, FormsModule, Navbar7Component, Footer5Component],
    templateUrl: './contact.component.html'
})
export class ContactComponent {
  formData: any = {
    nom: '',
    prenom: '',
    telephone: '',
    email: '',
    inquiryType: 'hotel',
    destination: '',
    startDate: '',
    endDate: '',
    guests: '',
    carType: '',
    message: ''
  };

  sending = false;
  successMessage = '';
  errorMessage = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private contactService: ContactService) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) AOS.init({ duration: 800, easing: 'ease', once: true, mirror: false });
  }

  submit() {
    this.successMessage = '';
    this.errorMessage = '';
    this.sending = true;

    const payload = { ...this.formData, sentAt: new Date().toISOString() };

    this.contactService.sendMessage(payload).subscribe({
      next: () => {
        this.sending = false;
        this.successMessage = 'Votre demande a été envoyée. Nous vous répondrons sous 24h.';
        this.formData = {
          nom: '', prenom: '', telephone: '', email: '', inquiryType: 'hotel', destination: '', startDate: '', endDate: '', guests: '', carType: '', message: ''
        };
      },
      error: (err) => {
        this.sending = false;
        this.errorMessage = "Une erreur est survenue lors de l'envoi. Veuillez réessayer.";
        console.error('Contact submit error', err);
      }
    });
  }
}
