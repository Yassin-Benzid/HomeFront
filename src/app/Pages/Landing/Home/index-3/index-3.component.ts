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
  imports: [Navbar3Component, Footer2Component, CommonModule, FormsModule, RouterLink, NgSelectModule, SidenavComponent],
  templateUrl: './index-3.component.html'
})
export class Index3Component {
  // TODO backend: binder ce modèle au moteur de recherche global (GET /search ou POST /search).
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

  categories: CategoryCard[] = [
    { link: '/hotels', icon: 'assets/images/icon/icon_15.svg', label: 'Hôtels & resorts' },
    { link: '/reservations', icon: 'assets/images/icon/icon_16.svg', label: 'Réservations' },
    { link: '/agences-voitures', icon: 'assets/images/icon/icon_17.svg', label: 'Voitures de location' },
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
      description: 'Consultez les hôtels, les catégories de chambres et la disponibilité en temps réel.',
      buttonText: 'Voir les hôtels',
      link: '/hotels'
    },
    {
      icon: 'assets/images/icon/icon_24.svg',
      title: 'Louer une voiture',
      description: 'Comparez les agences, les flottes et les véhicules disponibles selon la destination.',
      buttonText: 'Voir les agences',
      link: '/agences-voitures'
    },
    {
      icon: 'assets/images/icon/icon_25.svg',
      title: 'Découvrir la destination',
      description: 'Mettez en avant les zones touristiques, activités, circuits et lieux à visiter.',
      buttonText: 'Explorer les zones',
      link: '/zones-touristiques'
    }
  ];

  featuredFocus: FeaturedCard = {
    badge: 'SÉJOUR PREMIUM',
    title: 'Hôtel Riviera & Spa',
    location: 'Hammamet, Tunisie',
    details: ['42 chambres disponibles', 'Navette aéroport', 'Spa & piscine', 'Note 4.8/5'],
    cta: 'Ouvrir la fiche',
    link: '/fiche-hotel',
    image: 'assets/images/listing/img_12.jpg'
  };

  featuredHighlights: FeaturedCard[] = [
    {
      badge: 'LOCATION AUTO',
      title: 'Agence CarGo Tunisia',
      location: 'Tunis-Carthage',
      details: ['18 voitures disponibles', 'Retrait rapide'],
      cta: 'Voir l’agence',
      link: '/agences-voitures',
      image: 'assets/images/listing/img_10.jpg'
    },
    {
      badge: 'ZONE TOURISTIQUE',
      title: 'Circuit désert & oasis',
      location: 'Tozeur, Douz, Ksar Ghilane',
      details: ['3 itinéraires', '12 points d’intérêt'],
      cta: 'Voir la zone',
      link: '/zones-touristiques',
      image: 'assets/images/listing/img_11.jpg'
    }
  ];

  // TODO backend: remplacer ce tableau par la réponse de l'API homepage (offres, hôtels, voitures, zones).
  offers: OfferCard[] = [
    {
      badge: 'HÔTEL',
      image: 'assets/images/listing/img_13.jpg',
      title: 'Suite vue mer - Sousse Palace',
      location: 'Sousse, Tunisie',
      details: ['Petit-déjeuner inclus', '2 adultes', 'Annulation flexible'],
      price: '145 EUR / nuit',
      link: '/reservations'
    },
    {
      badge: 'VOITURE',
      image: 'assets/images/listing/img_14.jpg',
      title: 'SUV automatique - catégorie confort',
      location: 'Djerba, Tunisie',
      details: ['5 places', 'Kilométrage illimité', 'Retrait aéroport'],
      price: '72 EUR / jour',
      link: '/agences-voitures'
    },
    {
      badge: 'ZONE',
      image: 'assets/images/listing/img_15.jpg',
      title: 'Vieille médina & artisanat',
      location: 'Tunis, Tunisie',
      details: ['Guide disponible', '4 circuits', 'Culture & patrimoine'],
      price: 'Zone mise en avant',
      link: '/zones-touristiques'
    },
    {
      badge: 'HÔTEL',
      image: 'assets/images/listing/img_16.jpg',
      title: 'Resort familial - Djerba Lagoon',
      location: 'Djerba, Tunisie',
      details: ['28 chambres libres', 'Club enfants', 'Front de mer'],
      price: '190 EUR / nuit',
      link: '/hotels'
    },
    {
      badge: 'VOITURE',
      image: 'assets/images/listing/img_14.jpg',
      title: 'Citadine économique',
      location: 'Hammamet, Tunisie',
      details: ['Boîte manuelle', 'Faible consommation', 'Assurance incluse'],
      price: '38 EUR / jour',
      link: '/reservations'
    },
    {
      badge: 'ZONE',
      image: 'assets/images/listing/img_15.jpg',
      title: 'Escapade Cap Bon',
      location: 'Nabeul & Hammamet',
      details: ['Plages', 'Gastronomie', 'Bien-être'],
      price: 'Destination tendance',
      link: '/zones-touristiques'
    }
  ];

  platformBenefits: BenefitCard[] = [
    {
      icon: 'assets/images/icon/icon_26.svg',
      title: 'Gestion centralisée',
      description: 'Pilotez hôtels, chambres, voitures et zones touristiques depuis un seul dashboard.'
    },
    {
      icon: 'assets/images/icon/icon_27.svg',
      title: 'Réservations structurées',
      description: 'Préparez une intégration claire des clients, réservations, paiements et statuts.'
    },
    {
      icon: 'assets/images/icon/icon_28.svg',
      title: 'Base prête pour le backend',
      description: 'Les écrans sont pensés pour brancher facilement les endpoints CRUD et d’authentification.'
    }
  ];

  statistics = [
    { value: '120+', label: 'Hôtels référencés' },
    { value: '48', label: 'Agences partenaires' },
    { value: '320+', label: 'Voitures disponibles' },
    { value: '65', label: 'Zones touristiques' }
  ];

  mapPins: RegionPin[] = [
    {
      country: 'Nord',
      address: 'Tunis, Bizerte, Tabarka et patrimoine culturel',
      flag: 'assets/images/logo/flag_01.png'
    },
    {
      country: 'Sahel',
      address: 'Hammamet, Sousse, Monastir et séjours balnéaires',
      flag: 'assets/images/logo/flag_02.png'
    },
    {
      country: 'Sud',
      address: 'Tozeur, Douz, désert et circuits aventure',
      flag: 'assets/images/logo/flag_03.png'
    }
  ];

  regionLists: RegionGroup[] = [
    { title: 'Séjours mer', countries: ['Hammamet', 'Sousse', 'Monastir', 'Mahdia'] },
    { title: 'Culture & patrimoine', countries: ['Tunis', 'Kairouan', 'El Jem', 'Dougga'] },
    { title: 'Nature & désert', countries: ['Tozeur', 'Douz', 'Matmata', 'Tataouine'] }
  ];

  testimonials: Testimonial[] = [
    {
      name: 'Yasmine Trabelsi',
      location: 'Cliente - Tunis',
      image: 'assets/images/media/img_01.jpg',
      message: 'La réservation de l’hôtel et de la voiture sur un seul parcours rend l’expérience très fluide.'
    },
    {
      name: 'Amine Ben Salem',
      location: 'Gestionnaire hôtel - Sousse',
      image: 'assets/images/media/img_02.jpg',
      message: 'La maquette admin est claire. On visualise bien comment brancher les chambres, les disponibilités et les avis.'
    },
    {
      name: 'Sarra Jlassi',
      location: 'Agence de location - Djerba',
      image: 'assets/images/media/img_03.jpg',
      message: 'Le template met bien en valeur les véhicules, la facturation et les réservations à venir.'
    }
  ];

  heroMarquee = 'Tunis . Hammamet . Sousse . Djerba . Tozeur .';
}
