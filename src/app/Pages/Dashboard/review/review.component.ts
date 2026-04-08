import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-review',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './review.component.html'
})
export class ReviewComponent {
  reviews = [
    { author: 'Rania Ben Amor', target: 'Hôtel Riviera & Spa', rating: '4.8/5', status: 'À modérer', date: '08/04/2026', comment: 'Accueil très professionnel, chambre propre et réservation fluide.' },
    { author: 'Nader Ghannouchi', target: 'Agence CarGo Tunisia', rating: '4.5/5', status: 'Publié', date: '07/04/2026', comment: 'Le retrait du véhicule était rapide, mais il faudrait améliorer la signalisation.' },
    { author: 'Olfa Heni', target: 'Zone Cap Bon', rating: '5/5', status: 'Publié', date: '06/04/2026', comment: 'Très belle présentation de la destination et des activités disponibles.' }
  ];
}
