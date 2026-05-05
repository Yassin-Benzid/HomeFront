import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { ChambreService, UpdateChambreDto } from '../../../service/chambre.service';

@Component({
  selector: 'app-hotel-manager-dashboard',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule, RouterModule, FormsModule],
  templateUrl: './hotel-manager-dashboard.component.html'
})
export class HotelManagerDashboardComponent implements OnInit {

  stats: Array<{ icon: string; title: string; value: string }> = [
    { icon: 'assets/dashboard-images/icon/icon_12.svg', title: 'Chambres totales', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_13.svg', title: 'Réservations en cours', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_14.svg', title: 'Chambres disponibles', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_15.svg', title: 'Factures générées', value: '0' }
  ];

  occupationMetrics = [
    { label: 'Taux d\'occupation des chambres', value: 0 },
    { label: 'Réservations à confirmer', value: 0 },
    { label: 'Taux de paiement effectué', value: 0 }
  ];

  recentActivities = [
    { module: 'Gestion Chambres', action: 'Modification état chambre N°214: Disponible', author: 'Hotel Manager', when: '09:15' },
    { module: 'Réservations', action: 'Réservation #RS-4127 confirmée pour M. Ben Ali', author: 'Hotel Manager', when: '10:40' },
    { module: 'Facturation', action: 'Facture #FAC-784 générée et envoyée par email', author: 'Système', when: '11:05' },
    { module: 'Notification', action: 'Rappel check-in envoyé à 12 clients', author: 'Hotel Manager', when: '12:20' }
  ];

  alerts = [
    { title: '5 réservations en attente de confirmation', level: 'warning', detail: 'Vérifier disponibilités et valider dans les 24h.' },
    { title: '3 chambres nécessitant mise à jour état', level: 'danger', detail: 'Marquer comme en maintenance ou nettoyage terminé.' },
    { title: '8 factures à générer pour ce mois', level: 'info', detail: 'Générer et envoyer aux clients avant fin de séjour.' }
  ];

  quickActions = [
    { label: 'Gérer les chambres', icon: 'bi-door-open', route: '/hotels' },
    { label: 'Confirmer réservations', icon: 'bi-calendar-check', route: '/reservations' },
    { label: 'Générer facture', icon: 'bi-file-earmark-text', route: '/facturation' },
    { label: 'Envoyer notification', icon: 'bi-bell', route: '/message' },
    { label: 'Historique réservations', icon: 'bi-clock-history', route: '/reservations' }
  ];

  reservationPipelines = [
  { label: 'Locations en attente', value: 50 },
  { label: 'Confirmées', value: 65 },
  { label: 'Annulées', value: 15 }
];

  constructor(private chambreService: ChambreService) {}

  ngOnInit(): void {
    this.loadHotelManagerStats();
  }

  private loadHotelManagerStats() {
    this.chambreService.getAllChambres().subscribe({
      next: (chambres: any[]) => {
        const total = chambres.length;
        const disponibes = chambres.filter(c => c.etat === 'DISPONIBLE').length;
        const occupees = total - disponibes;

        this.stats = [
          { icon: 'assets/dashboard-images/icon/icon_12.svg', title: 'Chambres totales', value: String(total) },
          { icon: 'assets/dashboard-images/icon/icon_13.svg', title: 'Réservations en cours', value: String(occupees) },
          { icon: 'assets/dashboard-images/icon/icon_14.svg', title: 'Chambres disponibles', value: String(disponibes) },
          { icon: 'assets/dashboard-images/icon/icon_15.svg', title: 'Factures générées', value: String(Math.floor(Math.random() * 50 + 20)) }
        ];

        this.occupationMetrics = [
          { label: 'Taux d\'occupation des chambres', value: total ? Math.round((occupees / total) * 100) : 0 },
          { label: 'Réservations à confirmer', value: Math.round(Math.random() * 30) },
          { label: 'Taux de paiement effectué', value: Math.round(Math.random() * 40 + 50) }
        ];
      },
      error: (err) => {
        console.error('Erreur chargement statistiques Hotel Manager', err);
      }
    });
  }

}
