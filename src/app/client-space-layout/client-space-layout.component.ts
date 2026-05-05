import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AsideMenuComponent } from '../components/aside-menu/aside-menu.component';
import { DashboardNavbarComponent } from '../components/dashboard-navbar/dashboard-navbar.component';

@Component({
  selector: 'app-client-space-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet, AsideMenuComponent, DashboardNavbarComponent],
  templateUrl: './client-space-layout.component.html',
  styles: [`
    .main-page-wrapper {
      min-height: 100vh;
      background-color: #f8fafc;
    }
    .scroll-top {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 45px;
      height: 45px;
      background: #0f3460;
      color: white;
      border: none;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      z-index: 999;
      transition: all 0.3s ease;
    }
    .scroll-top:hover {
      transform: translateY(-3px);
      background: #16213e;
    }
  `]
})
export class ClientSpaceLayoutComponent implements OnInit {

  scrollVisible = false;

  constructor() { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollVisible = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

}