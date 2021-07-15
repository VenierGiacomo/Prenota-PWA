import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../../app.component';
import { MonthviewComponent } from '../../components/monthview/monthview.component';
import { AppModule } from '../../app.module';



@NgModule({
  // declarations: [ AppComponent,MonthviewComponent],
  imports: [
    AppModule,
    CommonModule
  ]
})
export class HomeModule { }
