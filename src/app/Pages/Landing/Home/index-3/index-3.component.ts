import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';

import { Navbar3Component } from '../../../../layout/navbar-3/navbar-3.component';
import { Footer2Component } from '../../../../layout/footer-2/footer-2.component';
import { SidenavComponent } from '../../../../components/sidenav/sidenav.component';

interface SelectOption {
  value: string;
  label: string;
}

interface CategoryCard {
  link: string;
  icon: string;
  label: string;
}

interface JourneyCard {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  link: string;
}

interface FeaturedCard {
  badge: string;
  title: string;
  location: string;
  details: string[];
  cta: string;
  link: string;
  image: string;
}

interface OfferCard {
  badge: string;
  image: string;
  title: string;
  location: string;
  details: string[];
  price: string;
  link: string;
}

interface BenefitCard {
  icon: string;
  title: string;
  description: string;
}

interface RegionPin {
  country: string;
  address: string;
  flag: string;
}

interface RegionGroup {
  title: string;
  countries: string[];
}

interface Testimonial {
  name: string;
  location: string;
  image: string;
  message: string;
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
export class Index3Component {

  searchModel = {
    service: 'hotel',
    destination: 'hammamet',
    period: 'weekend'
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
    { value: 'djerba', label: 'Djerba' },
    { value: 'tozeur', label: 'Tozeur' }
  ];

  periodOptions: SelectOption[] = [
    { value: 'weekend', label: 'Ce week-end' },
    { value: 'next-week', label: 'La semaine prochaine' },
    { value: 'summer', label: 'Vacances d’été' }
  ];

  // ✅ catégories avec fiche agence ajoutée
  categories: CategoryCard[] = [
    { link: '/hotels', icon: 'assets/images/icon/icon_15.svg', label: 'Hôtels & resorts' },
    { link: '/reservations', icon: 'assets/images/icon/icon_16.svg', label: 'Réservations' },
    { link: '/agences-voitures', icon: 'assets/images/icon/icon_17.svg', label: 'Voitures de location' },
    { link: '/fiche-agence', icon: 'assets/images/icon/icon_17.svg', label: 'Fiche agence' }, // ✅ NEW
    { link: '/zones-touristiques', icon: 'assets/images/icon/icon_18.svg', label: 'Zones touristiques' },
    { link: '/avis-commentaires', icon: 'assets/images/icon/icon_19.svg', label: 'Avis voyageurs' },
    { link: '/wishlist', icon: 'assets/images/icon/icon_20.svg', label: 'Wishlist' },
    { link: '/utilisateurs', icon: 'assets/images/icon/icon_21.svg', label: 'Gestion utilisateurs' },
    { link: '/facturation', icon: 'assets/images/icon/icon_22.svg', label: 'Facturation' }
  ];

  journeyCards: JourneyCard[] = [
    {
      icon: 'assets/images/icon/icon_23.svg',
      title: 'Réserver un hôtel',
      description: 'Consultez les hôtels disponibles',
      buttonText: 'Voir les hôtels',
      link: '/hotels'
    },
    {
      icon: 'assets/images/icon/icon_24.svg',
      title: 'Louer une voiture',
      description: 'Comparez les agences de location',
      buttonText: 'Voir les agences',
      link: '/agences-voitures'
    },
    {
      icon: 'assets/images/icon/icon_25.svg',
      title: 'Découvrir la destination',
      description: 'Explorez les zones touristiques',
      buttonText: 'Explorer',
      link: '/zones-touristiques'
    }
  ];

  featuredFocus: FeaturedCard = {
    badge: 'SÉJOUR PREMIUM',
    title: 'Hôtel Riviera & Spa',
    location: 'Hammamet, Tunisie',
    details: ['42 chambres', 'Spa', 'Piscine', '4.8/5'],
    cta: 'Ouvrir la fiche',
    link: '/fiche-hotel',
    image: 'assets/images/listing/img_12.jpg'
  };

  // ✅ includes fiche agence
  featuredHighlights: FeaturedCard[] = [
    {
      badge: 'AGENCE AUTO',
      title: 'CarGo Tunisia',
      location: 'Tunis',
      details: ['18 voitures', 'Service rapide'],
      cta: 'Fiche agence',
      link: '/fiche-agence', // ✅ important
      image: 'assets/images/listing/img_10.jpg'
    },
    {
      badge: 'ZONE TOURISTIQUE',
      title: 'Désert & Oasis',
      location: 'Tozeur',
      details: ['Circuits aventure'],
      cta: 'Voir zone',
      link: '/zones-touristiques',
      image: 'assets/images/listing/img_11.jpg'
    }
  ];

  offers: OfferCard[] = [
    {
      badge: 'HÔTEL',
      image: 'assets/images/listing/img_13.jpg',
      title: 'Suite vue mer',
      location: 'Sousse',
      details: ['Petit déjeuner'],
      price: '145 EUR',
      link: '/reservations'
    }
  ];

  platformBenefits: BenefitCard[] = [
    {
      icon: 'assets/images/icon/icon_26.svg',
      title: 'Gestion centralisée',
      description: 'Tout en un seul dashboard'
    }
  ];

  statistics = [
    { value: '120+', label: 'Hôtels' },
    { value: '48+', label: 'Agences' }
  ];

  mapPins: RegionPin[] = [
    {
      country: 'Nord',
      address: 'Tunis',
      flag: 'assets/images/logo/flag_01.png'
    }
  ];

  regionLists: RegionGroup[] = [
    { title: 'Séjours mer', countries: ['Hammamet', 'Sousse'] }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Yasmine',
      location: 'Tunis',
      image: 'assets/images/media/img_01.jpg',
      message: 'Très bonne expérience'
    }
  ];

  heroMarquee = 'Tunis . Hammamet . Sousse . Djerba .';
}
