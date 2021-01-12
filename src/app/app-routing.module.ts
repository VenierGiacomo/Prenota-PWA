import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployeesComponent } from './employees/employees.component';
import { AuthGuard } from './services/auth.guard';
import { BookingComponent } from './booking/booking.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { HomelistingComponent } from './homelisting/homelisting.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { RegEmployeeComponent } from './reg-employee/reg-employee.component';
import { TestingComponent } from './testing/testing.component';
import { TableComponent } from './table/table.component';
import { NotificPageComponent } from './notific-page/notific-page.component';
import { TermofuseComponent } from './termofuse/termofuse.component';
import { AparucchieriComponent } from './aparucchieri/aparucchieri.component';
import { BookingTemplComponent } from './booking-templ/booking-templ.component';
import { HowtouseComponent } from './howtouse/howtouse.component';
import { NitrogymComponent } from './nitrogym/nitrogym.component';
import { BooktestComponent } from './booktest/booktest.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { GoogleDeepLinksComponent } from './google-deep-links/google-deep-links.component';
import { CmassaggiComponent } from './cmassaggi/cmassaggi.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { SaloneRoccoComponent } from './salone-rocco/salone-rocco.component';
import { TennisClubGrignanoComponent } from './tennis-club-grignano/tennis-club-grignano.component';
import { AquaesaleComponent } from './aquaesale/aquaesale.component';
import { TheGreenFactoryComponent } from './the-green-factory/the-green-factory.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SepaPaymentComponent } from './sepa-payment/sepa-payment.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { Page404Component } from './page404/page404.component';
import { DlfComponent } from './dlf/dlf.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { CovidCounterComponent } from './covid-counter/covid-counter.component';



const routes: Routes = [
  {path: '', component: FirstpageComponent, },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'settings/employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: 'home/ricerca', component: HomelistingComponent,},
  {path: 'business', component: LandingComponent, },
  {path: 'register', component: RegisterComponent},
  {path: 'kajsndvkjbnslvjbnsojdbncjo', component: CreateStoreComponent},
  {path: 'booking', component: BookingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'loading', component: LoadingpageComponent},
  {path: 'register/employee', component: RegEmployeeComponent},
  {path: 'data', component: TableComponent},
  {path: 'notifications', component: NotificPageComponent},
  {path: 'termofuse', component: TermofuseComponent},
  {path: 'aparrucchieri', component: AparucchieriComponent},
  {path: 'cmassaggi', component: CmassaggiComponent},
  {path: 'aquaesale', component: AquaesaleComponent},
  {path: 'thegreenfactory', component: TheGreenFactoryComponent},
  {path: 'tennis_club_grignano', component: TennisClubGrignanoComponent},
  // {path: 'nitrogym', component: NitrogymComponent},
  {path: 'i_miei_appuntamenti', component: MyBookingsComponent},
  {path: 'istruzioni', component: HowtouseComponent},
  {path: 'book-test', component: BooktestComponent},
  {path: 'salonerocco', component: SaloneRoccoComponent},
  // {path: 'booking/templ', component: BookingTemplComponent},
  // {path: 'month', component: MonthviewComponent},
  {path: 'subscription', component: SubscriptionComponent},
  //da eliminare
  // {path: 'test', component: TestingComponent},
  // {path: '.well-known/assetlinks.json', component: GoogleDeepLinksComponent},
  // {path: 'store/setup', component: StoreSetupComponent, canActivate: [AuthGuard]},
  //da eliminare
  {path: 'stripe', component: SepaPaymentComponent, canActivate: [AuthGuard]},
  {path: 'payment_success', component: PaymentSuccessComponent},
  {path: 'dopolavoroferroviario', component: DlfComponent},
  {path: 'home/ricerca/parrucchieri', component: CategoryListingComponent},
  {path: 'vacino/covid', component: CovidCounterComponent},
  {path: '**', component: Page404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
