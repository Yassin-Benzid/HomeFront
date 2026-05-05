import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth.service';

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
          label: 'Tableau de bord Admin',
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
          route: '/fiche-zone',
          label: 'Fiche zone',
          icon: 'assets/dashboard-images/icon/icon_9.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_9_active.svg'
        },
        {
          route: '/hotels',
          label: 'Hôtels & chambres',
          icon: 'assets/dashboard-images/icon/icon_6.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_6_active.svg'
        },
        {
          route: '/fiche-hotel',
          label: 'Fiche hôtel',
          icon: 'assets/dashboard-images/icon/icon_7.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_7_active.svg'
        },
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
        }
          ]
        
         },

        {
          title: 'Paramètres',
           items: [
             {
          route: '/profil-admin',
          label: 'Profile',
          icon: 'assets/dashboard-images/icon/icon_40.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_40_active.svg'
       }
      ]
    }
  ];


  hotelManagerSections = [
    {
      title: 'Gestion Hôtel',
      items: [
        {
          route: '/hotel-manager',
          label: 'Tableau de bord',
          icon: 'assets/dashboard-images/icon/icon_1.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_1_active.svg'
        },
        {
          route: '/hotel-manager/gestion-hotels-chambres',
          label: 'Gestion Hotels & Chambres',
          icon: 'assets/dashboard-images/icon/icon_6.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_6_active.svg'
        },
         {
           route: '/reservations',
           label: 'Liste des réservations',
           icon: 'assets/dashboard-images/icon/icon_2.svg',
           activeIcon: 'assets/dashboard-images/icon/icon_2_active.svg'
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
      title: 'Paramètres',
      items: [
        {
          route: '/profile',
          label: 'Mon Profile',
          icon: 'assets/dashboard-images/icon/icon_40.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_40_active.svg'
        }
      ]
    }
  ];

  agencyManagerSections = [
    {
      title: 'Gestion Agence',
      items: [
        {
          route: '/agency-manager',
          label: 'Tableau de bord',
          icon: 'assets/dashboard-images/icon/icon_1.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_1_active.svg'
        },
        {
          route: '/agency-manager/gestion-agences-voitures',
          label: 'Gestion Agences & Voitures',
          icon: 'assets/dashboard-images/icon/icon_4.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_4_active.svg'
        },
        {
          route: '/locations',
          label: 'Liste des locations',
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
      title: 'Paramètres',
      items: [
        {
          route: '/profile',
          label: 'Mon Profile',
          icon: 'assets/dashboard-images/icon/icon_40.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_40_active.svg'
        }
      ]
    }
  ];

  clientSections = [
    {
      title: 'Mon Espace',
      items: [
        {
          route: '/mes-reservations',
          label: 'Mes Réservations',
          icon: 'assets/dashboard-images/icon/icon_2.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_2_active.svg'
        },
        {
          route: '/mes-locations',
          label: 'Mes Locations',
          icon: 'assets/dashboard-images/icon/icon_4.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_4_active.svg'
        },
        {
          route: '/mes-factures',
          label: 'Mes Factures',
          icon: 'assets/dashboard-images/icon/icon_10.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_10_active.svg'
        },
        {
          route: '/mes-avis',
          label: 'Mes Avis',
          icon: 'assets/dashboard-images/icon/icon_3.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_3_active.svg'
        },
        {
          route: '/mes-favoris',
          label: 'Mes Favoris',
          icon: 'assets/dashboard-images/icon/icon_38.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_38_active.svg'
        }
      ]
    },
    {
      title: 'Paramètres',
      items: [
        {
          route: '/profile',
          label: 'Mon Profile',
          icon: 'assets/dashboard-images/icon/icon_40.svg',
          activeIcon: 'assets/dashboard-images/icon/icon_40_active.svg'
        }
      ]
    }
  ];

  get currentSections() {
    const role = this.authService.getRole();
    if (role === 'client') return this.clientSections;
    if (role === 'hotel-manager') return this.hotelManagerSections;
    if (role === 'agence-manager') return this.agencyManagerSections;
    return this.adminSections;
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  isActive(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  logout() {
    this.authService.logout();
  }
}
