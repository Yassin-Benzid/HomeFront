import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-agency-manager-dashboard',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule, RouterModule],
  templateUrl: './agency-manager-dashboard.component.html'
})
export class AgencyManagerDashboardComponent implements OnInit {

  stats: Array<{ icon: string; title: string; value: string }> = [
    { icon: 'assets/dashboard-images/icon/icon_4.svg', title: 'Voitures totales', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_13.svg', title: 'Locations en cours', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_14.svg', title: 'Voitures disponibles', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_10.svg', title: 'Factures générées', value: '0' }
  ];

  fleetMetrics = [
    { label: 'Taux d\'utilisation parc', value: 0 },
    { label: 'Locations à confirmer', value: 0 },
    { label: 'Taux de paiement effectué', value: 0 }
  ];

  recentActivities = [
    { module: 'Gestion Véhicules', action: 'Modification état voiture N°742: Disponible', author: 'Agency Manager', when: '08:30' },
    { module: 'Locations', action: 'Location #LC-1189 confirmée pour M. Toumi', author: 'Agency Manager', when: '09:45' },
    { module: 'Facturation', action: 'Facture #FAC-561 générée et envoyée', author: 'Système', when: '10:20' },
    { module: 'Notification', action: 'Rappel retour véhicule envoyé à 8 clients', author: 'Agency Manager', when: '11:55' }
  ];

  alerts = [
    { title: '4 locations en attente de validation', level: 'warning', detail: 'Vérifier disponibilités véhicules et valider.' },
    { title: '2 véhicules nécessitant maintenance', level: 'danger', detail: 'Marquer indisponible et planifier entretien.' },
    { title: '7 factures à générer pour cette semaine', level: 'info', detail: 'Générer et envoyer aux clients avant fin location.' }
  ];

  quickActions = [
    { label: 'Gérer les véhicules', icon: 'bi-car-front', route: '/agences-voitures' },
    { label: 'Confirmer locations', icon: 'bi-calendar-check', route: '/locations' },
    { label: 'Générer facture', icon: 'bi-file-earmark-text', route: '/facturation' },
    { label: 'Envoyer notification', icon: 'bi-bell', route: '/message' },
    { label: 'Historique locations', icon: 'bi-clock-history', route: '/locations' }
  ];

  reservationPipelines = [
  { label: 'Réservations en attente', value: 40 },
  { label: 'Confirmées', value: 70 },
  { label: 'Annulées', value: 20 }
];

  ngOnInit(): void {
    this.loadAgencyManagerStats();
  }

  private loadAgencyManagerStats() {
    // Données simulées en attendant service dédié
    this.stats = [
      { icon: 'assets/dashboard-images/icon/icon_4.svg', title: 'Voitures totales', value: String(Math.floor(Math.random() * 40 + 15)) },
      { icon: 'assets/dashboard-images/icon/icon_13.svg', title: 'Locations en cours', value: String(Math.floor(Math.random() * 25 + 5)) },
      { icon: 'assets/dashboard-images/icon/icon_14.svg', title: 'Voitures disponibles', value: String(Math.floor(Math.random() * 15 + 3)) },
      { icon: 'assets/dashboard-images/icon/icon_10.svg', title: 'Factures générées', value: String(Math.floor(Math.random() * 70 + 25)) }
    ];

    this.fleetMetrics = [
      { label: 'Taux d\'utilisation parc', value: Math.round(Math.random() * 30 + 60) },
      { label: 'Locations à confirmer', value: Math.round(Math.random() * 40) },
      { label: 'Taux de paiement effectué', value: Math.round(Math.random() * 35 + 55) }
    ];
  }
}