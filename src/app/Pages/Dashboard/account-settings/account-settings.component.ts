import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-account-settings',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent {
  // NOTE: ancien écran "account-settings" reconverti en gestion des agences de location.
  agencies = [
    { name: 'CarGo Tunisia', city: 'Tunis', manager: 'Olfa Jebali', fleet: 38, available: 22, status: 'Actif' },
    { name: 'Djerba Mobility', city: 'Djerba', manager: 'Hichem Dridi', fleet: 17, available: 8, status: 'Actif' },
    { name: 'Sahel Rent', city: 'Sousse', manager: 'Ahmed Khelifi', fleet: 24, available: 0, status: 'Complet' }
  ];
}
