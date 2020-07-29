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



const routes: Routes = [
  {path: '', component: FirstpageComponent, },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'settings/employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  {path: 'home/ricerca', component: HomelistingComponent,},
  {path: 'business', component: LandingComponent, },
  {path: 'register', component: RegisterComponent},
  {path: 'booking', component: BookingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'loading', component: LoadingpageComponent},
  {path: 'register/employee', component: RegEmployeeComponent},
  {path: 'data', component: TableComponent},
  {path: 'notifications', component: NotificPageComponent},
  {path: 'termofuse', component: TermofuseComponent},
  {path: 'aparrucchieri', component: AparucchieriComponent},
  {path: 'nitrogym', component: NitrogymComponent},
  {path: 'istruzioni', component: HowtouseComponent},
  {path: 'book-test', component: BooktestComponent},
  // {path: 'booking/templ', component: BookingTemplComponent},
  // {path: 'month', component: MonthviewComponent},
  // {path: 'subscription', component: SubscriptionComponent},
  //da eliminare
  // {path: 'test', component: TestingComponent},
  // {path: 'store/setup', component: StoreSetupComponent, canActivate: [AuthGuard]},
  //da eliminare
  // {path: 'stripe', component: SepaPaymentComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
