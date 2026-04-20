import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private API_URL = 'http://localhost:3000/contact';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token');
    if (!token) return {};
    return { headers: new HttpHeaders({ Authorization: 'Bearer ' + token }) };
  }

  sendMessage(payload: any): Observable<any> {
    return this.http.post(this.API_URL, payload, this.getHeaders());
  }
}
