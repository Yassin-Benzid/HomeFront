import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { ZoneService } from '../../../service/zone.service';

@Component({
  selector: 'app-saved-search',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardNavbarComponent],
  templateUrl: './saved-search.component.html'
})
export class SavedSearchComponent implements OnInit {

  zones: any[] = [];

  form: any = {};
  editingId: number | null = null;
  showModal = false;

  successMessage = '';
  errorMessage = '';

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private zoneService: ZoneService) {}

  ngOnInit() {
    this.loadZones();
  }

  // ================= LOAD =================
  loadZones() {
    this.zoneService.getZones().subscribe({
      next: (data) => this.zones = data,
      error: () => this.showError('Erreur chargement')
    });
  }

  // ================= MODAL =================
  openModal(zone: any = null) {

    this.showModal = true;
    this.clearMessages();

    this.selectedFile = null;
    this.imagePreview = null;

    if (zone) {
      this.form = { ...zone };
      this.editingId = zone.idzone;
      this.imagePreview = zone.image || null;
    } else {
      this.form = {};
      this.editingId = null;
    }
  }

  closeModal() {
    this.showModal = false;
  }

  // ================= IMAGE =================
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

  // ================= SAVE =================
  saveZone() {

    if (!this.form.nom || !this.form.ville) {
      this.showError('Champs obligatoires ❌');
      return;
    }

    // 🔥 Upload image first
    if (this.selectedFile) {

      this.zoneService.uploadImage(this.selectedFile).subscribe({
        next: (res) => {

          this.form.image = res.image;

          this.saveData();
        },
        error: () => this.showError('Erreur upload image')
      });

    } else {
      this.saveData();
    }
  }

  // ================= SAVE DATA =================
  saveData() {

    if (this.editingId) {

      this.zoneService.updateZone(this.editingId, this.form).subscribe({
        next: () => {
          this.showSuccess('Zone modifiée ✅');
          this.loadZones();
          this.closeModal();
        },
        error: () => this.showError('Erreur modification ❌')
      });

    } else {

      this.zoneService.createZone(this.form).subscribe({
        next: () => {
          this.showSuccess('Zone ajoutée ✅');
          this.loadZones();
          this.closeModal();
        },
        error: () => this.showError('Erreur création ❌')
      });

    }
  }

  // ================= DELETE =================
  deleteZone(id: number) {

    if (!confirm('Supprimer ?')) return;

    this.zoneService.deleteZone(id).subscribe({
      next: () => {
        this.showSuccess('Supprimé ✅');
        this.loadZones();
      },
      error: () => this.showError('Erreur suppression ❌')
    });
  }

  // ================= IMAGE URL =================
  getImageUrl(img: string): string {
    return 'http://localhost:3000' + img;
  }

  // ================= MESSAGES =================
  showSuccess(msg: string) {
    this.successMessage = msg;
    this.errorMessage = '';
  }

  showError(msg: string) {
    this.errorMessage = msg;
    this.successMessage = '';
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}