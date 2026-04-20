import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { ZoneService } from '../../../service/zone.service';

@Component({
  selector: 'app-saved-search',
  standalone: true,
  imports: [CommonModule, FormsModule, DashboardNavbarComponent],
  template: `
  <app-dashboard-navbar [Title]="'Zones touristiques'"></app-dashboard-navbar>

  <div class="container mt-3">

    <!-- HEADER -->
    <div class="d-flex justify-content-between mb-3">
      <h3>Gestion des zones</h3>

      <button class="btn btn-primary" (click)="openModal()">
        + Ajouter zone
      </button>
    </div>

    <!-- MESSAGES -->
    <div *ngIf="successMessage" class="alert alert-success">
      {{ successMessage }}
    </div>

    <div *ngIf="errorMessage" class="alert alert-danger">
      {{ errorMessage }}
    </div>

    <!-- ================= LIST ================= -->
    <div class="row g-2 mb-3">
      <div class="col-md-4">
        <input
          type="text"
          class="form-control"
          placeholder="Rechercher une zone..."
          [(ngModel)]="searchTerm"
          (ngModelChange)="onFiltersChange()">
      </div>
      <div class="col-md-3">
        <input
          type="text"
          class="form-control"
          placeholder="Filtrer par ville..."
          [(ngModel)]="cityFilter"
          (ngModelChange)="onFiltersChange()">
      </div>
      <div class="col-md-2">
        <select class="form-select" [(ngModel)]="sortField" (change)="onFiltersChange()">
          <option value="nom">Tri: Nom</option>
          <option value="ville">Tri: Ville</option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-select" [(ngModel)]="sortOrder" (change)="onFiltersChange()">
          <option value="asc">Ordre: A-Z</option>
          <option value="desc">Ordre: Z-A</option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-select" [(ngModel)]="pageSize" (change)="onFiltersChange()">
          <option [ngValue]="6">6 / page</option>
          <option [ngValue]="9">9 / page</option>
          <option [ngValue]="12">12 / page</option>
        </select>
      </div>
    </div>

    <div class="row">

      <div class="col-md-4 mb-3" *ngFor="let z of displayedZones">

        <div class="card p-2">

          <!-- IMAGE -->
          <img *ngIf="z.image"
               [src]="getImageUrl(z.image)"
               class="img-fluid mb-2 rounded">

          <h5>{{ z.nom }}</h5>
          <p>{{ z.ville }}</p>

          <button class="btn btn-warning btn-sm"
                  (click)="openModal(z)">
            Modifier
          </button>

          <button class="btn btn-danger btn-sm mt-1"
                  (click)="deleteZone(z)">
            Supprimer
          </button>

        </div>

      </div>

    </div>

    <div class="d-flex justify-content-between align-items-center mt-2 mb-3">
      <small>Total: {{ totalItems }}</small>
      <div class="d-flex gap-1">
        <button class="btn btn-sm btn-outline-secondary" (click)="goToPage(currentPage - 1)">Prev</button>
        <button
          *ngFor="let page of pageNumbers"
          class="btn btn-sm"
          [class.btn-primary]="page === currentPage"
          [class.btn-outline-secondary]="page !== currentPage"
          (click)="goToPage(page)">
          {{ page }}
        </button>
        <button class="btn btn-sm btn-outline-secondary" (click)="goToPage(currentPage + 1)">Next</button>
      </div>
    </div>

  </div>

  <!-- ================= MODAL ================= -->
  <div class="modal d-block" *ngIf="showModal"
       style="background: rgba(0,0,0,0.5)">

    <div class="modal-dialog">
      <div class="modal-content p-3 bg-white card-box border-20">

        <h4>Informations zone</h4>

        <input [(ngModel)]="form.nom"
               placeholder="Nom"
               class="form-control mb-2">

        <input [(ngModel)]="form.ville"
               placeholder="Ville"
               class="form-control mb-2">

        <textarea [(ngModel)]="form.description"
                  placeholder="Description"
                  class="form-control mb-2"></textarea>

        <input type="number"
               [(ngModel)]="form.latitude"
               placeholder="Latitude"
               class="form-control mb-2">

        <input type="number"
               [(ngModel)]="form.longitude"
               placeholder="Longitude"
               class="form-control mb-2">

        <!-- IMAGE -->
        <input type="file" class="form-control mb-2"
               (change)="onFileChange($event)">

        <img *ngIf="imagePreview"
             [src]="imagePreview"
             class="img-fluid mb-2 rounded">

        <!-- ACTIONS -->
        <div class="d-flex justify-content-end gap-2 mt-3">

          <button class="btn btn-secondary"
                  (click)="closeModal()">
            Annuler
          </button>

          <button class="btn btn-success"
                  (click)="saveZone()">
            Enregistrer
          </button>

        </div>

      </div>
    </div>
  </div>

  <!-- ================= MODAL DELETE CONFIRMATION ================= -->
  <div class="modal d-block" *ngIf="showDeleteModal"
       style="background: rgba(0,0,0,0.5); z-index: 1060;">

    <div class="modal-dialog">
      <div class="modal-content p-3 bg-white card-box border-20">

        <h4 class="text-danger">Confirmation suppression</h4>

        <p>
          Voulez-vous vraiment supprimer la zone :
          <b>{{ itemToDelete?.nom }}</b> ?
        </p>

        <div class="d-flex justify-content-end gap-2 mt-3">

          <button class="btn btn-secondary"
                  (click)="cancelDelete()">
            Annuler
          </button>

          <button class="btn btn-danger"
                  (click)="confirmDelete()">
            Supprimer
          </button>

        </div>

      </div>
    </div>
  </div>
  `
})
export class SavedSearchComponent implements OnInit {

  zones: any[] = [];
  displayedZones: any[] = [];

  form: any = {};
  editingId: number | null = null;
  showModal = false;

  successMessage = '';
  errorMessage = '';

  showDeleteModal = false;
  itemToDelete: any = null;

  selectedFile: File | null = null;
  imagePreview: string | null = null;
  searchTerm = '';
  cityFilter = '';
  sortField = 'nom';
  sortOrder: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 6;
  totalItems = 0;

  constructor(private zoneService: ZoneService) {}

  ngOnInit() {
    this.loadZones();
  }

  // ================= LOAD =================
  loadZones() {
    this.zoneService.getAdvancedZones(this.getFilters()).subscribe({
      next: (data) => {
        this.zones = this.extractItems(data);
        this.totalItems = this.extractTotal(data, this.zones.length);
        this.applyClientPagination();
      },
      error: () => this.loadZonesFallback()
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
  deleteZone(zone: any) {
    this.itemToDelete = zone;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (!this.itemToDelete) return;
    const id = this.itemToDelete.idzone || this.itemToDelete.id;
    if (!id) {
      this.showError('Identifiant introuvable ❌');
      this.cancelDelete();
      return;
    }

    this.zoneService.deleteZone(id).subscribe({
      next: () => {
        this.showSuccess('Zone supprimée ✅');
        this.cancelDelete();
        this.loadZones();
      },
      error: () => this.showError('Erreur suppression ❌')
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.itemToDelete = null;
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

  onFiltersChange() {
    this.currentPage = 1;
    this.loadZones();
  }

  toggleSort(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.loadZones();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadZones();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private applyClientPagination() {
    if (!Array.isArray(this.zones)) {
      this.displayedZones = [];
      return;
    }

    if (this.zones.length > this.pageSize && this.totalItems === this.zones.length) {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.displayedZones = this.zones.slice(start, end);
      return;
    }

    this.displayedZones = this.zones;
  }

  private getFilters() {
    return {
      search: this.searchTerm,
      ville: this.cityFilter,
      sortBy: this.sortField,
      sortOrder: this.sortOrder,
      page: this.currentPage,
      limit: this.pageSize
    };
  }

  private extractItems(data: any): any[] {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data?.items)) return data.items;
    if (Array.isArray(data?.results)) return data.results;
    if (Array.isArray(data?.data)) return data.data;
    return [];
  }

  private extractTotal(data: any, fallback: number): number {
    return data?.total ?? data?.totalItems ?? data?.count ?? fallback;
  }

  private loadZonesFallback() {
    this.zoneService.getZones().subscribe({
      next: (data) => {
        this.zones = this.extractItems(data);
        this.totalItems = this.zones.length;
        this.applyClientPagination();
      },
      error: () => this.showError('Erreur chargement')
    });
  }
}