import { Component, HostListener } from '@angular/core';
import { AsideMenuComponent } from "../components/aside-menu/aside-menu.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../service/auth.service';

@Component({
    selector: 'app-dashboard-layout',
    imports: [AsideMenuComponent, RouterOutlet, CommonModule],
    templateUrl: './dashboard-layout.component.html',
    styleUrl: './dashboard-layout.component.scss'
})
export class DashboardLayoutComponent {
  scrollVisible: boolean = false;

  constructor(private authService: AuthService) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.scrollY > 100) {
      this.scrollVisible = true;
    } else {
      this.scrollVisible = false;
    }
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  logout() {
    this.authService.logout();
  }
}
