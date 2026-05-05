import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { LocationService, Location } from '../../../service/location.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './locations.component.html'
})
export class LocationsComponent implements OnInit {

  locations: Location[] = [];
  selectedLocation?: Location;

  constructor(
    private locationService: LocationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.locationService.findAll().subscribe({
      next: (data) => {
        this.locations = data;
        if (this.locations.length > 0) {
          this.selectedLocation = this.locations[0];
        }
      },
      error: (err) => {
        console.error('Erreur lors du chargement des locations:', err);
      }
    });
  }

  selectLocation(loc: Location): void {
    this.selectedLocation = loc;
  }

  confirmerLocation(): void {
    if (this.selectedLocation && this.selectedLocation.client) {
      this.locationService.confirmerLocation(
        this.selectedLocation.idlocation,
        this.selectedLocation.client.iduser
      ).subscribe({
        next: () => {
          this.loadLocations();
        },
        error: (err) => {
          console.error('Erreur lors de la confirmation:', err);
        }
      });
    }
  }

  annulerLocation(): void {
    if (this.selectedLocation && this.selectedLocation.client) {
      this.locationService.annulerLocation(
        this.selectedLocation.idlocation,
        this.selectedLocation.client.iduser
      ).subscribe({
        next: () => {
          this.loadLocations();
        },
        error: (err) => {
          console.error('Erreur lors de l\'annulation:', err);
        }
      });
    }
  }

  canConfirm(): boolean {
    const isAdmin = this.authService.getRole() === 'admin';
    return !isAdmin && this.selectedLocation?.statut === 'en attente';
  }

  canCancel(): boolean {
    const isAdmin = this.authService.getRole() === 'admin';
    return !isAdmin && (this.selectedLocation?.statut === 'en attente' || this.selectedLocation?.statut === 'confirmée');
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR');
  }
}