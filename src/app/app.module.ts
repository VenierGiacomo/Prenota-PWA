import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule, MatNativeDateModule,  } from '@angular/material'
import { NgxMatNativeDateModule, NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
import * as Hammer from 'hammerjs'

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
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    MatDatepickerModule,
    NgxMatNativeDateModule, 
    MatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMatDatetimePickerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule 
  ],
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
