import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Facture {
  idfacture: number;
  mode_Paiement: string;
  montant_Total: number;
  date_Facture: Date;
  statut: string;
  client?: {
    iduser: number;
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
  };
  items?: Array<{
    designation?: string;
    quantite?: number;
    prixUnitaire?: number;
    prix_unitaire?: number;
    montant?: number;
    total?: number;
  }>;
  reservation?: {
    idreservation: number;
    date_debut: Date;
    date_fin: Date;
    hotelManager?: {
      iduser: number;
      nom?: string;
      prenom?: string;
    };
  };
  location?: {
    idlocation: number;
    date_debut: Date;
    date_fin: Date;
    agenceManager?: {
      iduser: number;
      nom?: string;
      prenom?: string;
    };
  };
}

export interface CreateFactureDto {
  clientId: number;
  reservationId?: number;
  locationId?: number;
  mode_Paiement: string;
  montant_Total: number;
  date_Facture: Date;
  statut?: string;
}

export interface UpdateFactureDto {
  statut?: string;
  montant_Total?: number;
  date_Facture?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private API_URL = 'http://localhost:3000/factures';

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

  create(dto: CreateFactureDto): Observable<Facture> {
    return this.http.post<Facture>(this.API_URL, dto, this.getHeaders());
  }

  createAuto(reservationId?: number, locationId?: number): Observable<Facture> {
    let params = new HttpParams();
    if (reservationId) params = params.append('reservationId', reservationId.toString());
    if (locationId) params = params.append('locationId', locationId.toString());
    
    return this.http.post<Facture>(`${this.API_URL}/from`, {}, { 
      ...this.getHeaders(), 
      params 
    });
  }

  payer(id: number): Observable<Facture> {
    return this.http.put<Facture>(`${this.API_URL}/${id}/payer`, {}, this.getHeaders());
  }

  update(id: number, dto: UpdateFactureDto): Observable<Facture> {
    return this.http.patch<Facture>(`${this.API_URL}/${id}`, dto, this.getHeaders());
  }

  findAll(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.API_URL, this.getHeaders());
  }

  findOne(id: number): Observable<Facture> {
    return this.http.get<Facture>(`${this.API_URL}/${id}`, this.getHeaders());
  }
}