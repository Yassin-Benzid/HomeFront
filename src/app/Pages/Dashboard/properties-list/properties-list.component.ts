import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-properties-list',
  imports: [DashboardNavbarComponent, CommonModule, RouterLink],
  templateUrl: './properties-list.component.html'
})
export class PropertiesListComponent {
  // NOTE: ancien écran "properties-list" reconverti en gestion des hôtels et chambres.
  hotels = [
    { name: 'Hôtel Riviera & Spa', city: 'Hammamet', manager: 'Sami Gharbi', rooms: 86, available: 42, status: 'Actif' },
    { name: 'Sousse Palace', city: 'Sousse', manager: 'Meriem Kallel', rooms: 64, available: 18, status: 'Actif' },
    { name: 'Djerba Lagoon Resort', city: 'Djerba', manager: 'Walid Mansour', rooms: 92, available: 11, status: 'Maintenance' },
    { name: 'Kasbah Desert Lodge', city: 'Tozeur', manager: 'Hanen Krichen', rooms: 27, available: 9, status: 'Actif' }
  ];
}
