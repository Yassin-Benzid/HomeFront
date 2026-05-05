import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { FactureService, Facture } from '../../../service/facture.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-facturation',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './facturation.component.html'
})
export class FacturationComponent implements OnInit {

  factures: Facture[] = [];
  isLoading = false;
  selectedFacture: Facture | null = null;
  showModal = false;
  userRole: string | null = null;
  
  stats = {
    payees: 0,
    enAttente: 0,
    montantMois: 0
  };

  constructor(
    private factureService: FactureService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getRole();
    this.loadFactures();
  }

  loadFactures() {
    this.isLoading = true;
    this.factureService.findAll().subscribe({
      next: (factures) => {
        this.factures = factures;
        this.isLoading = false;

        // Calcul statistiques
        this.stats.payees = factures.filter(f => f.statut === 'PAYEE').length;
        this.stats.enAttente = factures.filter(f => f.statut === 'EN_ATTENTE' || f.statut === 'ENVOYEE').length;
        this.stats.montantMois = factures
          .filter(f => {
            const dateFacture = new Date(f.date_Facture);
            const now = new Date();
            return dateFacture.getMonth() === now.getMonth() && dateFacture.getFullYear() === now.getFullYear();
          })
          .reduce((sum, f) => sum + (f.montant_Total || 0), 0);
      },
      error: (err) => {
        console.error('Erreur chargement factures', err);
        alert('Impossible de charger les factures');
        this.isLoading = false;
      }
    });
  }

  openFactureModal(facture: Facture) {
    this.selectedFacture = facture;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedFacture = null;
  }

  canShowPayButton(): boolean {
    // Masquer pour hotel-manager et agency-manager
    if (this.userRole === 'hotel-manager' || this.userRole === 'agency-manager') {
      return false;
    }
    // Afficher pour client et admin
    return true;
  }

}
