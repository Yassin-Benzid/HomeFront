import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-aside-menu',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule],
  templateUrl: './aside-menu.component.html'
})
export class AsideMenuComponent {

  adminSections = [
    {
      title: 'Pilotage',
      items: [
        {
          route: '/tableau-de-bord',
          label: 'Tableau de bord',
          icon: 'assets/dashboard-images/icon/icon_1.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_1_active.svg'
        },
        {
          route: '/utilisateurs',
          label: 'Utilisateurs',
          icon: 'assets/dashboard-images/icon/icon_5.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_5_active.svg'
        },
        {
          route: '/reservations',
          label: 'Réservations',
          icon: 'assets/dashboard-images/icon/icon_2.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_2_active.svg'
        },
        {
          route: '/locations',
          label: 'Locations',
          icon: 'assets/dashboard-images/icon/icon_4.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_4_active.svg'
        },
        {
          route: '/facturation',
          label: 'Facturation',
          icon: 'assets/dashboard-images/icon/icon_10.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_10_active.svg'
        }
      ]
    },

    {
      title: 'Catalogue',
      items: [
        {
          route: '/zones-touristiques',
          label: 'Zones touristiques',
          icon: 'assets/dashboard-images/icon/icon_9.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_9_active.svg'
        },
        {
          route: '/hotels',
          label: 'Hôtels & chambres',
          icon: 'assets/dashboard-images/icon/icon_6.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_6_active.svg'
        },

        // ✅ FICHE HOTEL
        {
          route: '/fiche-hotel',
          label: 'Fiche hôtel',
          icon: 'assets/dashboard-images/icon/icon_7.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_7_active.svg'
        },

        // 🔥 NEW → FICHE AGENCE
        {
          route: '/fiche-agence',
          label: 'Fiche agence',
          icon: 'assets/dashboard-images/icon/icon_4.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_4_active.svg'
        },

        {
          route: '/agences-voitures',
          label: 'Agences voitures',
          icon: 'assets/dashboard-images/icon/icon_4.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_4_active.svg'
        }
      ]
    },

    {
      title: 'Expérience client',
      items: [
        {
          route: '/avis-commentaires',
          label: 'Avis & commentaires',
          icon: 'assets/dashboard-images/icon/icon_3.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_3_active.svg'
        },
        {
          route: '/wishlist',
          label: 'Wishlist',
          icon: 'assets/dashboard-images/icon/icon_8.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_8_active.svg'
        },
        {
          route: '/profil-admin',
          label: 'Profil admin',
          icon: 'assets/dashboard-images/icon/icon_40.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_40_active.svg'
        }
      ]
    }
  ];

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }
}