import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { AdminService } from '../../../service/admin.service';
import { ReservationService, Reservation } from '../../../service/reservation.service';
import { FactureService, Facture } from '../../../service/facture.service';

@Component({
  selector: 'app-dashboard-index',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './dashboard-index.component.html'
})
export class DashboardIndexComponent implements OnInit {
  stats: Array<{ icon: string; title: string; value: string }> = [
    { icon: 'assets/dashboard-images/icon/icon_12.svg', title: 'Hôtels actifs', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_13.svg', title: 'Réservations', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_13.svg', title: 'Locations', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_14.svg', title: 'Zones publiées', value: '0' },
    { icon: 'assets/dashboard-images/icon/icon_15.svg', title: 'Agences partenaires', value: '0' }
  ];

  reservationPipelines = [
    { label: 'Chambres (relative)', value: 0 },
    { label: 'Locations voitures (relative)', value: 0 },
    { label: 'Paiements validés (%)', value: 0 }
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

  reservations: Reservation[] = [];
  factures: Facture[] = [];
  isLoadingReservations = false;
  isLoadingFactures = false;

  constructor(
    private adminService: AdminService,
    private reservationService: ReservationService,
    private factureService: FactureService
  ) {}

  ngOnInit(): void {
    this.fetchStats();
    this.loadReservations();
    this.loadFactures();
  }

  loadReservations() {
    this.isLoadingReservations = true;
    this.reservationService.getReservationsForDashboard().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        this.isLoadingReservations = false;
      },
      error: (err) => {
        console.error('Erreur chargement réservations', err);
        alert('Impossible de charger les réservations');
        this.isLoadingReservations = false;
      }
    });
  }

  loadFactures() {
    this.isLoadingFactures = true;
    this.factureService.findAll().subscribe({
      next: (factures) => {
        this.factures = factures;
        this.isLoadingFactures = false;
      },
      error: (err) => {
        console.error('Erreur chargement factures', err);
        alert('Impossible de charger les factures');
        this.isLoadingFactures = false;
      }
    });
  }

  confirmerReservation(reservation: Reservation) {
    this.reservationService.confirmerReservation(reservation.idreservation, reservation.client.iduser).subscribe({
      next: () => {
        alert(`✅ Réservation #${reservation.idreservation} confirmée avec succès`);
        
        // Création automatique de la facture
        this.factureService.createAuto(reservation.idreservation).subscribe({
          next: (facture) => {
            alert(`✅ Facture #${facture.idfacture} générée automatiquement et envoyée au client`);
            this.loadReservations();
            this.loadFactures();
          },
          error: (err) => {
            alert('❌ Erreur lors de la génération de la facture');
          }
        });
      },
      error: (err) => {
        alert('❌ Erreur lors de la confirmation de la réservation');
      }
    });
  }

  annulerReservation(reservation: Reservation) {
    if (!confirm(`Êtes-vous sûr de vouloir annuler la réservation #${reservation.idreservation} ?`)) {
      return;
    }

    this.reservationService.annulerReservation(reservation.idreservation, reservation.client.iduser).subscribe({
      next: () => {
        alert(`⚠️ Réservation #${reservation.idreservation} annulée. Notification envoyée au client.`);
        this.loadReservations();
      },
      error: (err) => {
        alert('❌ Erreur lors de l\'annulation de la réservation');
      }
    });
  }

  private fetchStats() {
    this.adminService.getDashboardStats().subscribe({
      next: (res: any) => {
        this.stats = [
          { icon: 'assets/dashboard-images/icon/icon_12.svg', title: 'Hôtels actifs', value: String(res.hotels ?? 0) },
          { icon: 'assets/dashboard-images/icon/icon_13.svg', title: 'Réservations', value: String(res.reservations ?? 0) },
          { icon: 'assets/dashboard-images/icon/icon_13.svg', title: 'Locations', value: String(res.locations ?? 0) },
          { icon: 'assets/dashboard-images/icon/icon_14.svg', title: 'Zones publiées', value: String(res.zones ?? 0) },
          { icon: 'assets/dashboard-images/icon/icon_15.svg', title: 'Agences partenaires', value: String(res.agences ?? 0) }
        ];

        const chambres = Number(res.chambres ?? 0);
        const locations = Number(res.locations ?? 0);
        const voitures = Number(res.voitures ?? 0);
        const reservations = Number(res.reservations ?? 0);
        const factures = Number(res.facturesPayees ?? 0);

        const maxRel = Math.max(chambres, locations, 1);

        this.reservationPipelines = [
          { label: 'Chambres (relative)', value: Math.round((chambres / maxRel) * 100) },
          { label: 'Locations voitures (relative)', value: Math.round((locations / maxRel) * 100) },
          { label: 'Paiements validés (%)', value: reservations ? Math.round((factures / reservations) * 100) : 0 }
        ];
      },
      error: (err) => {
        console.error('Erreur récupération statistiques dashboard', err);
      }
    });
  }
}
