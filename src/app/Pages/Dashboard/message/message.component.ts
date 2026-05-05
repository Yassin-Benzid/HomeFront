import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { ReservationService, Reservation } from '../../../service/reservation.service';
import { AuthService } from '../../../service/auth.service';
import { CurrencyService } from '../../../service/currency.service';

@Component({
  selector: 'app-message',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit {
  // Réservations récupérées du backend
  reservations: Reservation[] = [];
  
  // Réservation sélectionnée
  selectedReservation: Reservation | null = null;
  
  // Chargement et erreurs
  isLoading = true;
  errorMessage = '';
  
  // Rôle de l'utilisateur
  userRole = '';
  userId = 0;

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.loadUserInfo();
    this.loadReservations();
  }

  private loadUserInfo(): void {
    this.userRole = this.authService.getRole();
    // Pour l'ID utilisateur, nous devons le récupérer du token ou d'une autre source
    // Pour l'instant, nous utiliserons une valeur par défaut ou une autre approche
    this.userId = 0; // À adapter selon la structure de votre application
  }

  private loadReservations(): void {
    this.isLoading = true;
    this.errorMessage = '';
    
    this.reservationService.getReservationsForDashboard().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
        if (reservations.length > 0) {
          this.selectedReservation = reservations[0];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des réservations:', error);
        this.errorMessage = 'Impossible de charger les réservations. Veuillez réessayer.';
        this.isLoading = false;
      }
    });
  }

  selectReservation(reservation: Reservation): void {
    this.selectedReservation = reservation;
  }

  // Convertir une réservation en format d'affichage
  getReservationDisplayInfo(reservation: Reservation) {
    const clientName = reservation.client 
      ? `${reservation.client.prenom || ''} ${reservation.client.nom || ''}`.trim()
      : 'Client inconnu';
    
    const chambreInfo = reservation.chambres && reservation.chambres.length > 0
      ? `Chambre ${reservation.chambres[0].numero || reservation.chambres[0].idchambre}`
      : 'Aucune chambre';
    
    const period = `${this.formatDate(reservation.date_debut)} - ${this.formatDate(reservation.date_fin)}`;
    
    // Calculer le montant approximatif (prix par nuit * nombre de nuits)
    let amount = '0.00 TND';
    if (reservation.chambres && reservation.chambres.length > 0 && reservation.chambres[0].prix_nuit) {
      const start = new Date(reservation.date_debut);
      const end = new Date(reservation.date_fin);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
      const totalEur = reservation.chambres[0].prix_nuit * nights;
      amount = this.currencyService.convertAndFormat(totalEur);
    }
    
    return {
      ref: `RS-${reservation.idreservation.toString().padStart(4, '0')}`,
      type: 'Hôtel', // Toujours hôtel pour ce module
      client: clientName,
      item: chambreInfo,
      period: period,
      amount: amount,
      status: this.translateStatus(reservation.statut)
    };
  }

  private formatDate(date: Date | string): string {
    if (!date) return 'N/A';
    const d = new Date(date);
    return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  private translateStatus(status: string): string {
    const statusMap: { [key: string]: string } = {
      'en attente': 'En attente',
      'confirmée': 'Confirmée',
      'annulée': 'Annulée'
    };
    return statusMap[status] || status;
  }

  // Actions sur les réservations
  confirmReservation(): void {
    if (!this.selectedReservation) return;
    
    const clientId = this.selectedReservation.client.iduser;
    
    this.reservationService.confirmerReservation(this.selectedReservation.idreservation, clientId).subscribe({
      next: () => {
        alert('Réservation confirmée avec succès !');
        this.loadReservations(); // Recharger les données
      },
      error: (error) => {
        console.error('Erreur lors de la confirmation:', error);
        alert('Erreur lors de la confirmation de la réservation.');
      }
    });
  }

  cancelReservation(): void {
    if (!this.selectedReservation) return;
    
    const clientId = this.selectedReservation.client.iduser;
    
    this.reservationService.annulerReservation(this.selectedReservation.idreservation, clientId).subscribe({
      next: () => {
        alert('Réservation annulée avec succès !');
        this.loadReservations(); // Recharger les données
      },
      error: (error) => {
        console.error('Erreur lors de l\'annulation:', error);
        alert('Erreur lors de l\'annulation de la réservation.');
      }
    });
  }

  // Vérifier les permissions
  canConfirm(): boolean {
    return this.userRole === 'hotel-manager' && 
           this.selectedReservation?.statut === 'en attente';
  }

  canCancel(): boolean {
    if (!this.selectedReservation) return false;
    
    const isHotelManager = this.userRole === 'hotel-manager';
    const isClient = this.userRole === 'client' && this.selectedReservation.client.iduser === this.userId;
    
    return (isHotelManager || isClient) && 
           this.selectedReservation.statut !== 'annulée';
  }
}
