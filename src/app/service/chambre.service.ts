import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  // ================= CHAMBRES =================

  getAllChambres(): Observable<any> {
    return this.http.get(this.API_URL, this.getHeaders());
  }

  getChambre(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/' + id, this.getHeaders());
  }

  createChambre(data: any): Observable<any> {
    return this.http.post(this.API_URL, data, this.getHeaders());
  }

  updateChambre(id: number, data: any): Observable<any> {
    return this.http.put(this.API_URL + '/' + id, data, this.getHeaders());
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