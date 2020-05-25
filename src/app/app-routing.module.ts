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



const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'home', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'settings/employees', component: EmployeesComponent},
  {path: 'month', component: MonthviewComponent},
  {path: 'subscription', component: SubscriptionComponent},
  {path: 'test', component: TestingComponent},
  {path: 'store/setup', component: StoreSetupComponent},
  {path: 'stripe', component: SepaPaymentComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
