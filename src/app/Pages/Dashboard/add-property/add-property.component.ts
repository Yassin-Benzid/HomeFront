import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { HotelService } from '../../../service/hotel.service';
import { ChambreService } from '../../../service/chambre.service';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [DashboardNavbarComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './add-property.component.html'
})
export class AddPropertyComponent {

  constructor(
    private hotelService: HotelService,
    private chambreService: ChambreService
  ) {}

  hotelForm: any = {
    nom: '',
    ville: '',
    nb_Etoiles: 1,
    telephone: '',
    latitude: 0,
    longitude: 0
  };

  chambres: any[] = [];

  message = '';

  // ===== CHAMBRES =====
  addChambre() {
    this.chambres.push({
      numero: '',
      capacite: 1,
      etat: 'disponible',
      prix_Nuit: 0
    });
  }

  removeChambre(index: number) {
    this.chambres.splice(index, 1);
  }

  // ===== SAVE =====
  saveHotel() {

    this.hotelService.createHotel(this.hotelForm).subscribe({

      next: (hotel) => {

        const hotelId = hotel.idhotel;

        for (let c of this.chambres) {
          c.hotelId = hotelId;
          this.chambreService.createChambre(c).subscribe();
        }

        this.message = 'Hôtel + chambres ajoutés avec succès';
      },

      error: () => {
        this.message = 'Erreur lors de l’ajout';
      }
    });
  }

  // ===== FILES =====
  uploadedFiles: any[] = [];

  onFileChange(event: any) {
    const files = event.target.files;

    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      this.uploadedFiles.push(files[i]);
    }
  }

  removeFile(file: any) {
    this.uploadedFiles = this.uploadedFiles.filter(f => f !== file);
  }
}