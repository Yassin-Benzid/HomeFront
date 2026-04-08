import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

interface ReservationItem {
  ref: string;
  type: 'Hôtel' | 'Voiture';
  client: string;
  item: string;
  period: string;
  amount: string;
  status: string;
}

@Component({
  selector: 'app-message',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './message.component.html'
})
export class MessageComponent {
  // NOTE: ancien écran "message" reconverti en gestion des réservations.
  reservations: ReservationItem[] = [
    { ref: 'RS-3021', type: 'Hôtel', client: 'Yasmine Trabelsi', item: 'Hôtel Riviera & Spa - Suite vue mer', period: '12/04/2026 - 15/04/2026', amount: '435 EUR', status: 'Confirmée' },
    { ref: 'RS-3022', type: 'Voiture', client: 'Karim Baccar', item: 'SUV automatique - Agence CarGo', period: '13/04/2026 - 17/04/2026', amount: '288 EUR', status: 'En attente' },
    { ref: 'RS-3023', type: 'Hôtel', client: 'Rania Ben Amor', item: 'Sousse Palace - Chambre deluxe', period: '20/04/2026 - 24/04/2026', amount: '520 EUR', status: 'Confirmée' },
    { ref: 'RS-3024', type: 'Voiture', client: 'Nader Ghannouchi', item: 'Citadine économique - Djerba', period: '21/04/2026 - 25/04/2026', amount: '160 EUR', status: 'Annulée' }
  ];

  selectedReservation: ReservationItem = this.reservations[0];

  selectReservation(reservation: ReservationItem): void {
    this.selectedReservation = reservation;
  }
}
