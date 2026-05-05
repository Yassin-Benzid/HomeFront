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
    // Récupérer l'utilisateur connecté depuis localStorage
    const userData = localStorage.getItem('user');
    if (!userData) {
      return new Observable(observer => {
        observer.error('Utilisateur non connecté');
        observer.complete();
      });
    }
    
    const user = JSON.parse(userData);
    // Transmettre userId et role en paramètres query comme attendu par le backend
    return this.http.get(`${this.API_URL}?userId=${user.id}&role=${user.role}`, this.getHeaders());
  }

  getChambre(id: number): Observable<any> {
    const userData = localStorage.getItem('user');
    if (!userData) {
      return new Observable(observer => {
        observer.error('Utilisateur non connecté');
        observer.complete();
      });
    }
    
    const user = JSON.parse(userData);
    // Transmettre userId et role en paramètres query pour findOne
    return this.http.get(`${this.API_URL}/${id}?userId=${user.id}&role=${user.role}`, this.getHeaders());
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
