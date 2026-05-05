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
      price: '200 DT / nuit',
      address: 'Hammamet, Tunisie',
      route: '/hotels',
      title: 'Hôtel Riviera & Spa',
    },
    {
      tag: 'VOITURE',
      imgUrl: 'assets/images/listing/img_70.jpg',
      price: '300 DT / jour',
      address: 'Tunis, Tunisie',
      route: '/agences-voitures',
      title: 'BMW Série 3 - Location de voiture',
    },
    {
      tag: 'ZONE',
      imgUrl: 'assets/images/listing/img_71.jpg',
      address: 'El Jem, Mahdia, Tunisie',
      route: '/zones-touristiques',
      title: 'Découverte de la zone touristique El Jem',
    },
    
  ];
}
