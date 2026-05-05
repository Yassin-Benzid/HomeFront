import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { FavorisService, Favoris, FavorisType } from '../../../service/favoris.service';

@Component({
  selector: 'app-favourites',
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './favourites.component.html'
})
export class FavouritesComponent implements OnInit {

  // Rendre l'enum disponible dans le template Angular
  FavorisType = FavorisType;

  favoris: Favoris[] = [];
  loading = true;
  error: string | null = null;

  // Mapping pour affichage utilisateur (typage correct)
  typeLabels: Record<FavorisType, string> = {
    [FavorisType.HOTEL]: '🏨 Hôtel',
    [FavorisType.AGENCE]: '🏢 Agence',
    [FavorisType.ZONE]: '📍 Zone géographique'
  };

  constructor(private favorisService: FavorisService) {}

  ngOnInit(): void {
    this.loadFavoris();
  }

  /**
   * Charger la liste des favoris depuis l'API Backend
   */
  loadFavoris(): void {
    this.loading = true;
    this.error = null;

    this.favorisService.getFavoris().subscribe({
      next: (data) => {
        this.favoris = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Impossible de charger vos favoris';
        this.loading = false;
        console.error('Erreur chargement favoris:', err);
      }
    });
  }

  /**
   * Supprimer un favori
   */
  supprimerFavori(type: FavorisType, targetId: number): void {
    this.favorisService.removeFavori(type, targetId).subscribe({
      next: () => {
        // Supprimer localement de la liste sans recharger
        this.favoris = this.favoris.filter(f => !(f.type === type && f.targetId === targetId));
      },
      error: (err) => {
        console.error('Erreur suppression favori:', err);
      }
    });
  }

  /**
   * Obtenir le nombre total de favoris
   */
  get totalFavoris(): number {
    return this.favoris.length;
  }

  /**
   * Grouper les favoris par type
   */
  getFavorisByType(type: FavorisType): Favoris[] {
    return this.favoris.filter(f => f.type === type);
  }
}