import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/** Aligné sur `CreateChambreDto` (NestJS + class-validator). */
export interface CreateChambreDto {
  numero: number;
  capacite: number;
  etat: string;
  prix_Nuit: number;
  hotelId: number;
}

/** Aligné sur `UpdateChambreDto`. */
export interface UpdateChambreDto {
  numero?: number;
  capacite?: number;
  etat?: string;
  prix_Nuit?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ChambreService {

  private API_URL = 'http://localhost:3000/chambres';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token manquant');
      return {};
    }

    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };
  }

  getAllChambres(): Observable<any> {
    return this.http.get(this.API_URL, this.getHeaders());
  }

  getChambre(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/' + id, this.getHeaders());
  }

  createChambre(dto: CreateChambreDto): Observable<any> {
    return this.http.post(this.API_URL, dto, this.getHeaders());
  }

  updateChambre(id: number, dto: UpdateChambreDto): Observable<any> {
    return this.http.put(this.API_URL + '/' + id, dto, this.getHeaders());
  }

  deleteChambre(id: number): Observable<any> {
    return this.http.delete(this.API_URL + '/' + id, this.getHeaders());
  }

  verifierDisponibilite(id: number, dateDebut: string, dateFin: string): Observable<any> {
    return this.http.get(
      this.API_URL + '/' + id + '/disponibilite?dateDebut=' + dateDebut + '&dateFin=' + dateFin,
      this.getHeaders()
    );
  }
}
