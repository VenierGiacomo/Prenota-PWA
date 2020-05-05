import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { MonthviewComponent } from '../monthview/monthview.component';



@NgModule({
  declarations: [ AppComponent,MonthviewComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
