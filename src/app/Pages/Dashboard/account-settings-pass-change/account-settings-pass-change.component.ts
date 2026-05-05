import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { FactureService, Facture } from '../../../service/facture.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-account-settings-pass-change',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './account-settings-pass-change.component.html'
})
export class AccountSettingsPassChangeComponent implements OnInit {

  factures: Facture[] = [];
  selectedFacture?: Facture;

  constructor(
    private factureService: FactureService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures(): void {
    this.factureService.findAll().subscribe({
      next: (data) => {
        this.factures = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des factures:', err);
      }
    });
  }

  selectFacture(facture: Facture): void {
    this.selectedFacture = facture;
  }

  payerFacture(): void {
    if (this.selectedFacture && this.canPayer()) {
      this.factureService.payer(this.selectedFacture.idfacture).subscribe({
        next: () => {
          this.loadFactures();
        },
        error: (err) => {
          console.error('Erreur lors du paiement:', err);
        }
      });
    }
  }

  canPayer(): boolean {
    const isAdmin = this.authService.getRole() === 'admin';
    return !isAdmin && (this.selectedFacture?.statut === 'non payee' || this.selectedFacture?.statut === 'non payée');
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }

  getStatutBadgeClass(statut: string): string {
    if (statut === 'payee' || statut === 'payée') {
      return 'text-bg-success';
    }
    if (statut === 'annulée') {
      return 'text-bg-danger';
    }
    return 'text-bg-light';
  }

  getStatutLabel(statut: string): string {
    switch(statut) {
      case 'payee': return 'Payée';
      case 'non payee': return 'Non payée';
      case 'annulée': return 'Annulée';
      default: return statut;
    }
  }

  getTotalPayees(): number {
    return this.factures.filter(f => f.statut === 'payee' || f.statut === 'payée').length;
  }

  getTotalEnAttente(): number {
    return this.factures.filter(f => f.statut === 'non payee' || f.statut === 'non payée').length;
  }

  getMontantTotalMois(): number {
    const now = new Date();
    return this.factures
      .filter(f => new Date(f.date_Facture).getMonth() === now.getMonth())
      .reduce((sum, f) => sum + (f.montant_Total || 0), 0);
  }

  /**
   * Calcul le montant total d'une facture = montant réservation + montant location
   * Même logique que côté backend NestJS
   */
  calculerMontantTotalFacture(reservation?: any, location?: any): number {
    let montantReservation = 0;
    let montantLocation = 0;

    // Calcul montant réservation
    if (reservation && reservation.chambres && reservation.date_debut && reservation.date_fin) {
      const nbJoursReservation = this.calculateDays(reservation.date_debut, reservation.date_fin);
      montantReservation = reservation.chambres.reduce((sum: number, chambre: any) => {
        return sum + (chambre.prix_Nuit || chambre.prix_nuit || 0) * nbJoursReservation;
      }, 0);
    }

    // Calcul montant location
    if (location && location.voiture && location.date_debut && location.date_fin) {
      const nbJoursLocation = this.calculateDays(location.date_debut, location.date_fin);
      montantLocation = (location.voiture.prix_Jour || location.voiture.prix_jour || 0) * nbJoursLocation;
    }

    return montantReservation + montantLocation;
  }

  private calculateDays(start: Date, end: Date): number {
    return Math.max(
      1,
      Math.ceil(
        (new Date(end).getTime() - new Date(start).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    );
  }
}
