import { Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { DashboardLayoutComponent } from './dashboard-layout/dashboard-layout.component';
import { HotelManagerLayoutComponent } from './hotel-manager-layout/hotel-manager-layout.component';
import { AgencyManagerLayoutComponent } from './agency-manager-layout/agency-manager-layout.component';
import { ClientSpaceLayoutComponent } from './client-space-layout/client-space-layout.component';

// Dashboard components
import { DashboardIndexComponent } from './Pages/Dashboard/dashboard-index/dashboard-index.component';
import { HotelManagerDashboardComponent } from './Pages/Dashboard/hotel-manager-dashboard/hotel-manager-dashboard.component';
import { HotelChambresManagementComponent } from './Pages/Dashboard/hotel-manager-dashboard/hotel-chambres-management.component';
import { AgencyManagerDashboardComponent } from './Pages/Dashboard/agency-manager-dashboard/agency-manager-dashboard.component';
import { AgencyVoituresManagementComponent } from './Pages/Dashboard/agency-manager-dashboard/agency-voitures-management.component';
import { AccountSettingsComponent } from './Pages/Dashboard/account-settings/account-settings.component';
import { AccountSettingsPassChangeComponent } from './Pages/Dashboard/account-settings-pass-change/account-settings-pass-change.component';
import { AddPropertyComponent } from './Pages/Dashboard/add-property/add-property.component';
import { FavouritesComponent } from './Pages/Dashboard/favourites/favourites.component';
import { MembershipComponent } from './Pages/Dashboard/membership/membership.component';
import { MessageComponent } from './Pages/Dashboard/message/message.component';
import { LocationsComponent } from './Pages/Dashboard/locations/locations.component';
import { ProfileComponent } from './Pages/Dashboard/profile/profile.component';
import { PropertiesListComponent } from './Pages/Dashboard/properties-list/properties-list.component';
import { ReviewComponent } from './Pages/Dashboard/review/review.component';
import { SavedSearchComponent } from './Pages/Dashboard/saved-search/saved-search.component';
import { AddAccountComponent } from './Pages/Dashboard/add-account/add-account.component';
import { EspaceClientComponent } from './Pages/Dashboard/client-space/espace-client.component';
import { ZoneFicheComponent } from './Pages/Dashboard/zone-fiche/zone-fiche.component';
import { FacturationComponent } from './Pages/Dashboard/facturation/facturation.component';

export const routes: Routes = [

  // =========================
  // PUBLIC LAYOUT
  // =========================
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./layout/layout.route').then((mod) => mod.MP_ROUTES),
  },

  // =========================
  // DASHBOARD HOME
  // =========================
  {
    path: 'tableau-de-bord',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardIndexComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'dashboard-index',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardIndexComponent, outlet: 'dashboard' }
    ],
  },

  // =========================
  // DASHBOARD HOTEL MANAGER
  // =========================
  {
    path: 'hotel-manager',
    component: HotelManagerLayoutComponent,
    children: [
      { path: '', component: HotelManagerDashboardComponent },
      { path: 'gestion-hotels-chambres', component: HotelChambresManagementComponent },
      { path: 'facturation', component: FacturationComponent }
    ],
  },

  // =========================
  // DASHBOARD AGENCE MANAGER
  // =========================
  {
    path: 'agency-manager',
    component: AgencyManagerLayoutComponent,
    children: [
      { path: '', component: AgencyManagerDashboardComponent },
      { path: 'gestion-agences-voitures', component: AgencyVoituresManagementComponent },
      { path: 'facturation', component: FacturationComponent }
    ],
  },

  
 
  // =========================
  // Liste des Agences
  // =========================
  {
    path: 'account-settings',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: AccountSettingsComponent, outlet: 'dashboard' }
    ],
  },

   {
    path: 'agences-voitures',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: AccountSettingsComponent, outlet: 'dashboard' }
    ],
  },


  // =========================
  // FACTURATION
  // =========================
  {
    path: 'facturation',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: FacturationComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'account-settings-pass-change',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: AccountSettingsPassChangeComponent, outlet: 'dashboard' }
    ],
  },

  // =========================
  // Fiche HÔTEL
  // =========================
  {
    path: 'fiche-hotel',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: AddPropertyComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'add-property',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: AddPropertyComponent, outlet: 'dashboard' }
    ],
  },

   // ======================
   // Fiche AGENCE 
   // ======================
   {
     path: 'fiche-agence',
     component: DashboardLayoutComponent,
     children: [
       { path: '', component: AddAccountComponent, outlet: 'dashboard' }
     ],
   },

   {
     path: 'add-account',
     component: DashboardLayoutComponent,
     children: [
       { path: '', component: AddAccountComponent, outlet: 'dashboard' }
     ],
   },

   // ======================
   // Fiche ZONE 
   // ======================
   {
     path: 'fiche-zone',
     component: DashboardLayoutComponent,
     children: [
       { path: '', component: ZoneFicheComponent, outlet: 'dashboard' }
     ],
   },

   // =========================
   //       ESPACE CLIENT
   // =========================
   {
     path: 'espace-client',
     component: ClientSpaceLayoutComponent,
     children: [
        { path: '', component: EspaceClientComponent }
     ],
   },
   {
     path: 'mes-reservations',
     component: ClientSpaceLayoutComponent,
     children: [
        { path: '', component: EspaceClientComponent }
     ],
   },
   {
     path: 'mes-locations',
     component: ClientSpaceLayoutComponent,
     children: [
        { path: '', component: EspaceClientComponent }
     ],
   },
   {
     path: 'mes-factures',
     component: ClientSpaceLayoutComponent,
     children: [
        { path: '', component: EspaceClientComponent }
     ],
   },
   {
     path: 'mes-avis',
     component: ClientSpaceLayoutComponent,
     children: [
        { path: '', component: EspaceClientComponent }
     ],
   },
   {
     path: 'mes-favoris',
     component: ClientSpaceLayoutComponent,
     children: [
        { path: '', component: EspaceClientComponent }
     ],
   },
   {
     path: 'mon-espace',
     component: ClientSpaceLayoutComponent,
     children: [
        { path: '', component: EspaceClientComponent }
     ],
   },
   {
     path: 'mon-compte',
     component: ClientSpaceLayoutComponent,
     children: [
        { path: '', component: EspaceClientComponent }
     ],
   },

   // =========================
   //       Favoris
   // =========================
   {
     path: 'wishlist',
     component: LayoutComponent,
     children: [
       { path: '', component: FavouritesComponent }
     ],
   },

   {
     path: 'favourites',
     component: LayoutComponent,
     children: [
       { path: '', component: FavouritesComponent }
     ],
   },

  // =========================
  // UTILISATEURS
  // =========================
  {
    path: 'utilisateurs',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: MembershipComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'membership',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: MembershipComponent, outlet: 'dashboard' }
    ],
  },

  // ===================================
  // MESSAGES / RESERVATIONS / LOCATIONS
  // ===================================
  {
    path: 'reservations',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: MessageComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'locations',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: LocationsComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'message',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: MessageComponent, outlet: 'dashboard' }
    ],
  },

  // =========================
  // Peofile
  // =========================
  {
    path: 'profil-admin',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: ProfileComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'profile',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: ProfileComponent, outlet: 'dashboard' }
    ],
  },

  // =========================
  // Liste Hotels
  // =========================
  {
    path: 'hotels',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: PropertiesListComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'properties-list',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: PropertiesListComponent, outlet: 'dashboard' }
    ],
  },

  // =========================
  // ZONES TOURISTIQUES
  // =========================
  {
    path: 'zones-touristiques',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: SavedSearchComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'saved-search',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: SavedSearchComponent, outlet: 'dashboard' }
    ],
  },

  // =========================
  //          Avis
  // =========================
  {
    path: 'avis-commentaires',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: ReviewComponent, outlet: 'dashboard' }
    ],
  },

  {
    path: 'review',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: ReviewComponent, outlet: 'dashboard' }
    ],
  },
];