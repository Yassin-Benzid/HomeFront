import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

import { AgenceService } from '../../../service/agence.service';
import { VoitureService } from '../../../service/voiture.service'; // ✅ NEW

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [DashboardNavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './add-account.component.html'
})
export class AddAccountComponent {

  constructor(
    private agenceService: AgenceService,
    private voitureService: VoitureService // ✅ inject
  ) {}

  agenceForm: any = {
    nom: '',
    ville: '',
    telephone: '',
    latitude: 0,
    longitude: 0
  };

  voitures: any[] = [];

  message = '';

  // ================= ADD VOITURE =================
  addVoiture() {
    this.voitures.push({
      marque: '',
      modele: '',
      immatriculation: '',
      etat: 'disponible',
      prix_Jour: 0
    });
  }

  removeVoiture(index: number) {
    this.voitures.splice(index, 1);
  }

  // ================= SAVE =================
  saveAgence() {

    this.agenceService.createAgence(this.agenceForm).subscribe({
      next: (res) => {

        const agenceId = res.idagence;

        // 🔥 CREATE VOITURES
        for (let v of this.voitures) {

          const voitureData = {
            ...v,
            agenceId: agenceId
          };

          this.voitureService.createVoiture(voitureData).subscribe({
            next: () => console.log('Voiture ajoutée ✅'),
            error: () => console.error('Erreur ajout voiture ❌')
          });
        }

        this.message = 'Agence et voitures ajoutées avec succès ✅';

        // reset
        this.agenceForm = {};
        this.voitures = [];
      },

      error: () => {
        this.message = 'Erreur ajout agence ❌';
      }
    });
  }
}