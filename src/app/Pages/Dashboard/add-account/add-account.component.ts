import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

import { AgenceService } from '../../../service/agence.service';
import { VoitureService } from '../../../service/voiture.service';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [DashboardNavbarComponent, FormsModule, CommonModule],
  templateUrl: './add-account.component.html'
})
export class AddAccountComponent implements OnInit {

  constructor(
    private agenceService: AgenceService,
    private voitureService: VoitureService
  ) {}

  // ================= DATA =================
  agences: any[] = [];

  agenceForm: any = {
    idagence: null,
    nom: '',
    ville: '',
    telephone: '',
    nb_Voitures: 0,
    latitude: 0,
    longitude: 0,
    images: []
  };

  voitures: any[] = [];

  message = '';

  // ================= MODAL =================
  showModal = false;
  editMode = false;

  uploadedFiles: File[] = [];

  // ================= LOAD =================
  ngOnInit() {
    this.loadAgences();
  }

  loadAgences() {
    this.agenceService.getAllAgences().subscribe(res => {
      this.agences = res;
    });
  }

  openAddModal() {
    this.resetForm();
    this.editMode = false;
    this.showModal = true;
  }

  openEditModal(agence: any) {
    this.editMode = true;
    this.showModal = true;

    this.agenceForm = { ...agence };

    this.voitureService.getAllVoitures().subscribe(res => {
      this.voitures = res.filter((v: any) => v.agence?.idagence === agence.idagence);
    });
  }

  closeModal() {
    this.showModal = false;
  }

  // ================= VOITURES =================
  addVoiture() {
    this.voitures.push({
      marque: '',
      modele: '',
      immatriculation: '',
      etat: 'disponible',
      prix_Jour: 0
    });
  }

  removeVoiture(i: number) {
    this.voitures.splice(i, 1);
  }

  // ================= FILES =================
  onFileChange(event: any) {
    const files = event.target.files;
    if (!files) return;

    this.uploadedFiles = Array.from(files);
  }

  // ================= SAVE =================
  saveAgence() {

    this.agenceService.uploadImages(this.uploadedFiles).subscribe({
      next: (res) => {

        this.agenceForm.images = res.images;

        if (!this.editMode) {

          // CREATE
          this.agenceService.createAgence(this.agenceForm).subscribe({
            next: () => {
              this.message = 'Agence et images enregistrées ✅';
              this.closeModal();
              this.loadAgences();
            }
          });

        } else {

          // UPDATE
          this.agenceService.updateAgence(this.agenceForm.idagence, this.agenceForm).subscribe({
            next: () => {

              this.voitures.forEach(v => {
                if (v.idvoiture) {
                  this.voitureService.updateVoiture(v.idvoiture, v).subscribe();
                } else {
                  v.agence = { idagence: this.agenceForm.idagence };
                  this.voitureService.createVoiture(v).subscribe();
                }
              });

              this.message = 'Agence modifiée avec images + voitures ✅';
              this.closeModal();
              this.loadAgences();
            }
          });
        }
      }
    });
  }

  // ================= RESET =================
  resetForm() {
    this.agenceForm = {
      idagence: null,
      nom: '',
      ville: '',
      telephone: '',
      nb_Voitures: 0,
      latitude: 0,
      longitude: 0,
      images: []
    };

    this.voitures = [];
    this.uploadedFiles = [];
  }

  // ================= IMAGE URL =================
  getImageUrl(img: string): string {
    return 'http://localhost:3000' + img;
  }
}