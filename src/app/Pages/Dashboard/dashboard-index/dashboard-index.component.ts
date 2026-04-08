import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-dashboard-index',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './dashboard-index.component.html'
})
export class DashboardIndexComponent {
  stats = [
    { icon: 'assets/dashboard-images/icon/icon_12.svg', title: 'Hôtels actifs', value: '28' },
    { icon: 'assets/dashboard-images/icon/icon_13.svg', title: 'Réservations du jour', value: '46' },
    { icon: 'assets/dashboard-images/icon/icon_14.svg', title: 'Zones publiées', value: '19' },
    { icon: 'assets/dashboard-images/icon/icon_15.svg', title: 'Agences partenaires', value: '12' }
  ];

  reservationPipelines = [
    { label: 'Chambres confirmées', value: 78 },
    { label: 'Locations voitures confirmées', value: 64 },
    { label: 'Paiements validés', value: 85 }
  ];

  recentActivities = [
    { module: 'Hôtels', action: 'Nouvelle chambre ajoutée à Hôtel Riviera & Spa', author: 'Manager Hammamet', when: '09:15' },
    { module: 'Réservations', action: 'Réservation #RS-3021 confirmée', author: 'Client web', when: '10:40' },
    { module: 'Facturation', action: 'Facture #FAC-992 réglée par carte', author: 'Passerelle paiement', when: '11:05' },
    { module: 'Zones', action: 'Zone touristique "Cap Bon" mise à jour', author: 'Admin contenu', when: '12:20' }
  ];

  alerts = [
    { title: '7 réservations à confirmer', level: 'warning', detail: 'Vérifier les disponibilités des chambres avant validation.' },
    { title: '2 agences sans flotte active', level: 'danger', detail: 'Compléter ou archiver les agences concernées.' },
    { title: '12 avis en attente de modération', level: 'success', detail: 'Les commentaires clients doivent être publiés ou rejetés.' }
  ];
}
