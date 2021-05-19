import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployeesComponent } from './employees/employees.component';
import { AuthGuard } from './services/auth.guard';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { HomelistingComponent } from './homelisting/homelisting.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { RegEmployeeComponent } from './reg-employee/reg-employee.component';
import { TestingComponent } from './testing/testing.component';
import { TableComponent } from './table/table.component';
import { NotificPageComponent } from './notific-page/notific-page.component';
import { TermofuseComponent } from './termofuse/termofuse.component';
import { BookingTemplComponent } from './booking-templ/booking-templ.component';
import { HowtouseComponent } from './howtouse/howtouse.component';
import { BooktestComponent } from './booktest/booktest.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { CreateStoreComponent } from './create-store/create-store.component';

import { SubscriptionComponent } from './subscription/subscription.component';
import { Page404Component } from './page404/page404.component';

import { CategoryListingComponent } from './category-listing/category-listing.component';
import { WelcomeDownloadComponent } from './welcome-download/welcome-download.component';
import { GetappComponent } from './getapp/getapp.component';
import { ClientPageComponent } from './client-page/client-page.component';
import { DisplayCalComponent } from './display-cal/display-cal.component';
import { OculistaComponent } from './oculista/oculista.component';
import { NoBookableComponent } from './no-bookable/no-bookable.component';
import { CampiDaCalcioComponent } from './campi-da-calcio/campi-da-calcio.component';
import { CampoDaCalcioComponent } from './campo-da-calcio/campo-da-calcio.component';
import { StudiDiUnghieComponent } from './studi-di-unghie/studi-di-unghie.component';
import { StudioDiUnghieComponent } from './studio-di-unghie/studio-di-unghie.component';
import { CampiDaTennisComponent } from './campi-da-tennis/campi-da-tennis.component';
import { CampoDaTennisComponent } from './campo-da-tennis/campo-da-tennis.component';
import { CentroEsteticoComponent } from './centro-estetico/centro-estetico.component';
import { CentriEsteticiComponent } from './centri-estetici/centri-estetici.component';
import { FisioterapistiComponent } from './fisioterapisti/fisioterapisti.component';
import { FisioterapistaComponent } from './fisioterapista/fisioterapista.component';



const routes: Routes = [
  {path: '', component: FirstpageComponent, },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'settings/employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: 'home/ricerca', component: HomelistingComponent,},
  {path: 'business', component: LandingComponent, },
  {path: 'register', component: RegisterComponent},
  {path: 'kajsndvkjbnslvjbnsojdbncjo', component: CreateStoreComponent},
  {path: 'booking', redirectTo: 'appuntamento/Wellness_Clinic' },
  {path: 'login', component: LoginComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'loading', component: LoadingpageComponent},
  {path: 'register/employee', component: RegEmployeeComponent},
  {path: 'data', component: TableComponent},
  {path: 'notifications', component: NotificPageComponent},
  {path: 'termofuse', component: TermofuseComponent},
  {path: 'aparrucchieri', redirectTo: 'appuntamento/Aparrucchieri'},
  {path: 'cmassaggi', redirectTo: 'appuntamento/Cmassaggi', pathMatch:'prefix'},
  // {path: 'aquaesale', component: AquaesaleComponent},
  
  {path: 'tennis_club_grignano', redirectTo: 'appuntamento/Tennis_Grignano'},
  // {path: 'nitrogym', component: NitrogymComponent},
  {path: 'i_miei_appuntamenti', component: MyBookingsComponent},
  {path: 'istruzioni', component: HowtouseComponent},
  {path: 'book-test', component: BooktestComponent},
  {path: 'salonerocco', redirectTo: 'appuntamento/salone_rocco'},
  {path: 'appuntamento/:slug', component: BookingTemplComponent},
  // {path: 'month', component: MonthviewComponent},
  {path: 'subscription', component: SubscriptionComponent},
  //da eliminare
  {path: 'test', component: TestingComponent},  
  {path: 'app', component: GetappComponent},  
  // {path: 'store/setup', component: StoreSetupComponent, canActivate: [AuthGuard]},
  //da eliminare
  {path: 'register/:first_name/:last_name/:email/:phone/:store', component: WelcomeDownloadComponent, },
  // {path: 'stripe', component: SepaPaymentComponent, canActivate: [AuthGuard]},
  // {path: 'payment_success', component: PaymentSuccessComponent},
 
  {path: 'only/calendar', component: DisplayCalComponent},

  {path: 'oculistatrieste', redirectTo: 'oculista/trieste'},
  {path: 'oculista/trieste', component: OculistaComponent},
  {path: 'oculista/trieste/:rnd/:indx', component: NoBookableComponent},

  {path: 'campi_da_calcetto/trieste', component: CampiDaCalcioComponent},
  {path: 'campi_da_calcetto/trieste/:rnd/:indx', component: CampoDaCalcioComponent},

  {path: 'unghie/trieste', component: StudiDiUnghieComponent},
  {path: 'unghie/trieste/:rnd/:indx', component: StudioDiUnghieComponent},

  {path: 'campi_da_tennis/trieste', component: CampiDaTennisComponent},
  {path: 'campi_da_tennis/trieste/:rnd/:indx', component: CampoDaTennisComponent},

  {path: 'estetista/trieste', component: CentriEsteticiComponent},
  {path: 'estetista/trieste/:rnd/:indx', component: CentroEsteticoComponent},

  {path: 'fisioterapista/trieste', component: FisioterapistiComponent},
  {path: 'fisioterapista/trieste/:rnd/:indx', component: FisioterapistaComponent},

  {path: 'home/ricerca/:slug', component: CategoryListingComponent},
  {path: 'clientpage/:client_id/:phone:/:client_name/:email', component: ClientPageComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
