import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private API_URL = 'http://localhost:3000/zones';

  constructor(private http: HttpClient) {}

  // ================= HEADERS =================
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

  // ================= CRUD =================

  getZones(): Observable<any> {
    return this.http.get(this.API_URL, this.getHeaders());
  }

  getZone(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/' + id, this.getHeaders());
  }

  createZone(data: any): Observable<any> {
    return this.http.post(this.API_URL, data, this.getHeaders());
  }

  updateZone(id: number, data: any): Observable<any> {
    return this.http.put(this.API_URL + '/' + id, data, this.getHeaders());
  }

  deleteZone(id: number): Observable<any> {
    return this.http.delete(this.API_URL + '/' + id, this.getHeaders());
  }

  // ================= UPLOAD IMAGE =================
  uploadImage(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(
      this.API_URL + '/upload-image',
      formData,
      this.getHeaders()
    );
  }

  // ================= 🔥 ADVANCED SEARCH =================
getAdvancedZones(filters: any): Observable<any> {

  let params: any = {};

  Object.keys(filters).forEach(key => {
    if (filters[key] !== null && filters[key] !== '') {
      params[key] = filters[key];
    }
  });

  return this.http.get(
    this.API_URL + '/advanced',
    {
      ...this.getHeaders(),
      params
    }
  );
}
}