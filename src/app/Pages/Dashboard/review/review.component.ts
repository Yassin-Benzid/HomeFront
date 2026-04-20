import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { AvisService, Avis } from '../../../service/avis.service';

@Component({
  selector: 'app-review',
  standalone: true,
  imports: [DashboardNavbarComponent, CommonModule],
  templateUrl: './review.component.html'
})
export class ReviewComponent implements OnInit {

  reviews: any[] = [];
  selectedType: string = '';
  average: number = 0;

  // ===== POPUPS =====
  showDeletePopup: boolean = false;
  showAveragePopup: boolean = false;

  selectedAvisId: number = 0;
  selectedTargetId: number = 0;

  constructor(private avisService: AvisService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  // ================= LOAD ALL =================
  loadAll(): void {
    this.avisService.getPublicAvis().subscribe({
      next: (data: Avis[]) => this.mapData(data),
      error: (err) => console.error(err)
    });
  }

  // ================= MAP DATA =================
  mapData(data: Avis[]): void {
    this.reviews = data.map(a => {
      let author = 'Client';

      if (a.client) {
        author = (a.client.prenom || '') + ' ' + (a.client.nom || '');
      }

      return {
        id: a.idavis,
        type: a.type,
        targetId: a.targetId,
        author: author,
        target: a.type + ' #' + a.targetId,
        rating: a.note + '/5',
        comment: a.commentaire,
        date: new Date(a.date_Avis).toLocaleDateString('fr-FR')
      };
    });
  }

  // ================= FILTER BY TYPE =================
  filterByType(type: string): void {
    this.selectedType = type;

    this.avisService.getByType(type).subscribe({
      next: (data) => this.mapData(data),
      error: (err) => console.error(err)
    });
  }


  // ================= OPEN AVERAGE POPUP =================
  openAveragePopup(type: string, id: number): void {
    this.selectedType = type;
    this.selectedTargetId = id;

    this.avisService.getAverage(type, id).subscribe({
      next: (avg) => {
        this.average = avg;
        this.showAveragePopup = true;
      },
      error: (err) => console.error(err)
    });
  }

  closeAveragePopup(): void {
    this.showAveragePopup = false;
  }

  // ================= OPEN DELETE POPUP =================
  openDeletePopup(id: number): void {
    this.selectedAvisId = id;
    this.showDeletePopup = true;
  }

  confirmDelete(): void {
    this.avisService.deleteAvis(this.selectedAvisId).subscribe({
      next: () => {
        this.reviews = this.reviews.filter(r => r.id !== this.selectedAvisId);
        this.showDeletePopup = false;
      },
      error: (err) => console.error(err)
    });
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
  }
}