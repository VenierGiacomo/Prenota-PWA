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
import { HomeComponent } from './views/home/home.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './views/register/register.component';
import { MonthviewComponent } from './components/monthview/monthview.component';
import { TestingComponent } from './views/testing/testing.component';
import { StoreSetupComponent } from './views/store-setup/store-setup.component';
import { LandingComponent } from './views/landing/landing.component';
import { LoginComponent } from './views/login/login.component';
import { SettingsComponent } from './views/settings/settings.component';
import { EmployeesComponent } from './views/employees/employees.component';
import * as Hammer from 'hammerjs';
import { SubscriptionComponent } from './components/subscription/subscription.component';
import { SepaPaymentComponent } from './components/sepa-payment/sepa-payment.component';
import { FirstpageComponent } from './views/firstpage/firstpage.component';
import { HomelistingComponent } from './views/homelisting/homelisting.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

import { FacebookModule } from 'ngx-facebook';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { LoadingpageComponent } from './components/loading/loadingpage.component';
import { RegEmployeeComponent } from './components/reg-employee/reg-employee.component';
import { TableComponent } from './components/table/table.component';
import { NotificPageComponent } from './views/notific-page/notific-page.component';
import { TermofuseComponent } from './views/termofuse/termofuse.component';

import { BookingTemplComponent } from './views/booking-templ/booking-templ.component';
import { HowtouseComponent } from './views/howtouse/howtouse.component';

import { BooktestComponent } from './views/booktest/booktest.component';
import { MyBookingsComponent } from './views/my-bookings/my-bookings.component';
import { GoogleDeepLinksComponent } from './views/google-deep-links/google-deep-links.component';

import { CreateStoreComponent } from './views/create-store/create-store.component';




import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { Page404Component } from './views/page404/page404.component';

import { CategoryListingComponent } from './views/category-listing/category-listing.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { WelcomeDownloadComponent } from './views/welcome-download/welcome-download.component';

import { GetappComponent } from './views/getapp/getapp.component';
import { ClientPageComponent } from './views/client-page/client-page.component';
import { DisplayCalComponent } from './views/display-cal/display-cal.component';
import { OculistaComponent } from './views/oculista/oculista.component';
import { NoBookableComponent } from './views/no-bookable/no-bookable.component';
import { CampiDaCalcioComponent } from './views/campi-da-calcio/campi-da-calcio.component';
import { CampoDaCalcioComponent } from './views/campo-da-calcio/campo-da-calcio.component';
import { StudiDiUnghieComponent } from './views/studi-di-unghie/studi-di-unghie.component';
import { StudioDiUnghieComponent } from './views/studio-di-unghie/studio-di-unghie.component';
import { CampiDaTennisComponent } from './views/campi-da-tennis/campi-da-tennis.component';
import { CampoDaTennisComponent } from './views/campo-da-tennis/campo-da-tennis.component';
import { CentriEsteticiComponent } from './views/centri-estetici/centri-estetici.component';
import { CentroEsteticoComponent } from './views/centro-estetico/centro-estetico.component';
import { FisioterapistiComponent } from './views/fisioterapisti/fisioterapisti.component';
import { FisioterapistaComponent } from './views/fisioterapista/fisioterapista.component';

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
    
  
    PaymentSuccessComponent,
    Page404Component,
    
    CategoryListingComponent,
    WelcomeDownloadComponent,
    
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
