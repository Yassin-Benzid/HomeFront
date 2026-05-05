import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { HotelService } from '../../../service/hotel.service';
import { ChambreService, UpdateChambreDto } from '../../../service/chambre.service';

@Component({
  selector: 'app-hotel-chambres-management',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule, FormsModule],
  templateUrl: './hotel-chambres-management.component.html'
})
export class HotelChambresManagementComponent implements OnInit {

  constructor(
    private hotelService: HotelService,
    private chambreService: ChambreService
  ) {}

  hotel: any = null;
  chambres: any[] = [];
  editChambreId: number | null = null;
  message = '';
  disponibiliteCheck: { [id: number]: { loading: boolean, disponible?: boolean, dateDebut: string, dateFin: string } } = {};

  ngOnInit() {
    this.loadHotelData();
  }

  loadHotelData() {
    const userData = localStorage.getItem('user');
    if (!userData) return;

    // ✅ CORRECTION DEFINITIVE: On utilise directement le service chambre qui va automatiquement
    // récupérer SEULEMENT les chambres de l'hotel de l'utilisateur connecté
    this.chambreService.getAllChambres().subscribe({
      next: (chambresResult: any) => {
        this.chambres = Array.isArray(chambresResult) ? chambresResult : [];
        
        // Initialiser les objets de vérification de disponibilité
        this.chambres.forEach(ch => {
          this.disponibiliteCheck[ch.idchambre] = {
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

  toggleEdit(idchambre: number) {
    this.editChambreId = this.editChambreId === idchambre ? null : idchambre;
  }

  saveChambre(chambre: any) {
    const dto: UpdateChambreDto = {
      capacite: chambre.capacite,
      etat: chambre.etat,
      prix_Nuit: chambre.prix_Nuit
    };

    this.chambreService.updateChambre(chambre.idchambre, dto).subscribe({
      next: () => {
        this.message = `✅ Chambre ${chambre.numero} modifiée avec succès`;
        this.editChambreId = null;
        setTimeout(() => this.message = '', 4000);
      },
      error: () => {
        this.message = '❌ Erreur lors de la modification de la chambre';
      }
    });
  }

  verifierDisponibilite(idchambre: number) {
    const check = this.disponibiliteCheck[idchambre];
    if (!check.dateDebut || !check.dateFin) {
      this.message = '⚠️ Veuillez indiquer les dates de début et de fin';
      return;
    }

    check.loading = true;
    check.disponible = undefined;

    this.chambreService.verifierDisponibilite(idchambre, check.dateDebut, check.dateFin).subscribe({
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
      case 'occupee': return 'bg-danger text-white';
      case 'maintenance': return 'bg-warning text-dark';
      default: return 'bg-secondary text-white';
    }
  }
}