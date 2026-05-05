import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Location {
  idlocation: number;
  date_debut: Date;
  date_fin: Date;
  statut: string;
  montant: number;
  client?: {
    iduser: number;
    nom?: string;
    prenom?: string;
    email?: string;
  };
  agenceManager?: {
    iduser: number;
    nom?: string;
    prenom?: string;
  };
  voiture?: {
    idvoiture: number;
    marque?: string;
    modele?: string;
    immatriculation?: string;
    prix_jour?: number;
  };
  facture?: {
    idfacture: number;
    montant_total?: number;
    statut?: string;
  };
  agence?: {
    idagence: number;
    nom?: string;
    adresse?: string;
  };
}

export interface CreateLocationDto {
  date_debut: Date;
  date_fin: Date;
  voitureId: number;
  idagence: number;
  montant: number;
}

export interface UpdateLocationDto {
  date_debut?: Date;
  date_fin?: Date;
  statut?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private API_URL = 'http://localhost:3000/locations';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    if (!token) {
      return {};
    }
    return {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    };
  }

  create(dto: CreateLocationDto): Observable<Location> {
    return this.http.post<Location>(this.API_URL, dto, this.getHeaders());
  }

  confirmerLocation(id: number, clientId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.API_URL}/confirmer/${id}/${clientId}`,
      {},
      this.getHeaders()
    );
  }

  annulerLocation(id: number, clientId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.API_URL}/annuler/${id}/${clientId}`,
      {},
      this.getHeaders()
    );
  }

  update(id: number, dto: UpdateLocationDto): Observable<Location> {
    return this.http.patch<Location>(`${this.API_URL}/${id}`, dto, this.getHeaders());
  }

  findAll(): Observable<Location[]> {
    return this.http.get<Location[]>(this.API_URL, this.getHeaders());
  }

  findOne(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.API_URL}/${id}`, this.getHeaders());
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, this.getHeaders());
  }
}