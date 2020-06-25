import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { MonthviewComponent } from './monthview/monthview.component';
import { TestingComponent } from './testing/testing.component';
import { StoreSetupComponent } from './store-setup/store-setup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployeesComponent } from './employees/employees.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SepaPaymentComponent } from './sepa-payment/sepa-payment.component';
import { AuthGuard } from './services/auth.guard';
import { BookingComponent } from './booking/booking.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { HomelistingComponent } from './homelisting/homelisting.component';



const routes: Routes = [
  {path: '', component: FirstpageComponent, },
  {path: 'home/ricerca', component: HomelistingComponent,},
  {path: 'business', component: LandingComponent, },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent},
  {path: 'booking', component: BookingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: 'settings/employees', component: EmployeesComponent, canActivate: [AuthGuard]},
  // {path: 'month', component: MonthviewComponent},
  {path: 'subscription', component: SubscriptionComponent},
  //da eliminare
  {path: 'test', component: TestingComponent},
  {path: 'store/setup', component: StoreSetupComponent, canActivate: [AuthGuard]},
  //da eliminare
  {path: 'stripe', component: SepaPaymentComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
