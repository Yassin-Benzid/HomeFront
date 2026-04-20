import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Client {
  iduser: number;
  nom?: string;
  prenom?: string;
}

export interface Avis {
  idavis: number;
  type: string;
  note: number;
  commentaire: string;
  date_Avis: string;
  targetId: number;
  client?: Client;
}

@Injectable({
  providedIn: 'root'
})
export class AvisService {

  private apiUrl: string = 'http://localhost:3000/avis';

  constructor(private http: HttpClient) {}

  // ================= PUBLIC AVIS =================
  getPublicAvis(): Observable<Avis[]> {
    return this.http.get<Avis[]>(this.apiUrl + '/public');
  }

  // ================= BY TYPE =================
  getByType(type: string): Observable<Avis[]> {
    return this.http.get<Avis[]>(this.apiUrl + '/public/type/' + type);
  }

  // ================= BY TARGET =================
  getByTarget(type: string, id: number): Observable<Avis[]> {
    return this.http.get<Avis[]>(this.apiUrl + '/target/' + type + '/' + id);
  }

  // ================= AVERAGE =================
  getAverage(type: string, id: number): Observable<number> {
    return this.http.get<number>(this.apiUrl + '/public/average/' + type + '/' + id);
  }

  // ================= CREATE =================
  createAvis(data: Avis): Observable<Avis> {
    return this.http.post<Avis>(this.apiUrl, data);
  }

  // ================= UPDATE =================
  updateAvis(id: number, data: Partial<Avis>): Observable<Avis> {
    return this.http.put<Avis>(this.apiUrl + '/' + id, data);
  }

  // ================= DELETE =================
  deleteAvis(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + '/' + id);
  }
}