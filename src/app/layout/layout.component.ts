import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalService } from '../service/modal.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {

  scrollVisible = false;

  email = '';
  password = '';
  nom = '';
  prenom = '';
  telephone = '';
  role = '';

  successMessage = '';
  errorMessage = '';

  isLoggedIn = false;
  userName: string | null = null;

  isVisible = false;
  isBackdropVisible = false;

  private modalSubscription!: Subscription;
  private backdropSubscription!: Subscription;

  constructor(
    public modalService: ModalService,
    private authService: AuthService
  ) {}

  // ================= SCROLL =================
  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollVisible = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ================= INIT =================
  ngOnInit() {
    this.modalSubscription = this.modalService.modalState$.subscribe(
      state => this.isVisible = state
    );

    this.backdropSubscription = this.modalService.backdropState$.subscribe(
      state => this.isBackdropVisible = state
    );

    // ✅ LOAD AUTH STATE
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userName = this.authService.getUserName();

    // Afficher le popup login/signup au premier lancement
    // tout en gardant la page d'accueil visible en arrière-plan.
    if (!this.isLoggedIn) {
      this.modalService.openModal();
    }
  }

  ngOnDestroy() {
    this.modalSubscription?.unsubscribe();
    this.backdropSubscription?.unsubscribe();
  }

  // ================= MODAL =================
  closeModal() {
    this.modalService.closeModal();
    this.successMessage = '';
    this.errorMessage = '';
  }

  // ================= LOGIN =================
  onLogin() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Veuillez saisir votre email et votre mot de passe.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {

        this.successMessage = 'Connexion réussie. Heureux de vous revoir ! 👋';

        // ✅ IMPORTANT FIX (affichage immédiat navbar)
        this.isLoggedIn = true;
        this.userName = res.nom;

        setTimeout(() => {
          this.authService.redirectByRole(res.role);
          this.closeModal();
        }, 1500);
      },
      error: () => {
        this.errorMessage = 'Échec de connexion. Vérifiez vos identifiants.';
      }
    });
  }

  // ================= REGISTER =================
  onRegister() {
    this.successMessage = '';
    this.errorMessage = '';

    if (!this.nom || !this.prenom || !this.telephone || !this.email || !this.password || !this.role) {
      this.errorMessage = 'Veuillez remplir tous les champs du formulaire.';
      return;
    }

    this.authService.register(this.nom, this.prenom, this.telephone, this.email, this.password, this.role).subscribe({
      next: () => {
        this.successMessage = 'Bienvenue parmi nous 🎉 Votre compte a été créé avec succès.';

        setTimeout(() => {
          this.closeModal();
        }, 2000);
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l’inscription.';
      }
    });
  }

  // ================= LOGOUT =================
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = null;
  }
}