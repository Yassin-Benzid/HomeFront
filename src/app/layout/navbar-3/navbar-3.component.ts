import { Component, HostListener } from '@angular/core';
import { MenuListComponent } from "../../components/menu-list/menu-list.component";
import { CommonModule } from '@angular/common';
import { ModalService } from '../../service/modal.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-navbar-3',
  standalone: true,
  imports: [MenuListComponent, CommonModule, RouterLink],
  templateUrl: './navbar-3.component.html'
})
export class Navbar3Component {

  headerClass = 'theme-main-menu menu-overlay menu-style-three sticky-menu';

  isLoggedIn = false;
  userName: string | null = null;

  constructor(
    private modalService: ModalService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();
    this.userName = this.authService.getUserName();
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (window.pageYOffset > 100) {
      this.headerClass = 'theme-main-menu menu-overlay menu-style-three sticky-menu fixed';
    } else {
      this.headerClass = 'theme-main-menu menu-overlay menu-style-three sticky-menu';
    }
  }

  openModal() {
    this.modalService.openModal();
  }

  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = null;
  }
}