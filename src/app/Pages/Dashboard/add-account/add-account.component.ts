import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';

import { AgenceService } from '../../../service/agence.service';
import {
  VoitureService
} from '../../../service/voiture.service';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-account',
  standalone: true,
  imports: [DashboardNavbarComponent, FormsModule, CommonModule],
  templateUrl: './add-account.component.html'
})
export class AddAccountComponent implements OnInit {

  constructor(
    private agenceService: AgenceService,
    private voitureService: VoitureService,
    private http: HttpClient
  ) {}

  // ================= DATA =================
  agences: any[] = [];
  agenceManagers: any[] = [];

  agenceForm: any = {
    idagence: null,
    nom: '',
    ville: '',
    telephone: '',
    nb_Voitures: 0,
    agenceManagerId: null,
    latitude: 0,
    longitude: 0,
    images: []
  };

  voitures: any[] = [];

  message = '';

  // ================= MODAL =================
  showModal = false;
  editMode = false;

  uploadedFiles: File[] = [];

  // ================= LOAD =================
  ngOnInit() {
    this.loadAgences();
    this.loadAgenceManagers();
  }

  loadAgences() {
    this.agenceService.getAllAgences().subscribe(res => {
      this.agences = res;
    });
  }

  loadAgenceManagers() {
    // Charger tous les utilisateurs avec role agence-manager
    this.http.get('http://localhost:3000/users?role=agence-manager').subscribe({
      next: (res: any) => {
        this.agenceManagers = Array.isArray(res) ? res : [];
      },
      error: () => {
        this.agenceManagers = [];
      }
    });
  }

  openAddModal() {
    this.resetForm();
    this.editMode = false;
    this.showModal = true;
  }

  openEditModal(agence: any) {
    this.editMode = true;
    this.showModal = true;

    this.agenceForm = { ...agence };
    this.normalizeAgenceCounts();

    this.loadVoituresForAgence(agence.idagence, list => {
      this.voitures = list;
    });
  }

  closeModal() {
    this.showModal = false;
  }

  private loadVoituresForAgence(idagence: number, next: (rows: any[]) => void) {
    this.voitureService.getAllVoitures().subscribe({
      next: res => {
        const rows = Array.isArray(res)
          ? res.filter((v: any) => v.agence?.idagence === idagence)
          : [];
        next(rows);
      },
      error: () => next([])
    });
  }

  // ================= VOITURES (modal édition agence) =================
  addVoiture() {
    this.voitures.push({
      marque: '',
      modele: '',
      immatriculation: '',
      etat: 'disponible',
      prix_Jour: 0
    });
    this.agenceForm.nb_Voitures = Number(this.agenceForm.nb_Voitures ?? 0) + 1;
  }

  removeVoiture(i: number) {
    this.voitures.splice(i, 1);
    this.agenceForm.nb_Voitures = Math.max(0, Number(this.agenceForm.nb_Voitures ?? 0) - 1);
  }

  // ================= FILES =================
  onFileChange(event: any) {
    const files = event.target.files;
    if (!files) return;
    this.uploadedFiles = Array.from(files);
  }

  // ================= SAVE =================
  saveAgence() {
    if (!this.agenceForm.nom || !this.agenceForm.ville) {
      this.message = 'Nom et ville sont obligatoires ❌';
      return;
    }

    if (this.uploadedFiles.length > 0) {
      this.agenceService.uploadImages(this.uploadedFiles).subscribe({
        next: (res) => {
          this.agenceForm.images = res.images || [];
          this.saveAgenceData();
        },
        error: () => {
          this.message = "Erreur lors de l'upload des images ❌";
        }
      });
      return;
    }

    this.agenceForm.images = this.agenceForm.images || [];
    this.saveAgenceData();
  }

  private saveAgenceData() {
    this.normalizeAgenceCounts();
    const payload = this.buildAgencePayload();

    if (!this.editMode) {
      this.agenceService.createAgence(payload).subscribe({
        next: (agenceCreated: any) => {
          // ✅ CRÉATION AUTOMATIQUE DES VOITURES APRÈS CRÉATION AGENCE
          const nbVoitures = Number(this.agenceForm.nb_Voitures ?? 0);
          const voituresToCreate: any[] = [];
          
          for (let i = 0; i < nbVoitures; i++) {
            voituresToCreate.push({
              marque: 'BMW',
              modele: 'Série 3',
              immatriculation: `${230 + i} TUN ${2630 + i}`,
              etat: 'disponible',
              prix_Jour: 200,
              agenceId: agenceCreated.idagence
            });
          }

          if (voituresToCreate.length > 0) {
            const createRequests = voituresToCreate.map(dto => 
              this.voitureService.createVoiture(dto).pipe(catchError(() => of({ __saveError: true })))
            );

            forkJoin(createRequests).subscribe(results => {
              if (results.some((r: any) => r && r.__saveError)) {
                this.message = 'Agence créée mais certaines voitures ont échoué ⚠️';
              } else {
                this.message = `Agence enregistrée avec ${nbVoitures} voitures créées automatiquement ✅`;
              }
              this.closeModal();
              this.loadAgences();
            });
          } else {
            this.message = 'Agence enregistrée ✅';
            this.closeModal();
            this.loadAgences();
          }
        },
        error: (err) => {
          this.message = this.httpErrorMessage(err, "Erreur lors de l'ajout de l'agence ❌");
        }
      });
      return;
    }

    if (!this.agenceForm?.idagence) {
      this.message = 'Identifiant agence manquant. Impossible de modifier.';
      return;
    }

    this.agenceService.updateAgence(this.agenceForm.idagence, payload).subscribe({
      next: () => {
        this.persistVoituresAfterAgenceUpdate();
      },
      error: (err) => {
        this.message = this.httpErrorMessage(err, "Erreur lors de la modification de l'agence ❌");
      }
    });
  }

  private persistVoituresAfterAgenceUpdate() {
    const idAgence = this.agenceForm.idagence;
    const requests = this.voitures.map(v => {
      if (v.idvoiture) {
        const dto = this.buildUpdateVoitureDto(v);
        return this.voitureService.updateVoiture(v.idvoiture, dto).pipe(
          catchError(() => of({ __saveError: true }))
        );
      }
      const dto = this.buildCreateVoitureDto(v, idAgence);
      return this.voitureService.createVoiture(dto).pipe(
        catchError(() => of({ __saveError: true }))
      );
    });

    if (requests.length === 0) {
      this.finishAgenceEditSuccess();
      return;
    }

    forkJoin(requests).subscribe(results => {
      if (results.some((r: any) => r && r.__saveError)) {
        this.message = "Erreur lors de l'enregistrement des voitures ❌";
        return;
      }
      this.finishAgenceEditSuccess();
    });
  }

  private finishAgenceEditSuccess() {
    this.message = 'Agence modifiée avec images + voitures ✅';
    this.closeModal();
    this.loadAgences();
  }

  // ================= RESET =================
  resetForm() {
    this.agenceForm = {
      idagence: null,
      nom: '',
      ville: '',
      telephone: '',
      nb_Voitures: 0,
      agenceManagerId: null,
      latitude: 0,
      longitude: 0,
      images: []
    };
    this.voitures = [];
    this.uploadedFiles = [];
  }

  // ================= IMAGE URL =================
  getImageUrl(img: string): string {
    return 'http://localhost:3000' + img;
  }

  private normalizeAgenceCounts() {
    const rawCount =
      this.agenceForm.nb_Voitures ??
      this.agenceForm.nb_voitures ??
      this.agenceForm['nb-voitures'];
    this.agenceForm.nb_Voitures = Number(rawCount ?? 0);
  }

  private buildAgencePayload() {
    const n = Number(this.agenceForm.nb_Voitures ?? 0);
    return {
      nom: this.agenceForm.nom,
      ville: this.agenceForm.ville,
      telephone: this.agenceForm.telephone ?? '',
      nb_voitures: n,
      nb_Voitures: n,
      'nb-voitures': n,
      agenceManagerId: this.agenceForm.agenceManagerId,
      latitude: Number(this.agenceForm.latitude ?? 0),
      longitude: Number(this.agenceForm.longitude ?? 0),
      images: Array.isArray(this.agenceForm.images)
        ? this.agenceForm.images
            .map((i: any) => (typeof i === 'string' ? i : (i?.path ?? i?.url ?? i?.filename ?? i?.name ?? '')))
            .filter((s: string) => !!s)
        : []
    };
  }

  private buildCreateVoitureDto(voiture: any, agenceId: number): any {
    return {
      marque: String(voiture.marque ?? '').trim(),
      modele: String(voiture.modele ?? '').trim(),
      immatriculation: String(voiture.immatriculation ?? '').trim(),
      etat: String(voiture.etat ?? 'disponible').trim(),
      prix_Jour: Math.max(0, Number(voiture.prix_Jour ?? 0)),
      agenceId
    };
  }

  private buildUpdateVoitureDto(voiture: any): any {
    return {
      marque: String(voiture.marque ?? '').trim(),
      modele: String(voiture.modele ?? '').trim(),
      immatriculation: String(voiture.immatriculation ?? '').trim(),
      etat: String(voiture.etat ?? 'disponible').trim(),
      prix_Jour: Math.max(0, Number(voiture.prix_Jour ?? 0))
    };
  }

  private httpErrorMessage(err: any, fallback: string): string {
    const msg = err?.error?.message ?? err?.error?.error ?? err?.message;
    if (typeof msg === 'string' && msg.trim()) {
      return msg;
    }
    return fallback;
  }
}