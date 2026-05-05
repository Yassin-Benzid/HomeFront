import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { HotelService } from '../../../service/hotel.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule, RouterLink, FormsModule],
  templateUrl: './properties-list.component.html'
})
export class PropertiesListComponent implements OnInit {

  hotels: any[] = [];
  displayedHotels: any[] = [];
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
    private hotelService: HotelService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getAdvancedHotels(this.getFilters()).subscribe({
      next: (data) => {
        this.hotels = this.extractItems(data);
        this.normalizeHotelCounts(this.hotels);
        this.totalItems = this.extractTotal(data, this.hotels.length);
        this.applyClientPagination();
      },
      error: () => this.loadHotelsFallback()
    });
  }

  deleteHotel(hotel: any) {
    if (!this.isAdmin) return;
    this.itemToDelete = hotel;
    this.showDeleteModal = true;
  }

  confirmDelete() {
    if (!this.itemToDelete) return;
    const id = this.itemToDelete.idhotel || this.itemToDelete.id;
    if (!id) {
      this.errorMessage = 'Identifiant introuvable ❌';
      this.cancelDelete();
      return;
    }

    this.hotelService.deleteHotel(id).subscribe({
      next: () => {
        this.successMessage = 'Hôtel supprimé avec succès ✅';
        this.cancelDelete();
        this.loadHotels();
      },
      error: () => this.errorMessage = 'Erreur suppression hôtel ❌'
    });
  }

  cancelDelete() {
    this.showDeleteModal = false;
    this.itemToDelete = null;
  }

  onFiltersChange() {
    this.currentPage = 1;
    this.loadHotels();
  }

  toggleSort(field: string) {
    if (this.sortField === field) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortOrder = 'asc';
    }
    this.loadHotels();
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.loadHotels();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalItems / this.pageSize));
  }

  get isAdmin(): boolean {
    return this.authService.getRole() === 'admin';
  }

  get isHotelManager(): boolean {
    return this.authService.getRole() === 'hotel-manager';
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  private applyClientPagination() {
    if (!Array.isArray(this.hotels)) {
      this.displayedHotels = [];
      return;
    }

    // Fallback when backend returns full list without pagination.
    if (this.hotels.length > this.pageSize && this.totalItems === this.hotels.length) {
      const start = (this.currentPage - 1) * this.pageSize;
      const end = start + this.pageSize;
      this.displayedHotels = this.hotels.slice(start, end);
      return;
    }

    this.displayedHotels = this.hotels;
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

  private normalizeHotelCounts(items: any[]) {
    if (!Array.isArray(items)) return;
    items.forEach((h: any) => {
      const raw = h?.nb_Chambres ?? h?.nb_chambres ?? h?.['nb-chambres'];
      let n = 0;
      if (raw == null) {
        n = 0;
      } else if (typeof raw === 'number') {
        n = raw;
      } else if (typeof raw === 'string') {
        const parsed = parseInt(raw.replace(/[^0-9-]/g, ''), 10);
        n = isNaN(parsed) ? 0 : parsed;
      } else {
        n = 0;
      }
      h.nb_Chambres = n;
      h.nb_chambres = n;
      h['nb-chambres'] = n;
    });
  }

  private loadHotelsFallback() {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = this.extractItems(data);
        this.normalizeHotelCounts(this.hotels);
        this.totalItems = this.hotels.length;
        this.applyClientPagination();
      },
      error: () => this.errorMessage = 'Erreur chargement hôtels'
    });
  }
}