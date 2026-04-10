import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface LoginResponse {
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
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, {
      email,
      password
    }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('user_name', res.nom);
        localStorage.setItem('user_email', res.email);
        localStorage.setItem('user_role', res.role);
      })
    );
  }

  // ================= REGISTER =================
  register(nom: string, email: string, password: string, role: string): Observable<LoginResponse> {

    // 🔥 NORMALISATION DES ROLES (IMPORTANT)
    const roleMapping: any = {
      CLIENT: 'client',
      HOTEL_MANAGER: 'hotel-manager',
      AGENCY_MANAGER: 'agence-manager'
    };

    const formattedRole = roleMapping[role] || 'client';

    return this.http.post<LoginResponse>(`${this.API_URL}/register`, {
      nom,
      email,
      password,
      role: formattedRole
    });
  }

  // ================= HELPERS =================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUserRole(): string | null {
    return localStorage.getItem('user_role');
  }

  // ================= LOGOUT =================
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  // ================= REDIRECTION =================
  redirectByRole(role: string): void {
    switch (role) {
      case 'admin':
        this.router.navigate(['/admin']);
        break;

      case 'hotel-manager':
        this.router.navigate(['/hotel-dashboard']);
        break;

      case 'agence-manager':
        this.router.navigate(['/agence-dashboard']);
        break;

      case 'client':
      default:
        this.router.navigate(['/']);
        break;
    }
  }
}