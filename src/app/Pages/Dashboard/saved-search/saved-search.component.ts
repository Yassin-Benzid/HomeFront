import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { FormsModule } from '@angular/forms';
import { ZoneService } from '../../../service/zone.service';

@Component({
  selector: 'app-saved-search',
  standalone: true,
  imports: [CommonModule, DashboardNavbarComponent, FormsModule],
  templateUrl: './saved-search.component.html'
})
export class SavedSearchComponent implements OnInit {

  zones: any[] = [];

  form: any = {};
  editingId: number | null = null;
  showModal = false;

  successMessage = '';
  errorMessage = '';

  role: string = '';

  // 🔥 NEW IMAGE VARIABLES
  selectedFile: File | null = null;
  imagePreview: string | null = null;

  constructor(private zoneService: ZoneService) {}

  ngOnInit() {
    this.role = (localStorage.getItem('role') || '')
      .toLowerCase()
      .replace('role_', '')
      .trim();

    this.loadZones();
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

  // ================= LOAD =================
  loadZones() {
    this.zoneService.getZones().subscribe({
      next: (data) => this.zones = data,
      error: () => this.showError('Erreur chargement des zones')
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

  // ================= IMAGE HANDLER (NEW) =================
  onFileSelected(event: any) {
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

    if (!this.form.nom || !this.form.ville || !this.form.description) {
      this.showError('Veuillez remplir tous les champs');
      return;
    }

    // 🔥 FORM DATA (important pour image upload)
    const formData = new FormData();
    formData.append('nom', this.form.nom);
    formData.append('ville', this.form.ville);
    formData.append('description', this.form.description);
    formData.append('latitude', this.form.latitude || 0);
    formData.append('longitude', this.form.longitude || 0);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // ================= UPDATE =================
    if (this.editingId) {
      this.zoneService.updateZone(this.editingId, formData).subscribe({
        next: () => {
          this.showSuccess('Zone modifiée avec succès');
          this.loadZones();
          this.closeModal();
        },
        error: () => this.showError('Erreur modification')
      });
    }

    // ================= CREATE =================
    else {
      this.zoneService.createZone(formData).subscribe({
        next: () => {
          this.showSuccess('Zone ajoutée avec succès');
          this.loadZones();
          this.closeModal();
        },
        error: () => this.showError('Erreur création')
      });
    }
  }

  // ================= DELETE =================
  deleteRecord(id: number) {
    if (confirm('Supprimer ?')) {
      this.zoneService.deleteZone(id).subscribe({
        next: () => {
          this.showSuccess('Zone supprimée avec succès');
          this.loadZones();
        },
        error: () => this.showError('Erreur suppression')
      });
    }
  }
}