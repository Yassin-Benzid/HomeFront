import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-account-settings-pass-change',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './account-settings-pass-change.component.html'
})
export class AccountSettingsPassChangeComponent {
  // NOTE: ancien écran "change password" reconverti en facturation.
  summaries = [
    { label: 'Factures payées', value: '128' },
    { label: 'En attente', value: '14' },
    { label: 'Montant du mois', value: '18 450 EUR' }
  ];

  invoices = [
    { ref: 'FAC-992', reservation: 'RS-3021', client: 'Yasmine Trabelsi', amount: '435 EUR', method: 'Carte', status: 'Payée' },
    { ref: 'FAC-993', reservation: 'RS-3022', client: 'Karim Baccar', amount: '288 EUR', method: 'Virement', status: 'En attente' },
    { ref: 'FAC-994', reservation: 'RS-3023', client: 'Rania Ben Amor', amount: '520 EUR', method: 'Carte', status: 'Payée' }
  ];
}
