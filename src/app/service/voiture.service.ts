import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Aligné sur `CreateVoitureDto` (NestJS + class-validator). */
export interface CreateVoitureDto {
  marque: string;
  modele: string;
  immatriculation: string;
  etat: string;
  prix_Jour: number;
  agenceId: number;
}

/** Aligné sur `UpdateVoitureDto` (tous les champs modifiables pour agence-manager). */
export interface UpdateVoitureDto {
  marque?: string;
  modele?: string;
  immatriculation?: string;
  etat?: string;
  prix_Jour?: number;
}

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  private API_URL = 'http://localhost:3000/voitures';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token manquant ❌');
      return {};
    }

    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };
  }

  getAllVoitures(): Observable<any> {
    return this.http.get(this.API_URL, this.getHeaders());
  }

  getVoiture(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/' + id, this.getHeaders());
  }

  createVoiture(dto: CreateVoitureDto): Observable<any> {
    return this.http.post(this.API_URL, dto, this.getHeaders());
  }

  updateVoiture(id: number, dto: UpdateVoitureDto): Observable<any> {
    return this.http.put(this.API_URL + '/' + id, dto, this.getHeaders());
  }

  deleteVoiture(id: number): Observable<any> {
    return this.http.delete(this.API_URL + '/' + id, this.getHeaders());
  }

  checkDisponibilite(id: number, dateDebut: string, dateFin: string): Observable<any> {
    return this.http.get(
      this.API_URL + '/' + id + '/disponibilite?dateDebut=' + dateDebut + '&dateFin=' + dateFin,
      this.getHeaders()
    );
  }
}
