import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-saved-search',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './saved-search.component.html'
})
export class SavedSearchComponent {
  // NOTE: ancien écran "saved-search" reconverti en gestion des zones touristiques.
  zones = [
    { id: 1, name: 'Médina de Tunis', city: 'Tunis', category: 'Patrimoine', status: 'Publié', updatedAt: '08/04/2026' },
    { id: 2, name: 'Cap Bon', city: 'Nabeul', category: 'Balnéaire', status: 'Publié', updatedAt: '05/04/2026' },
    { id: 3, name: 'Oasis de Tozeur', city: 'Tozeur', category: 'Nature', status: 'Brouillon', updatedAt: '01/04/2026' },
    { id: 4, name: 'Village troglodyte de Matmata', city: 'Gabès', category: 'Culture', status: 'Publié', updatedAt: '28/03/2026' }
  ];

  deleteRecord(recordId: number): void {
    this.zones = this.zones.filter((zone) => zone.id !== recordId);
  }
}
