import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { Navbar3Component } from '../../../../layout/navbar-3/navbar-3.component';
import { Footer2Component } from '../../../../layout/footer-2/footer-2.component';
import { SidenavComponent } from '../../../../components/sidenav/sidenav.component';

// Services Backend
import { AuthService } from '../../../../service/auth.service';
import { LocationService } from '../../../../service/location.service';
import { ReservationService } from '../../../../service/reservation.service';
import { FactureService } from '../../../../service/facture.service';
import { ModalService } from '../../../../service/modal.service';

interface SelectOption {
  value: string;
  label: string;
}

interface CategoryCard {
  link: string;
  icon: string;
  label: string;
  description: string;
  count: number;
}

interface JourneyCard {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  role?: 'visitor' | 'client' | 'all';
}
interface FeaturedCard {
  badge: string;
  title: string;
  location: string;
  details: string[];
  cta: string;
  link: string;
  image: string;
  rating?: number;
  price?: string;
  type: 'hotel' | 'agency' | 'zone';
  id?: string;
}

interface OfferCard {
  badge: string;
  image: string;  title: string;
  location: string;
  details: string[];
  price: string;
  link: string;
  originalPrice?: string;
  discount?: string;
  type: 'hotel' | 'car' | 'package';
}

interface StatCard {
  icon: string;
  value: string;
  label: string;
}


interface RegionPin {
  country: string;
  address: string;
  flag: string;
  lat: number;
  lng: number;
  zonesCount?: number;
}

interface RegionGroup {
  title: string;
  countries: string[];
  icon?: string;
}

interface Testimonial {
  name: string;
  location: string;
  image: string;
  message: string;
  rating: number;
  serviceType: 'hotel' | 'car' | 'zone';
  date?: string;
}

interface Statistic {
  value: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-index-3',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgSelectModule,
    Navbar3Component,
    Footer2Component,
    SidenavComponent
  ],
  templateUrl: './index-3.component.html'
})
export class Index3Component implements OnInit {

  isAuthenticated = false;
  userRole: string | null = null;

  searchModel = {
    service: 'hotel',
    destination: 'hammamet',
    guests: 1
  };

  serviceOptions: SelectOption[] = [
    { value: 'hotel', label: 'Réserver un hôtel' },
    { value: 'car', label: 'Louer une voiture' },
    { value: 'zone', label: 'Découvrir une zone touristique' }
  ];

  destinationOptions: SelectOption[] = [
    { value: 'tunis', label: 'Tunis' },
    { value: 'hammamet', label: 'Hammamet' },
    { value: 'sousse', label: 'Sousse' },
    { value: 'djerba', label: 'Djerba'},
    { value: 'tozeur', label: 'Tozeur' },
    { value: 'gabes', label: 'Gabès' },
    { value: 'sfax', label: 'Sfax' },
    { value: 'tabarka', label: 'Tabarka' }
  ];

  categories: CategoryCard[] = [
    { link: '/hotels', icon: 'assets/images/icon/icon_15.svg', label: 'Hôtels & chambres', description: '+120 hôtels partenaires', count: 124 },
    { link: '/agences-voitures', icon: 'assets/images/icon/icon_17.svg', label: 'Agences de location', description: '+85 agences auto', count: 87 },
    { link: '/zones-touristiques', icon: 'assets/images/icon/icon_18.svg', label: 'Zones touristiques', description: '+60 sites découvertes', count: 62 },
    { link: '/avis-commentaires', icon: 'assets/images/icon/icon_19.svg', label: 'Avis voyageurs', description: '+2500 commentaires', count: 2547 }
  ];

  statistics: Statistic[] = [
    { value: '124', label: 'Hôtels partenaires', icon: 'bi bi-buildings' },
    { value: '87', label: 'Agences auto', icon: 'bi bi-car-front' },
    { value: '62', label: 'Zones touristiques', icon: 'bi bi-geo-alt' },
    { value: '10K+', label: 'Voyageurs satisfaits', icon: 'bi bi-check-circle' }
  ];

   // Parcours utilisateur avec gestion des rôles
  journeyCards: JourneyCard[] = [
    {
      icon: 'assets/images/icon/icon_23.svg',
      title: 'Réserver un hôtel',
      description: 'Consultez, comparez et réservez votre chambre en quelques clics. Disponibilité en temps réel.',
      buttonText: 'Voir les hôtels',
      link: '/hotels',
      role: 'all'
    },
    {
      icon: 'assets/images/icon/icon_24.svg',
      title: 'Louer une voiture',
      description: 'Choisissez parmi nos partenaires certifiés. Assurance incluse, annulation gratuite.',
      buttonText: 'Voir les agences',
      link: '/agences-voitures',
      role: 'all'
    },
    {
      icon: 'assets/images/icon/icon_25.svg',
      title: 'Découvrir la Tunisie',
      description: 'Explorez nos zones touristiques : patrimoine, nature, culture et aventures.',
      buttonText: 'Explorer',
      link: '/zones-touristiques',
      role: 'all'
    },
    {
      icon: 'assets/images/icon/icon_26.svg',
      title: 'Espace Client',
      description: 'Gérez vos réservations, locations, factures et avis depuis votre tableau de bord.',
      buttonText: 'Mon compte',
      link: '/espace-client',
      role: 'client'
    }
  ];

  


  // Carte mise en avant dynamique
  featuredFocus: FeaturedCard = {
    badge: '🌟 Coup de Cœur',
    title: 'Hôtel Riviera & Spa Hammamet',
    location: 'Hammamet Nord, Tunisie',
    details: ['42 chambres', 'Spa & Wellness', 'Piscine chauffée', '4.8/5 ⭐'],
    cta: 'Réserver maintenant',    link: '/hotels/riviera-hammamet',
    image: 'assets/images/listing/img_12.jpg',
    rating: 4.8,
    price: 'À partir de 180 DT/nuit',
    type: 'hotel',
    id: 'hotel_001'
  };

  // Highlights avec types variés
  featuredHighlights: FeaturedCard[] = [
    {
      badge: '🚗 Agence Premium',
      title: 'CarGo Tunisia - Tunis',
      location: 'Aéroport Tunis-Carthage',
      details: ['20+ véhicules', 'Livraison aéroport', 'Assurance tous risques'],
      cta: 'Voir l\'agence',
      link: '/agences/cargo-tunis',
      image: 'assets/images/listing/img_10.jpg',
      rating: 4.6,
      price: 'À partir de 80 DT/jour',
      type: 'agency',
      id: 'agency_001'
    },
    {
      badge: '🏜️ Incontournable',
      title: 'Oasis de Tozeur & Chott el-Jérid',
      location: 'Tozeur, Sud Tunisien',
      details: ['Circuits 4x4', 'Nuit sous les étoiles', 'Guide local inclus'],
      cta: 'Découvrir',
      link: '/zones/tozeur-oasis',
      image: 'assets/images/listing/img_11.jpg',
      rating: 4.9,
      type: 'zone',
      id: 'zone_001'
    }
  ];

  // Offres promotionnelles
  offers: OfferCard[] = [
    {
      badge: '🔥 Promotion',
      image: 'assets/images/listing/img_13.jpg',
      title: 'Suite Vue Mer - Sousse',
      location: 'Port El Kantaoui, Sousse',
      details: ['Petit déjeuner inclus', 'Annulation gratuite', 'WiFi haut débit'],
      price: '150 DT/nuit',
      originalPrice: '220 DT',
      discount: '-32%',
      link: '/hotels/sousse-suite-mer',
      type: 'hotel'    },
    {
      badge: '⭐ Populaire',
      image: 'assets/images/listing/img_14.jpg',
      title: 'Dacia Duster 4x4 - Djerba',
      location: 'Agence Djerba Auto',
      details: ['Climatisation', 'GPS inclus', 'Kilométrage illimité'],
      price: '120 DT/jour',
      link: '/voitures/dacia-duster-djerba',
      type: 'car'
    },
    {
      badge: '🎁 Forfait',
      image: 'assets/images/listing/img_15.jpg',
      title: 'Week-end Hammamet',
      location: 'Hôtel + Voiture + Excursion',
      details: ['2 nuits', 'Voiture 2 jours', 'Visite médina'],
      price: '450 DT',
      originalPrice: '580 DT',
      discount: '-22%',
      link: '/packages/hammamet-weekend',
      type: 'package' 
    }
  ];

  // Statistiques de la plateforme
  stats: StatCard[] = [
    { icon: 'assets/images/icon/icon_stat_1.svg', value: '250+', label: 'Hôtels partenaires' },
    { icon: 'assets/images/icon/icon_stat_2.svg', value: '80+', label: 'Agences certifiées' },
    { icon: 'assets/images/icon/icon_stat_3.svg', value: '45', label: 'Zones touristiques' },
    { icon: 'assets/images/icon/icon_stat_4.svg', value: '15K+', label: 'Voyageurs satisfaits' }
  ];

  // Pins pour la carte interactive
  mapPins: RegionPin[] = [
    { country: 'Nord', address: 'Tunis - Carthage', flag: 'assets/images/logo/flag_01.png', lat: 36.8065, lng: 10.1815, zonesCount: 12 },
    { country: 'Cap Bon', address: 'Hammamet - Nabeul', flag: 'assets/images/logo/flag_02.png', lat: 36.4, lng: 10.6, zonesCount: 8 },
    { country: 'Sahel', address: 'Sousse - Monastir', flag: 'assets/images/logo/flag_03.png', lat: 35.8256, lng: 10.6369, zonesCount: 10 },
    { 
      country: 'Sud', address: 'Tozeur - Douz', flag: 'assets/images/logo/flag_04.png', lat: 33.9197, lng: 8.1335, zonesCount: 6 },
    { country: 'Île', address: 'Djerba - Houmt Souk', flag: 'assets/images/logo/flag_05.png', lat: 33.8075, lng: 10.8453, zonesCount: 5 }
  ];

  // Régions par catégorie
  regionLists: RegionGroup[] = [
    { 
      title: '🏖️ Balnéaire', 
      countries: ['Hammamet', 'Sousse', 'Djerba', 'Mahdia', 'Monastir', "Bizerte"],
      icon: 'assets/images/icon/beach.svg'
    },
    {       title: '🏜️ Désert & Oasis', 
      countries: ['Tozeur', 'Douz', "Gabès", 'Tataouine'],
      icon: 'assets/images/icon/desert.svg'
    },
    { 
      title: '🏛️ Patrimoine', 
      countries: ['Tunis', 'Carthage', 'Kairouan', 'El Jem'],
      icon: 'assets/images/icon/heritage.svg'
    },
    { 
      title: '🥾 Aventure', 
      countries: ["Jendouba",'Tabarka', 'Ain Draham', "Beja"],
      icon: 'assets/images/icon/adventure.svg'
    }
  ];



  testimonials: Testimonial[] = [
    {
      name: 'Ahmed Ben Salem',
      location: 'Tunis',
      image: 'assets/images/media/img_01.jpg',
      message: 'Réservation fluide, hôtel conforme aux photos. Le service client a répondu en moins de 2h !',
      rating: 5,
      serviceType: 'hotel',
      date: 'Mars 2026'
    },
    {
      name: 'Salma Trabelsi',
      location: 'Sfax',
      image: 'assets/images/media/img_02.jpg',
      message: 'Location de voiture sans surprise. Véhicule propre, agence professionnelle. Je recommande !',
      rating: 5,
      serviceType: 'car',
      date: 'Février 2026'
    },
    {
      name: 'Mohamed Gharbi',
      location: 'France',
      image: 'assets/images/media/img_03.jpg',
      message: 'Découverte magique des oasis de Tozeur. La plateforme m\'a guidé pas à pas. Merci !',
      rating: 4,
      serviceType: 'zone',
      date: 'Janvier 2026'
    }
  ];

  selectedOfferType: string = 'all';

  constructor(
    private router: Router,
    private authService: AuthService,
    private locationService: LocationService,
    private reservationService: ReservationService,
    private factureService: FactureService,
    private modalService: ModalService
  ) {}

  openLoginModal() {
    this.modalService.openModal();
  }

  openRegisterModal() {
    this.modalService.openModal();
  }

  ngOnInit(): void {
    // Vérification statut authentification et rôle utilisateur
    this.isAuthenticated = this.authService.isAuthenticated();
    this.userRole = this.authService.getRole();
    
    // Mise à jour des catégories selon le rôle
    this.updateCategoriesVisibility();

    // Chargement des destinations depuis le service backend
    this.loadDestinations();
    
    // Chargement des offres promotionnelles
    this.loadOffers();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollBtn = document.getElementById('scrollTopBtn');
    if (scrollBtn) {
      scrollBtn.classList.toggle('d-none', window.pageYOffset <= 300);
    }
  }

  onSearch(): void {
    // ✅ Fonctionnalité Visiteur / Client : Recherche par destination
    console.log('✅ Recherche effectuée:', this.searchModel);
    
    // Redirection dynamique selon type de service avec filtrage par ville
    switch(this.searchModel.service) {
      case 'hotel':
        this.router.navigate(['/hotels'], { 
          queryParams: { 
            ville: this.searchModel.destination
          } 
        });
        break;
      case 'car':
        this.router.navigate(['/agences-voitures'], { 
          queryParams: { 
            ville: this.searchModel.destination
          } 
        });
        break;
      case 'zone':
        this.router.navigate(['/zones-touristiques'], { 
          queryParams: { region: this.searchModel.destination } 
        });
        break;
    }
  }

  filterOffersByType(type: string): void {
    // ✅ Fonctionnalité Visiteur : Filtrage des offres
    this.selectedOfferType = type;
    console.log('✅ Filtre offre sélectionné:', type);
    
    // Application du filtre
    if(type !== 'all') {
      this.offers = this.offers.filter(offer => offer.type === type);
    } else {
      // Recharger toutes les offres
      this.loadOffers();
    }
  }

  addToFavorite(item: any): void {
    // ✅ Fonctionnalité Client : Ajouter aux favoris
    if(!this.isAuthenticated) {
      this.showToast('⚠️ Veuillez vous connecter pour ajouter aux favoris', 'warning');
      this.router.navigate(['/connexion']);
      return;
    }

    // Simulation backend (les méthodes manquantes seront ajoutées dans les services ultérieurement)
    console.log('✅ Ajouté aux favoris:', item);
    this.showToast('✅ Élément ajouté à votre liste de favoris', 'success');
  }

  getStars(rating?: number): number[] {
    const safeRating = rating ?? 0;
    return Array(Math.floor(safeRating)).fill(0);
  }

  scrollToTop(): void {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  // ✅ Charger les destinations dynamiquement depuis le backend
  private loadDestinations(): void {
    // Pour l'instant utilisation des données statiques (méthode à implémenter dans LocationService)
    console.warn('⚠️ Utilisation des destinations statiques');
  }

  // ✅ Charger les offres promotionnelles
  private loadOffers(): void {
    // Pour l'instant utilisation des données statiques (méthode à implémenter dans ReservationService)
    console.warn('⚠️ Utilisation des offres statiques');
  }

  // ✅ Mettre à jour la visibilité des catégories selon le rôle utilisateur
  private updateCategoriesVisibility(): void {

    // ✅ Filtrer les cartes parcours utilisateur
    this.journeyCards = this.journeyCards.filter(card => {
      if(card.role === 'client') {
        // Afficher seulement si utilisateur connecté ET c'est un client
        return this.isAuthenticated && this.userRole === 'client';
      }
      // Tout le reste est public
      return true;
    });
  }

  // ✅ Affichage des notifications toast
  private showToast(message: string, type: 'success' | 'warning' | 'danger' | 'info'): void {
    const toastContainer = document.querySelector('.toast-container');
    if(toastContainer) {
      const toast = document.createElement('div');
      toast.className = `toast align-items-center text-bg-${type} border-0 show`;
      toast.innerHTML = `
        <div class="d-flex">
          <div class="toast-body">${message}</div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>
      `;
      toastContainer.appendChild(toast);
      
      setTimeout(() => toast.remove(), 4000);
    }
  }
}