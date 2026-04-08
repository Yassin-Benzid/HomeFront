import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-favourites',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './favourites.component.html'
})
export class FavouritesComponent {
  // NOTE: ancien écran "favourites" reconverti en wishlist client.
  wishlists = [
    { client: 'Yasmine Trabelsi', items: ['Hôtel Riviera & Spa', 'Circuit désert & oasis', 'SUV automatique'], updatedAt: 'Aujourd’hui', count: 3 },
    { client: 'Karim Baccar', items: ['Djerba Lagoon Resort', 'Citadine économique'], updatedAt: 'Hier', count: 2 },
    { client: 'Nour Bouslama', items: ['Médina de Tunis', 'Cap Bon', 'Maison d’hôtes Sidi Bou Saïd'], updatedAt: '06/04/2026', count: 3 }
  ];
}
