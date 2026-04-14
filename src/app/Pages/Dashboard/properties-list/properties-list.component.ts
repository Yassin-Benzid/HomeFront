import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { HotelService } from '../../../service/hotel.service';

@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule, RouterLink],
  templateUrl: './properties-list.component.html'
})
export class PropertiesListComponent implements OnInit {

  hotels: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private hotelService: HotelService) {}

  ngOnInit() {
    this.loadHotels();
  }

  loadHotels() {
    this.hotelService.getAllHotels().subscribe({
      next: (data) => {
        this.hotels = data;
      },
      error: () => this.errorMessage = 'Erreur chargement hôtels'
    });
  }

  deleteHotel(id: number) {
    if (confirm('Supprimer cet hôtel ?')) {
      this.hotelService.deleteHotel(id).subscribe({
        next: () => {
          this.successMessage = 'Hôtel supprimé avec succès';
          this.loadHotels();
        },
        error: () => this.errorMessage = 'Erreur suppression hôtel'
      });
    }
  }
}