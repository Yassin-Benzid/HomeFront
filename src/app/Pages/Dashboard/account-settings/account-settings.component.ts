import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { AgenceService } from '../../../service/agence.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule, RouterLink],
  templateUrl: './account-settings.component.html'
})
export class AccountSettingsComponent implements OnInit {

  agences: any[] = [];

  successMessage = '';
  errorMessage = '';

  constructor(private agenceService: AgenceService) {}

  ngOnInit(): void {
    this.loadAgences();
  }

  loadAgences() {
    this.agenceService.getAllAgences().subscribe({
      next: (data) => this.agences = data,
      error: () => this.errorMessage = 'Erreur chargement agences'
    });
  }

  deleteAgence(id: number) {
    if (confirm('Supprimer cette agence ?')) {
      this.agenceService.deleteAgence(id).subscribe({
        next: () => {
          this.successMessage = 'Agence supprimée avec succès';
          this.loadAgences();
        },
        error: () => this.errorMessage = 'Erreur suppression agence'
      });
    }
  }
}