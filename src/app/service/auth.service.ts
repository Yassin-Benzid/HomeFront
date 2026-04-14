import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  access_token: string;
  nom: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:3000/users';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  // ================= LOGIN =================
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API_URL + '/login', {
      email,
      password
    }).pipe(
      tap((res: LoginResponse) => {

        // 🔥 FIX IMPORTANT : unified keys
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('name', res.nom);
        localStorage.setItem('email', res.email);

        // ✅ KEY UNIFIÉE (IMPORTANT FIX)
        localStorage.setItem('role', res.role.toLowerCase().replace('role_', '').trim());
      })
    );
  }

  // ================= REGISTER =================
  register(nom: string, email: string, password: string, role: string): Observable<any> {
    const formattedRole = role.toLowerCase();

    return this.http.post(this.API_URL + '/register', {
      nom,
      email,
      password,
      role: formattedRole
    });
  }

  // ================= REDIRECTION =================
  redirectByRole(role: string): void {

    const r = (role || '').toLowerCase();

    if (r === 'admin') {
      this.router.navigate(['/tableau-de-bord']);
    } else if (r === 'hotel-manager') {
      this.router.navigate(['/dashboard-hotel']);
    } else if (r === 'agence-manager') {
      this.router.navigate(['/dashboard-agence']);
    } else {
      this.router.navigate(['/']);
    }
  }

  // ================= UTIL =================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string {
    return (localStorage.getItem('role') || '')
      .toLowerCase()
      .replace('role_', '')
      .trim();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserName(): string | null {
    return localStorage.getItem('name');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}