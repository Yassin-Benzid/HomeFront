import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardNavbarComponent } from '../../../components/dashboard-navbar/dashboard-navbar.component';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DashboardNavbarComponent, FormsModule, CommonModule],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  user: any = {
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: ''
  };

  imageSrc: string | ArrayBuffer | null = null;

  // ✅ POPUPS
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private userService: UserService) {}

  // ================= LOAD PROFILE =================
  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.userService.getProfile().subscribe({
      next: (data: any) => {
        this.user = {
          nom: data.nom || '',
          prenom: data.prenom || '',
          email: data.email || '',
          telephone: data.telephone || '',
          password: ''
        };
      },
      error: () => {
        this.user = {
          nom: '',
          prenom: '',
          email: '',
          telephone: '',
          password: ''
        };
      }
    });
  }

  // ================= SAVE PROFILE =================
  saveProfile(): void {

    const payload: any = {
      nom: this.user.nom,
      prenom: this.user.prenom,
      email: this.user.email,
      telephone: this.user.telephone
    };

    // password optionnel
    if (this.user.password && this.user.password.trim() !== '') {
      payload.password = this.user.password;
    }

    this.userService.updateProfile(payload).subscribe({
      next: () => {

        // ✅ SUCCESS POPUP
        this.successMessage = 'Profil mis à jour avec succès';
        this.errorMessage = '';

        // reset password field
        this.user.password = '';

        // reload profile
        this.loadProfile();

        // auto hide success message
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
      },

      error: (err) => {
        console.error('Update error:', err);

        // ❌ ERROR POPUP
        this.errorMessage = 'Erreur lors de la mise à jour du profil';
        this.successMessage = '';

        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }

  // ================= RESET =================
  clearForm(): void {
    this.loadProfile();
    this.user.password = '';
  }

  // ================= IMAGE =================
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result;
    };
    reader.readAsDataURL(file);
  }
}