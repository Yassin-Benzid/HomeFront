import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  private API_URL = 'http://localhost:3000/hotels';

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

  // ================= HOTELS =================

  getAllHotels(): Observable<any> {
    return this.http.get(this.API_URL, this.getHeaders());
  }

  getHotel(id: number): Observable<any> {
    return this.http.get(this.API_URL + '/' + id, this.getHeaders());
  }

  createHotel(data: any): Observable<any> {
    return this.http.post(this.API_URL, data, this.getHeaders());
  }

  updateHotel(id: number, data: any): Observable<any> {
    return this.http.put(this.API_URL + '/' + id, data, this.getHeaders());
  }

  deleteHotel(id: number): Observable<any> {
    return this.http.delete(this.API_URL + '/' + id, this.getHeaders());
  }

  // ================= UPLOAD IMAGES =================

  uploadImages(files: File[]): Observable<any> {

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    return this.http.post(
      this.API_URL + '/upload-images',
      formData,
      this.getHeaders()
    );
  }

  // ================= 🔥 ADVANCED SEARCH =================
getAdvancedHotels(filters: any): Observable<any> {
  let params: any = {};

  // parameters
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