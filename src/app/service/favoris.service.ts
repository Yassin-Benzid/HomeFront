import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Enum identique au backend (BEST PRACTICE)
export enum FavorisType {
  HOTEL = 'hotel',
  AGENCE = 'agence',
  ZONE = 'zone',
}

export interface Favoris {
  id: number;
  type: FavorisType;
  targetId: number;
  createdAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FavorisService {

  private apiUrl = 'http://localhost:3000/api/favoris';

  constructor(private http: HttpClient) { }

  /**
   * Récupérer le token JWT depuis le localStorage
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  /**
   * Ajouter un favori
   * @param type Type de favori (hotel / agence / zone)
   * @param targetId ID de l'élément concerné
   */
  addFavori(type: FavorisType, targetId: number): Observable<Favoris> {
    return this.http.post<Favoris>(this.apiUrl, 
      { type, targetId },
      { headers: this.getAuthHeaders() }
    );
  }

  /**
   * Récupérer tous les favoris du client connecté
   */
  getFavoris(): Observable<Favoris[]> {
    return this.http.get<Favoris[]>(this.apiUrl, {
      headers: this.getAuthHeaders()
    });
  }

  /**
   * Supprimer un favori
   * @param type Type de favori
   * @param targetId ID de l'élément concerné
   */
  removeFavori(type: FavorisType, targetId: number): Observable<any> {
    return this.http.delete(this.apiUrl, {
      headers: this.getAuthHeaders(),
      body: { type, targetId }
    });
  }

  /**
   * Vérifier si un élément est déjà en favori
   */
  isFavori(type: FavorisType, targetId: number, favorisList: Favoris[]): boolean {
    return favorisList.some(f => f.type === type && f.targetId === targetId);
  }
}