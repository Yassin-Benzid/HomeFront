import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { EspaceClientService } from '../../../service/espace-client.service';
import { filter } from 'rxjs';

type TabKey = 'reservations' | 'locations' | 'factures' | 'avis' | 'favoris';

@Component({
  selector: 'app-espace-client',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './espace-client.component.html',
})
export class EspaceClientComponent implements OnInit {

  activeTab: TabKey = 'reservations';

  profile: any = null;
  reservations: any[] = [];
  locations: any[] = [];
  factures: any[] = [];
  avis: any[] = [];
  favoris: any[] = [];

  loading = false;
  error: string | null = null;

  tabs: { key: TabKey; label: string; icon: string }[] = [
    { key: 'reservations', label: 'Réservations', icon: 'bi-calendar-check' },
    { key: 'locations',    label: 'Locations',    icon: 'bi-house-door'    },
    { key: 'factures',     label: 'Factures',     icon: 'bi-receipt'       },
    { key: 'avis',         label: 'Mes Avis',     icon: 'bi-star-half'     },
    { key: 'favoris',      label: 'Favoris',      icon: 'bi-heart'         },
  ];

  constructor(
    private espaceClientService: EspaceClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    
    // Détecter la route active et sélectionner l'onglet correspondant
    this.setActiveTabFromRoute(this.router.url);
    
    // Écouter les changements de route
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.setActiveTabFromRoute(event.urlAfterRedirects);
      });
  }

  private setActiveTabFromRoute(url: string): void {
    const routeTabMap: Record<string, TabKey> = {
      '/mes-reservations': 'reservations',
      '/mes-locations': 'locations',
      '/mes-factures': 'factures',
      '/mes-avis': 'avis',
      '/mes-favoris': 'favoris',
      '/espace-client': 'reservations',
      '/mon-espace': 'reservations',
      '/mon-compte': 'reservations'
    };

    const matchedTab = routeTabMap[url];
    if (matchedTab) {
      this.selectTab(matchedTab);
    }
  }

  loadProfile(): void {
    this.espaceClientService.getProfile().subscribe({
      next: (data) => (this.profile = data),
      error: () => (this.error = 'Impossible de charger le profil.'),
    });
  }

  selectTab(tab: TabKey): void {
    this.activeTab = tab;
    this.loadTab(tab);
  }

  loadTab(tab: TabKey): void {
    this.loading = true;
    this.error = null;

    const loaders: Record<TabKey, () => void> = {
      reservations: () =>
        this.espaceClientService.getReservations().subscribe({
          next: (d) => { this.reservations = d; this.loading = false; },
          error: () => { this.error = 'Erreur chargement réservations.'; this.loading = false; },
        }),
      locations: () =>
        this.espaceClientService.getLocations().subscribe({
          next: (d) => { this.locations = d; this.loading = false; },
          error: () => { this.error = 'Erreur chargement locations.'; this.loading = false; },
        }),
      factures: () =>
        this.espaceClientService.getFactures().subscribe({
          next: (d) => { this.factures = d; this.loading = false; },
          error: () => { this.error = 'Erreur chargement factures.'; this.loading = false; },
        }),
      avis: () =>
        this.espaceClientService.getAvis().subscribe({
          next: (d) => { this.avis = d; this.loading = false; },
          error: () => { this.error = 'Erreur chargement avis.'; this.loading = false; },
        }),
      favoris: () =>
        this.espaceClientService.getFavoris().subscribe({
          next: (d) => { this.favoris = d; this.loading = false; },
          error: () => { this.error = 'Erreur chargement favoris.'; this.loading = false; },
        }),
    };

    loaders[tab]();
  }

  getStars(note: number): string[] {
    return Array.from({ length: 5 }, (_, i) => i < note ? 'bi-star-fill' : 'bi-star');
  }

  getStatusClass(status: string): string {
    const map: Record<string, string> = {
      confirmée: 'bg-success',
      annulée:   'bg-danger',
      en_attente:'bg-warning text-dark',
      payée:     'bg-success',
      impayée:   'bg-danger',
      active:    'bg-primary',
      terminée:  'bg-secondary',
    };
    return map[status?.toLowerCase()] ?? 'bg-secondary';
  }
}