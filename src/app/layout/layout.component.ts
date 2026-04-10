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
  role = '';

  isVisible = false;
  isBackdropVisible = false;

  private modalSubscription!: Subscription;
  private backdropSubscription!: Subscription;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  @HostListener('window:scroll')
  onWindowScroll() {
    this.scrollVisible = window.scrollY > 100;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  ngOnInit() {
    this.modalSubscription = this.modalService.modalState$.subscribe(
      state => this.isVisible = state
    );

    this.backdropSubscription = this.modalService.backdropState$.subscribe(
      state => this.isBackdropVisible = state
    );
  }

  ngOnDestroy() {
    this.modalSubscription?.unsubscribe();
    this.backdropSubscription?.unsubscribe();
  }

  closeModal() {
    this.modalService.closeModal();
  }

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.redirectByRole(res.role);
        this.closeModal();
      },
      error: () => alert('Erreur de connexion')
    });
  }

  onRegister() {
    this.authService.register(this.nom, this.email, this.password, this.role).subscribe({
      next: () => {
        alert('Inscription réussie');
        this.closeModal();
      },
      error: () => alert('Erreur inscription')
    });
  }
}