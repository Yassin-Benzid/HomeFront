import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-profile',
  imports: [DashboardNavbarComponent, NgSelectModule, FormsModule, CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  countries = [
    { name: 'Tunisie' },
    { name: 'France' },
    { name: 'Algérie' },
    { name: 'Maroc' },
    { name: 'Italie' }
  ];

  cities = [
    { name: 'Tunis' },
    { name: 'Hammamet' },
    { name: 'Sousse' },
    { name: 'Djerba' },
    { name: 'Tozeur' }
  ];

  roles = [
    { name: 'Administrateur principal', value: 'admin' },
    { name: 'Administrateur contenu', value: 'content-admin' },
    { name: 'Superviseur opérations', value: 'operations' }
  ];

  user = {
    username: 'admin-tourisme',
    firstName: 'Amel',
    lastName: 'Ben Youssef',
    email: 'amel.admin@tourismhub.tn',
    role: 'admin',
    phoneNumber: '+216 20 123 456',
    website: 'https://tourismhub.tn',
    about: 'Supervision des hôtels, des agences de location, des réservations et de la facturation.'
  };

  imageSrc: string | ArrayBuffer | null = null;

  networks = [
    { link: 'https://www.linkedin.com/company/tourismhub' },
    { link: 'https://www.facebook.com/tourismhub' }
  ];

  clearForm(): void {
    this.user = {
      username: '',
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      phoneNumber: '',
      website: '',
      about: ''
    };
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }

  addNetwork(): void {
    this.networks.push({ link: '' });
  }
}
