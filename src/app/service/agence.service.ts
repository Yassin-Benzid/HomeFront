import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  private API_URL = 'http://localhost:3000/agences';

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

  getAllAgences(): Observable<any> {
    return this.http.get(this.API_URL, this.getHeaders());
  }

  getAgence(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/' + id, this.getHeaders());
  }

  createAgence(data: any): Observable<any> {
    return this.http.post(this.API_URL, data, this.getHeaders());
  }

  updateAgence(id: number, data: any): Observable<any> {
    return this.http.put(this.API_URL + '/' + id, data, this.getHeaders());
  }

  deleteAgence(id: number): Observable<any> {
    return this.http.delete(this.API_URL + '/' + id, this.getHeaders());
  }
}