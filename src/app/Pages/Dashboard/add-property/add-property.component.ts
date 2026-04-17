import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

import { HotelService } from '../../../service/hotel.service';
import { ChambreService } from '../../../service/chambre.service';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [DashboardNavbarComponent, FormsModule, CommonModule],
  templateUrl: './add-property.component.html'
})
export class AddPropertyComponent implements OnInit {

  constructor(
    private hotelService: HotelService,
    private chambreService: ChambreService
  ) {}

  // ================= DATA =================
  hotels: any[] = [];

  hotelForm: any = {
    idhotel: null,
    nom: '',
    ville: '',
    nb_Etoiles: 1,
    nb_Chambres: 0,
    telephone: '',
    latitude: 0,
    longitude: 0,
    images: []
  };

  chambres: any[] = [];
  message = '';

  // ================= MODAL =================
  showModal = false;
  editMode = false;

  uploadedFiles: File[] = [];

  ngOnInit() {
    this.loadHotels();
  }

  // ================= LOAD =================
  loadHotels() {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = res;
    });
  }

  openAddModal() {
    this.resetForm();
    this.editMode = false;
    this.showModal = true;
  }

  openEditModal(hotel: any) {
    this.editMode = true;
    this.showModal = true;

    this.hotelForm = { ...hotel };

    this.chambreService.getAllChambres().subscribe(res => {
      this.chambres = res.filter((c: any) => c.hotel?.idhotel === hotel.idhotel);
    });
  }

  closeModal() {
    this.showModal = false;
  }

  // ================= CHAMBRES =================
  addChambre() {
    this.chambres.push({
      numero: '',
      capacite: 1,
      etat: 'disponible',
      prix_Nuit: 0
    });
  }

  removeChambre(i: number) {
    this.chambres.splice(i, 1);
  }

  // ================= FILES =================
  onFileChange(event: any) {
    const files = event.target.files;
    if (!files) return;

    this.uploadedFiles = Array.from(files);
  }

  // ================= SAVE =================
  saveHotel() {

    this.hotelService.uploadImages(this.uploadedFiles).subscribe({
      next: (res) => {

        this.hotelForm.images = res.images;

        if (!this.editMode) {

          this.hotelService.createHotel(this.hotelForm).subscribe({
            next: () => {
              this.message = 'Hôtel et images enregistrés ✅';
              this.closeModal();
              this.loadHotels();
            }
          });

        } else {

          this.hotelService.updateHotel(this.hotelForm.idhotel, this.hotelForm).subscribe({
            next: () => {

              this.chambres.forEach(c => {
                if (c.idchambre) {
                  this.chambreService.updateChambre(c.idchambre, c).subscribe();
                } else {
                  c.hotel = { idhotel: this.hotelForm.idhotel };
                  this.chambreService.createChambre(c).subscribe();
                }
              });

              this.message = 'Hôtel modifié avec images + chambres ✅';
              this.closeModal();
              this.loadHotels();
            }
          });
        }
      }
    });
  }

  // ================= RESET =================
  resetForm() {
    this.hotelForm = {
      idhotel: null,
      nom: '',
      ville: '',
      nb_Etoiles: 1,
      nb_Chambres: 0,
      telephone: '',
      latitude: 0,
      longitude: 0,
      images: []
    };

    this.chambres = [];
    this.uploadedFiles = [];
  }

  // ================= IMAGE URL (FIXED) =================
  getImageUrl(img: string): string {
    return 'http://localhost:3000' + img;
  }
}