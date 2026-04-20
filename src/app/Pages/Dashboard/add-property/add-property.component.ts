import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

import { HotelService } from '../../../service/hotel.service';
import {
  ChambreService,
  CreateChambreDto,
  UpdateChambreDto
} from '../../../service/chambre.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-property',
  standalone: true,
  imports: [DashboardNavbarComponent, FormsModule, CommonModule],
  templateUrl: './add-property.component.html'
})
export class AddPropertyComponent implements OnInit {

  constructor(
    private hotelService: HotelService,
    private chambreService: ChambreService
  ) {}

  // ================= DATA =================
  hotels: any[] = [];

  hotelForm: any = {
    idhotel: null,
    nom: '',
    ville: '',
    nb_Etoiles: 1,
    nb_Chambres: 0,
    telephone: '',
    latitude: 0,
    longitude: 0,
    images: []
  };

  chambres: any[] = [];
  message = '';

  // ================= MODAL =================
  showModal = false;
  editMode = false;

  uploadedFiles: File[] = [];

  ngOnInit() {
    this.loadHotels();
  }

  // ================= LOAD =================
  loadHotels() {
    this.hotelService.getAllHotels().subscribe(res => {
      this.hotels = Array.isArray(res) ? res : [];
      this.normalizeHotelsList(this.hotels);
    });
  }

  openAddModal() {
    this.resetForm();
    this.editMode = false;
    this.showModal = true;
  }

  openEditModal(hotel: any) {
    this.editMode = true;
    this.showModal = true;

    this.hotelForm = { ...hotel };
    this.normalizeHotelCounts();

    this.loadChambresForHotel(hotel.idhotel, rows => {
      this.chambres = rows;
    });
  }

  closeModal() {
    this.showModal = false;
  }

  private loadChambresForHotel(idhotel: number, next: (rows: any[]) => void) {
    this.chambreService.getAllChambres().subscribe({
      next: res => {
        const rows = Array.isArray(res)
          ? res.filter((c: any) => c.hotel?.idhotel === idhotel)
          : [];
        next(rows);
      },
      error: () => next([])
    });
  }

  // ================= CHAMBRES (modal édition hôtel) =================
  addChambre() {
    this.chambres.push({
      numero: '',
      capacite: 1,
      etat: 'disponible',
      prix_Nuit: 0
    });
    this.hotelForm.nb_Chambres = Number(this.hotelForm.nb_Chambres ?? 0) + 1;
  }

  removeChambre(i: number) {
    this.chambres.splice(i, 1);
    this.hotelForm.nb_Chambres = Math.max(0, Number(this.hotelForm.nb_Chambres ?? 0) - 1);
  }

  // ================= FILES =================
  onFileChange(event: any) {
    const files = event.target.files;
    if (!files) return;
    this.uploadedFiles = Array.from(files);
  }

  // ================= SAVE =================
  saveHotel() {
    if (!this.hotelForm.nom || !this.hotelForm.ville) {
      this.message = 'Nom et ville sont obligatoires ❌';
      return;
    }

    if (this.uploadedFiles.length > 0) {
      this.hotelService.uploadImages(this.uploadedFiles).subscribe({
        next: (res) => {
          this.hotelForm.images = res.images || [];
          this.saveHotelData();
        },
        error: () => {
          this.message = "Erreur lors de l'upload des images ❌";
        }
      });
      return;
    }

    this.hotelForm.images = this.hotelForm.images || [];
    this.saveHotelData();
  }

  private saveHotelData() {
    this.normalizeHotelCounts();
    const payload = this.buildHotelPayload();

    if (!this.editMode) {
      this.hotelService.createHotel(payload).subscribe({
        next: () => {
          this.message = 'Hôtel enregistré ✅';
          this.closeModal();
          this.loadHotels();
        },
        error: (err) => {
          this.message = this.httpErrorMessage(err, "Erreur lors de l'ajout de l'hôtel ❌");
        }
      });
      return;
    }

    this.hotelService.updateHotel(this.hotelForm.idhotel, payload).subscribe({
      next: () => {
        this.persistChambresAfterHotelUpdate();
      },
      error: (err) => {
        this.message = this.httpErrorMessage(err, 'Erreur lors de la modification de hôtel ❌');
      }
    });
  }

  private persistChambresAfterHotelUpdate() {
    const idHotel = this.hotelForm.idhotel;
    const requests = this.chambres.map(c => {
      if (c.idchambre) {
        const dto = this.buildUpdateChambreDto(c);
        return this.chambreService.updateChambre(c.idchambre, dto).pipe(
          catchError(() => of({ __saveError: true }))
        );
      }
      const dto = this.buildCreateChambreDto(c, idHotel);
      return this.chambreService.createChambre(dto).pipe(
        catchError(() => of({ __saveError: true }))
      );
    });

    if (requests.length === 0) {
      this.finishHotelEditSuccess();
      return;
    }

    forkJoin(requests).subscribe(results => {
      if (results.some((r: any) => r && r.__saveError)) {
        this.message = "Erreur lors de l'enregistrement des chambres ❌";
        return;
      }
      this.finishHotelEditSuccess();
    });
  }

  private finishHotelEditSuccess() {
    this.message = 'Hôtel modifié avec images + chambres ✅';
    this.closeModal();
    this.loadHotels();
  }

  // ================= RESET =================
  resetForm() {
    this.hotelForm = {
      idhotel: null,
      nom: '',
      ville: '',
      nb_Etoiles: 1,
      nb_Chambres: 0,
      telephone: '',
      latitude: 0,
      longitude: 0,
      images: []
    };
    this.chambres = [];
    this.uploadedFiles = [];
  }

  // ================= IMAGE URL (FIXED) =================
  getImageUrl(img: string): string {
    return 'http://localhost:3000' + img;
  }

  private normalizeHotelCounts() {
    const rawCount =
      this.hotelForm.nb_Chambres ??
      this.hotelForm.nb_chambres ??
      this.hotelForm['nb-chambres'];
    this.hotelForm.nb_Chambres = Number(rawCount ?? 0);
  }

  private normalizeHotelsList(items: any[]) {
    if (!Array.isArray(items)) return;
    items.forEach((h: any) => {
      const raw = h?.nb_Chambres ?? h?.nb_chambres ?? h?.['nb-chambres'];
      let n = 0;
      if (raw == null) {
        n = 0;
      } else if (typeof raw === 'number') {
        n = raw;
      } else if (typeof raw === 'string') {
        const parsed = parseInt(raw.replace(/[^0-9-]/g, ''), 10);
        n = isNaN(parsed) ? 0 : parsed;
      } else {
        n = 0;
      }
      h.nb_Chambres = n;
      h.nb_chambres = n;
      h['nb-chambres'] = n;
    });
  }

  private buildHotelPayload() {
    const n = Number(this.hotelForm.nb_Chambres ?? 0);
    return {
      nom: this.hotelForm.nom,
      ville: this.hotelForm.ville,
      nb_Etoiles: Number(this.hotelForm.nb_Etoiles ?? 0),
      nb_chambres: n,
      nb_Chambres: n,
      'nb-chambres': n,
      telephone: this.hotelForm.telephone ?? '',
      latitude: Number(this.hotelForm.latitude ?? 0),
      longitude: Number(this.hotelForm.longitude ?? 0),
      images: Array.isArray(this.hotelForm.images)
        ? this.hotelForm.images
            .map((i: any) => (typeof i === 'string' ? i : (i?.path ?? i?.url ?? i?.filename ?? i?.name ?? '')))
            .filter((s: string) => !!s)
        : []
    };
  }

  private buildCreateChambreDto(chambre: any, hotelId: number): CreateChambreDto {
    const numero = this.parseNumeroChambre(chambre.numero);
    return {
      numero,
      capacite: Math.max(1, Number(chambre.capacite ?? 1)),
      etat: String(chambre.etat ?? 'disponible').trim(),
      prix_Nuit: Math.max(0, Number(chambre.prix_Nuit ?? 0)),
      hotelId
    };
  }

  private buildUpdateChambreDto(chambre: any): UpdateChambreDto {
    const numero = this.parseNumeroChambre(chambre.numero);
    return {
      numero,
      capacite: Math.max(1, Number(chambre.capacite ?? 1)),
      etat: String(chambre.etat ?? 'disponible').trim(),
      prix_Nuit: Math.max(0, Number(chambre.prix_Nuit ?? 0))
    };
  }

  private parseNumeroChambre(value: any): number {
    const n = typeof value === 'string' ? parseInt(value.replace(/\s/g, ''), 10) : Number(value);
    return Number.isFinite(n) ? n : 0;
  }

  private httpErrorMessage(err: any, fallback: string): string {
    const msg = err?.error?.message ?? err?.error?.error ?? err?.message;
    if (typeof msg === 'string' && msg.trim()) {
      return msg;
    }
    return fallback;
  }
}