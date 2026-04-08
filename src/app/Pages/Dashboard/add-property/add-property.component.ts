import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { RouterLink } from '@angular/router';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-add-property',
  imports: [DashboardNavbarComponent, NgSelectModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './add-property.component.html'
})
export class AddPropertyComponent {
  // NOTE: ancien écran "add-property" reconverti en fiche hôtel/chambres.
  categories = [
    { value: 'hotel', label: 'Hôtel' },
    { value: 'resort', label: 'Resort' },
    { value: 'maison-hote', label: 'Maison d’hôtes' },
    { value: 'appart-hotel', label: 'Appart-hôtel' }
  ];

  managers = [
    { value: '1', label: 'Sami Gharbi' },
    { value: '2', label: 'Meriem Kallel' },
    { value: '3', label: 'Walid Mansour' }
  ];

  cities = [
    { value: 'tunis', label: 'Tunis' },
    { value: 'hammamet', label: 'Hammamet' },
    { value: 'sousse', label: 'Sousse' },
    { value: 'djerba', label: 'Djerba' },
    { value: 'tozeur', label: 'Tozeur' }
  ];

  amenities = [
    { label: 'Wi-Fi', selected: true },
    { label: 'Piscine', selected: true },
    { label: 'Parking', selected: true },
    { label: 'Transfert aéroport', selected: false },
    { label: 'Spa', selected: false },
    { label: 'Salle de réunion', selected: false }
  ];

  hotelForm = {
    name: 'Hôtel Riviera & Spa',
    category: 'hotel',
    manager: '1',
    city: 'hammamet',
    description: 'Maquette statique d’une fiche établissement prête à être reliée au backend.',
    standardRooms: 20,
    deluxeRooms: 12,
    suites: 6,
    nightPrice: 180,
    checkIn: '14:00',
    checkOut: '12:00'
  };

  uploadedFiles: Array<{ name: string }> = [];

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push({ name: files[i].name });
    }
  }

  removeFile(fileToRemove: { name: string }): void {
    this.uploadedFiles = this.uploadedFiles.filter((file) => file !== fileToRemove);
  }
}
