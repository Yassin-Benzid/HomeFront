import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { AgenceService } from '../../../service/agence.service';
import { VoitureService } from '../../../service/voiture.service';

@Component({
  selector: 'app-agency-voitures-management',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule, FormsModule],
  templateUrl: './agency-voitures-management.component.html'
})
export class AgencyVoituresManagementComponent implements OnInit {

  constructor(
    private agenceService: AgenceService,
    private voitureService: VoitureService
  ) {}

  agence: any = null;
  voitures: any[] = [];
  editVoitureId: number | null = null;
  message = '';
  disponibiliteCheck: { [id: number]: { loading: boolean, disponible?: boolean, dateDebut: string, dateFin: string } } = {};

  ngOnInit() {
    this.loadAgenceData();
  }

  loadAgenceData() {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    // Récupérer SEULEMENT les voitures de l'agence de l'agence-manager connecté
    this.voitureService.getAllVoitures().subscribe({
      next: (voituresResult: any) => {
        this.voitures = Array.isArray(voituresResult) ? voituresResult : [];
        
        // Initialiser les objets de vérification de disponibilité
        this.voitures.forEach(v => {
          this.disponibiliteCheck[v.idvoiture] = {
            loading: false,
            dateDebut: '',
            dateFin: ''
          };
        });
      },
      error: () => {
        this.message = 'Erreur lors du chargement des données';
      }
    });
  }

  toggleEdit(idvoiture: number) {
    this.editVoitureId = this.editVoitureId === idvoiture ? null : idvoiture;
  }

  saveVoiture(voiture: any) {
    const dto: any = {
      marque: voiture.marque,
      modele: voiture.modele,
      immatriculation: voiture.immatriculation,
      etat: voiture.etat,
      prix_Jour: voiture.prix_Jour
    };

    this.voitureService.updateVoiture(voiture.idvoiture, dto).subscribe({
      next: () => {
        this.message = `✅ Voiture ${voiture.marque} ${voiture.modele} modifiée avec succès`;
        this.editVoitureId = null;
        setTimeout(() => this.message = '', 4000);
      },
      error: () => {
        this.message = '❌ Erreur lors de la modification de la voiture';
      }
    });
  }

  verifierDisponibilite(idvoiture: number) {
    const check = this.disponibiliteCheck[idvoiture];
    if (!check.dateDebut || !check.dateFin) {
      this.message = '⚠️ Veuillez indiquer les dates de début et de fin';
      return;
    }

    check.loading = true;
    check.disponible = undefined;

    this.voitureService.checkDisponibilite(idvoiture, check.dateDebut, check.dateFin).subscribe({
      next: (res: any) => {
        check.disponible = res.disponible ?? true;
        check.loading = false;
      },
      error: () => {
        check.loading = false;
        this.message = '❌ Erreur lors de la vérification de disponibilité';
      }
    });
  }

  getEtatBadgeClass(etat: string): string {
    switch (etat?.toLowerCase()) {
      case 'disponible': return 'bg-success text-white';
      case 'louée': return 'bg-danger text-white';
      case 'maintenance': return 'bg-warning text-dark';
      default: return 'bg-secondary text-white';
    }
  }
}