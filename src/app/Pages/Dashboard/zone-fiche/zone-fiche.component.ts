import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { ZoneService } from '../../../service/zone.service';

@Component({
  selector: 'app-zone-fiche',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardNavbarComponent],
  templateUrl: './zone-fiche.component.html'
})
export class ZoneFicheComponent implements OnInit {

  zones: any[] = [];
  form: any = {};
  editingId: number | null = null;
  showModal = false;
  message = '';
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private zoneService: ZoneService) {}

  ngOnInit() {
    this.loadZones();
  }

  loadZones() {
    this.zoneService.getZones().subscribe({
      next: (data) => {
        this.zones = Array.isArray(data) ? data : [];
      },
      error: () => {
        this.message = 'Erreur chargement des zones';
      }
    });
  }

  openAddModal() {
    this.showModal = true;
    this.editingId = null;
    this.form = {};
    this.selectedFile = null;
    this.imagePreview = null;
    this.message = '';
  }

  openEditModal(zone: any) {
    this.showModal = true;
    this.editingId = zone.idzone || zone.id;
    this.form = { ...zone };
    this.imagePreview = zone.image || null;
    this.selectedFile = null;
    this.message = '';
  }

  closeModal() {
    this.showModal = false;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.selectedFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveZone() {
    if (!this.form.nom || !this.form.ville) {
      this.message = 'Nom et ville sont obligatoires ❌';
      return;
    }

    if (this.selectedFile) {
      this.zoneService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {
          this.form.image = res.image;
          this.saveData();
        },
        error: () => {
          this.message = 'Erreur upload image ❌';
        }
      });
    } else {
      this.saveData();
    }
  }

  saveData() {
    if (this.editingId) {
      this.zoneService.updateZone(this.editingId, this.form).subscribe({
        next: () => {
          this.message = 'Zone modifiée avec succès ✅';
          this.loadZones();
          this.closeModal();
        },
        error: () => {
          this.message = 'Erreur modification ❌';
        }
      });
    } else {
      this.zoneService.createZone(this.form).subscribe({
        next: () => {
          this.message = 'Zone ajoutée avec succès ✅';
          this.loadZones();
          this.closeModal();
        },
        error: () => {
          this.message = 'Erreur création ❌';
        }
      });
    }
  }

  getImageUrl(img: string): string {
    return 'http://localhost:3000' + img;
  }
}