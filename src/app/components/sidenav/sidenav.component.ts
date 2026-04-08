import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-sidenav',
    imports: [RouterLink, CommonModule],
    templateUrl: './sidenav.component.html'
})
export class SidenavComponent {
  listings = [
    {
      tag: 'HOTEL',
      imgUrl: 'assets/images/listing/img_69.jpg',
      price: '180 EUR / nuit',
      address: 'Hammamet, Tunisie',
      route: '/hotels',
      title: 'Hôtel Riviera & Spa',
    },
    {
      tag: 'VOITURE',
      imgUrl: 'assets/images/listing/img_70.jpg',
      price: '65 EUR / jour',
      address: 'Aéroport Tunis-Carthage',
      route: '/agences-voitures',
      title: 'SUV automatique - catégorie premium',
    },
    {
      tag: 'ZONE',
      imgUrl: 'assets/images/listing/img_71.jpg',
      price: 'Circuit 3 jours',
      address: 'Tozeur & désert',
      route: '/zones-touristiques',
      title: 'Découverte oasis, ksour et désert',
    },
    {
      tag: 'ADMIN',
      imgUrl: 'assets/images/listing/img_72.jpg',
      price: 'Back-office',
      address: 'Suivi en temps réel',
      route: '/tableau-de-bord',
      title: 'Pilotage des réservations et factures',
    }
  ];
}
