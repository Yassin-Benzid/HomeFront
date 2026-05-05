import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EspaceClientService {

  private apiUrl = 'http://localhost:3000/clients';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({ Authorization: 'Bearer ' + token });
  }

  getProfile(): Observable<any> {
    return this.http.get(this.apiUrl + '/profile', { headers: this.getHeaders() });
  }

  getReservations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/reservations', { headers: this.getHeaders() });
  }

  getLocations(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/locations', { headers: this.getHeaders() });
  }

  getFactures(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/factures', { headers: this.getHeaders() });
  }

  getAvis(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/avis', { headers: this.getHeaders() });
  }

  getFavoris(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/favoris', { headers: this.getHeaders() });
  }
}