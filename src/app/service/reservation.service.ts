import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reservation {
  idreservation: number;
  date_debut: Date;
  date_fin: Date;
  statut: string;
  client: {
    iduser: number;
    nom?: string;
    prenom?: string;
    email?: string;
  };
  hotelManager?: {
    iduser: number;
    nom?: string;
    prenom?: string;
  };
  hotel?: {
    idhotel: number;
    nom?: string;
  };
  chambres: Array<{
    idchambre: number;
    numero?: string;
    type?: string;
    prix_nuit?: number;
  }>;
  facture?: {
    idfacture: number;
    montant_total?: number;
    statut?: string;
  };
}

export interface CreateReservationDto {
  date_debut: Date;
  date_fin: Date;
  chambreId: number;
}

export interface UpdateReservationDto {
  date_debut?: Date;
  date_fin?: Date;
  statut?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private API_URL = 'http://localhost:3000/reservations';

  constructor(private http: HttpClient) {}

  // ================= TOKEN HEADERS =================
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

  // ================= CREATE RESERVATION =================
  create(dto: CreateReservationDto): Observable<Reservation> {
    return this.http.post<Reservation>(this.API_URL, dto, this.getHeaders());
  }

  // ================= CONFIRM RESERVATION =================
  confirmerReservation(id: number, clientId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.API_URL}/confirmer/${id}/${clientId}`,
      {},
      this.getHeaders()
    );
  }

  // ================= CANCEL RESERVATION =================
  annulerReservation(id: number, clientId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.API_URL}/annuler/${id}/${clientId}`,
      {},
      this.getHeaders()
    );
  }

  // ================= UPDATE RESERVATION =================
  updateDates(id: number, dto: UpdateReservationDto): Observable<Reservation> {
    return this.http.patch<Reservation>(
      `${this.API_URL}/${id}`,
      dto,
      this.getHeaders()
    );
  }

  // ================= GET ALL RESERVATIONS =================
  findAll(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.API_URL, this.getHeaders());
  }

  // ================= GET ONE RESERVATION =================
  findOne(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.API_URL}/${id}`, this.getHeaders());
  }

  // ================= DELETE RESERVATION =================
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`, this.getHeaders());
  }

  // ================= GET RESERVATIONS BY ROLE (for dashboard) =================
  getReservationsForDashboard(): Observable<Reservation[]> {
    return this.findAll(); // Le backend gère déjà le filtrage par rôle
  }
}
