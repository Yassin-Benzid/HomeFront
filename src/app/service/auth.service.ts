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

  private normalizeRole(role: string | null | undefined): string {
    const cleaned = (role || '')
      .toLowerCase()
      .replace('role_', '')
      .replace(/_/g, '-')
      .trim();

    if (cleaned === 'agency-manager') return 'agence-manager';
    if (cleaned === 'hotel-manager') return 'hotel-manager';
    if (cleaned === 'agence-manager') return 'agence-manager';
    if (cleaned === 'admin') return 'admin';
    if (cleaned === 'client') return 'client';

    return cleaned;
  }

  // ================= LOGIN =================
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.API_URL + '/login', {
      email,
      password
    }).pipe(
      tap((res: LoginResponse) => {

        // 🔥 FIX IMPORTANT : unified keys
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('name', res.nom || '');
        localStorage.setItem('email', res.email || '');

        // Normalize role format to avoid runtime errors and bad redirects.
        localStorage.setItem('role', this.normalizeRole(res.role));
      })
    );
  }

  // ================= REGISTER =================
  register(
    nom: string,
    prenom: string,
    telephone: string,
    email: string,
    password: string,
    role: string
  ): Observable<any> {
    const formattedRole = this.normalizeRole(role);

    return this.http.post(this.API_URL + '/register', {
      nom,
      prenom,
      telephone,
      email,
      password,
      role: formattedRole
    });
  }

  // ================= REDIRECTION =================
  redirectByRole(role: string): void {

    const r = this.normalizeRole(role);

    if (r === 'admin') {
      this.router.navigate(['/tableau-de-bord']);
    } else if (r === 'hotel-manager') {
      this.router.navigate(['/hotel-manager']);
    } else if (r === 'agence-manager') {
      this.router.navigate(['/agency-manager']);
    } else {
      this.router.navigate(['/']);
    }
  }

  // ================= UTIL =================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string {
    return this.normalizeRole(localStorage.getItem('role'));
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getUserName(): string | null {
    return localStorage.getItem('name');
  }

  isClient(): boolean {
    return this.getRole() === 'client';
  }

  isAdmin(): boolean {
    return this.getRole() === 'admin';
  }

  isHotelManager(): boolean {
    return this.getRole() === 'hotel-manager';
  }

  isAgencyManager(): boolean {
    return this.getRole() === 'agence-manager';
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
