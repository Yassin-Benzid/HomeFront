import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { AgenceService } from '../../../service/agence.service';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent implements OnInit {

  agences: any[] = [];
  displayedAgences: any[] = [];

  successMessage = '';
  errorMessage = '';

  showDeleteModal = false;
  itemToDelete: any = null;

  nameFilter = '';
  cityFilter = '';
  sortField = 'nom';
  sortOrder: 'asc' | 'desc' = 'asc';
  currentPage = 1;
  pageSize = 5;
  totalItems = 0;

  constructor(
    private agenceService: AgenceService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadAgences();
  }

  loadAgences() {
    this.agenceService.getAdvancedAgences(this.getFilters()).subscribe({
      next: (data) => {
        this.agences = this.extractItems(data);
        this.totalItems = this.extractTotal(data, this.agences.length);
        this.applyClientPagination();
      },
      error: () => this.loadAgencesFallback()
    });
  }

  deleteAgence(agence: any) {
    if (!this.isAdmin) return;
    this.itemToDelete = agence;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (!this.itemToDelete) return;
    const id = this.itemToDelete.idagence || this.itemToDelete.id;
    if (!id) {
      this.errorMessage = 'Identifiant introuvable ❌';
      this.cancelDelete();
      return;
    }

    this.agenceService.deleteAgence(id).subscribe({
      next: () => {
        this.successMessage = 'Agence supprimée avec succès ✅';
        this.cancelDelete();
        this.loadAgences();
      },
      error: () => this.errorMessage = 'Erreur suppression agence ❌'
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.itemToDelete = null;
  }

  onFiltersChange() {
    this.currentPage = 1;
    this.loadAgences();
  }

  toggleSort(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.loadAgences();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadAgences();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }

  get isAgencyManager(): boolean {
    return this.authService.getRole() === 'agence-manager';
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private applyClientPagination() {
    if (!Array.isArray(this.agences)) {
      this.displayedAgences = [];
      return;
    }

    if (this.agences.length > this.pageSize && this.totalItems === this.agences.length) {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.displayedAgences = this.agences.slice(start, end);
      return;
    }

    this.displayedAgences = this.agences;
  }

  private getFilters() {
    return {
      search: this.nameFilter,
      nom: this.nameFilter,
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

  private loadAgencesFallback() {
    this.agenceService.getAllAgences().subscribe({
      next: (data) => {
        this.agences = this.extractItems(data);
        this.totalItems = this.agences.length;
        this.applyClientPagination();
      },
      error: () => this.errorMessage = 'Erreur chargement agences'
    });
  }
}