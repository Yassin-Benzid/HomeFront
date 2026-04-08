import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-membership',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './membership.component.html'
})
export class MembershipComponent {
  // NOTE: ancien écran "membership" reconverti en gestion des utilisateurs.
  roleCards = [
    { label: 'Admins', value: 3 },
    { label: 'Clients', value: 186 },
    { label: 'Managers hôtels', value: 22 },
    { label: 'Managers agences', value: 11 }
  ];

  users = [
    { fullName: 'Amel Ben Youssef', role: 'Admin', email: 'amel.admin@tourismhub.tn', status: 'Actif', lastAccess: 'Aujourd’hui 08:15' },
    { fullName: 'Karim Trabelsi', role: 'Client', email: 'karim.client@gmail.com', status: 'Actif', lastAccess: 'Aujourd’hui 09:40' },
    { fullName: 'Sami Gharbi', role: 'Manager hôtel', email: 'manager.riviera@hotel.tn', status: 'À valider', lastAccess: 'Hier 17:10' },
    { fullName: 'Olfa Jebali', role: 'Manager agence', email: 'olfa.fleet@rentcar.tn', status: 'Suspendu', lastAccess: '05/04/2026' },
    { fullName: 'Nour Bouslama', role: 'Client', email: 'nour.bouslama@gmail.com', status: 'Actif', lastAccess: '03/04/2026' }
  ];
}
