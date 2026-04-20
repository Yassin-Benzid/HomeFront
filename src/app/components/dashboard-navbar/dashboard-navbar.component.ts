import { Component, Input } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HotelService } from '../../service/hotel.service';
import { ZoneService } from '../../service/zone.service';
import { AgenceService } from '../../service/agence.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
    selector: 'app-dashboard-navbar',
    standalone: true,
    imports: [RouterModule, RouterLink, CommonModule, FormsModule],
    templateUrl: './dashboard-navbar.component.html'
})
export class DashboardNavbarComponent {

  @Input() Title: string | undefined;

  searchQuery = '';
  isSearching = false;
  showResults = false;
  results: Array<{ type: string; title: string; subtitle?: string; raw?: any }> = [];

  constructor(
    private hotelService: HotelService,
    private zoneService: ZoneService,
    private agenceService: AgenceService,
    private router: Router
  ) {}

  search() {
    const q = (this.searchQuery || '').toString().trim();
    if (!q) {
      this.results = [];
      this.showResults = false;
      return;
    }

    this.isSearching = true;
    this.showResults = true;

    forkJoin({
      hotels: this.hotelService.getAllHotels().pipe(catchError(() => of([]))),
      zones: this.zoneService.getZones().pipe(catchError(() => of([]))),
      agences: this.agenceService.getAllAgences().pipe(catchError(() => of([])))
    }).subscribe(({ hotels, zones, agences }: any) => {
      const ql = q.toLowerCase();

      const h = Array.isArray(hotels)
        ? hotels.filter((x: any) => (String(x.nom || x.name || '') + ' ' + String(x.ville || '')).toLowerCase().includes(ql))
        : [];

      const z = Array.isArray(zones)
        ? zones.filter((x: any) => (String(x.nom || x.name || '') + ' ' + String(x.description || '')).toLowerCase().includes(ql))
        : [];

      const a = Array.isArray(agences)
        ? agences.filter((x: any) => (String(x.nom || x.name || '') + ' ' + String(x.ville || '') + ' ' + String(x.telephone || '')).toLowerCase().includes(ql))
        : [];

      const mapped: Array<any> = [];

      h.slice(0, 6).forEach((it: any) => mapped.push({ type: 'hotel', title: it.nom || it.name || 'Hôtel', subtitle: it.ville || '', raw: it }));
      z.slice(0, 6).forEach((it: any) => mapped.push({ type: 'zone', title: it.nom || it.name || 'Zone', subtitle: it.description || '', raw: it }));
      a.slice(0, 6).forEach((it: any) => mapped.push({ type: 'agence', title: it.nom || it.name || 'Agence', subtitle: it.ville || it.telephone || '', raw: it }));

      this.results = mapped.slice(0, 10);
      this.isSearching = false;
    }, () => {
      this.results = [];
      this.isSearching = false;
    });
  }

  selectResult(r: any) {
    // Navigate to list pages with query param for context-aware listing
    if (r.type === 'hotel') {
      this.router.navigate(['/hotels'], { queryParams: { q: r.title } });
    } else if (r.type === 'zone') {
      this.router.navigate(['/zones-touristiques'], { queryParams: { q: r.title } });
    } else if (r.type === 'agence') {
      this.router.navigate(['/agences-voitures'], { queryParams: { q: r.title } });
    }

    this.showResults = false;
  }

  clear() {
    this.searchQuery = '';
    this.results = [];
    this.showResults = false;
  }
}
