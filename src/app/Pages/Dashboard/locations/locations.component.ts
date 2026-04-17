import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

interface LocationVoitureItem {
  ref: string;
  agence: string;
  client: string;
  vehicule: string;
  period: string;
  amount: string;
  status: string;
}

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './locations.component.html'
})
export class LocationsComponent {
  locations: LocationVoitureItem[] = [
    {
      ref: 'LV-1042',
      agence: 'CarGo Tunis',
      client: 'Yasmine Trabelsi',
      vehicule: 'SUV automatique - catégorie premium',
      period: '05/05/2026 - 12/05/2026',
      amount: '455 EUR',
      status: 'Confirmée'
    },
    {
      ref: 'LV-1043',
      agence: 'Djerba Wheels',
      client: 'Karim Baccar',
      vehicule: 'Citadine économique',
      period: '10/05/2026 - 14/05/2026',
      amount: '180 EUR',
      status: 'En attente'
    },
    {
      ref: 'LV-1044',
      agence: 'CarGo Tunis',
      client: 'Rania Ben Amor',
      vehicule: 'Berline diesel',
      period: '18/05/2026 - 22/05/2026',
      amount: '220 EUR',
      status: 'Confirmée'
    },
    {
      ref: 'LV-1045',
      agence: 'Sfax Auto Rent',
      client: 'Nader Ghannouchi',
      vehicule: 'Break familial',
      period: '01/06/2026 - 08/06/2026',
      amount: '310 EUR',
      status: 'Annulée'
    }
  ];

  selectedLocation: LocationVoitureItem = this.locations[0];

  selectLocation(loc: LocationVoitureItem): void {
    this.selectedLocation = loc;
  }
}
