import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule, MatNativeDateModule,  } from '@angular/material'
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgxMatNativeDateModule, NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { MonthviewComponent } from './monthview/monthview.component';
import { TestingComponent } from './testing/testing.component';
import { StoreSetupComponent } from './store-setup/store-setup.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { EmployeesComponent } from './employees/employees.component';
import * as Hammer from 'hammerjs';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SepaPaymentComponent } from './sepa-payment/sepa-payment.component';
import { FirstpageComponent } from './firstpage/firstpage.component';
import { HomelistingComponent } from './homelisting/homelisting.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

import { FacebookModule } from 'ngx-facebook';
import { PrivacyComponent } from './privacy/privacy.component';
import { LoadingpageComponent } from './loadingpage/loadingpage.component';
import { RegEmployeeComponent } from './reg-employee/reg-employee.component';
import { TableComponent } from './table/table.component';
import { NotificPageComponent } from './notific-page/notific-page.component';
import { TermofuseComponent } from './termofuse/termofuse.component';

import { BookingTemplComponent } from './booking-templ/booking-templ.component';
import { HowtouseComponent } from './howtouse/howtouse.component';

import { BooktestComponent } from './booktest/booktest.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { GoogleDeepLinksComponent } from './google-deep-links/google-deep-links.component';

import { CreateStoreComponent } from './create-store/create-store.component';



import { TheGreenFactoryComponent } from './the-green-factory/the-green-factory.component';
import { PaymentSuccessComponent } from './payment-success/payment-success.component';
import { Page404Component } from './page404/page404.component';
import { DlfComponent } from './dlf/dlf.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WelcomeDownloadComponent } from './welcome-download/welcome-download.component';
import { AnticaBarbariaNapoletanaComponent } from './antica-barbaria-napoletana/antica-barbaria-napoletana.component';
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
import { CentriEsteticiComponent } from './centri-estetici/centri-estetici.component';
import { CentroEsteticoComponent } from './centro-estetico/centro-estetico.component';
import { FisioterapistiComponent } from './fisioterapisti/fisioterapisti.component';
import { FisioterapistaComponent } from './fisioterapista/fisioterapista.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RegisterComponent,
    MonthviewComponent,
    TestingComponent,
    StoreSetupComponent,
    LandingComponent,
    LoginComponent,
    SettingsComponent,
    EmployeesComponent,
    SubscriptionComponent,
    SepaPaymentComponent,
    
    FirstpageComponent,
    HomelistingComponent,
    FooterComponent,
    HeaderComponent,
    PrivacyComponent,
    LoadingpageComponent,
    RegEmployeeComponent,
    TableComponent,
    NotificPageComponent,
    TermofuseComponent,
    
    BookingTemplComponent,
    HowtouseComponent,
    
    BooktestComponent,
    MyBookingsComponent,
    GoogleDeepLinksComponent,
    
    CreateStoreComponent,
    
    TheGreenFactoryComponent,
    PaymentSuccessComponent,
    Page404Component,
    DlfComponent,
    CategoryListingComponent,
    WelcomeDownloadComponent,
    AnticaBarbariaNapoletanaComponent,
    GetappComponent,
    ClientPageComponent,
    DisplayCalComponent,
    OculistaComponent,
    NoBookableComponent,
    CampiDaCalcioComponent,
    CampoDaCalcioComponent,
    StudiDiUnghieComponent,
    StudioDiUnghieComponent,
    CampiDaTennisComponent,
    CampoDaTennisComponent,
    CentriEsteticiComponent,
    CentroEsteticoComponent,
    FisioterapistiComponent,
    FisioterapistaComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    ScrollingModule,
    MatDatepickerModule,
    NgxChartsModule,
    NgxMatNativeDateModule, 
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FacebookModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  exports:[
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
