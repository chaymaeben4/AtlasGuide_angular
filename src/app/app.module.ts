// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { TopActivitiesComponent } from './home/top-activities/top-activities.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SliderComponent } from "./home/slider/slider.component";
import { CategoryComponent } from './home/category/category.component';
import { HttpClientModule } from "@angular/common/http";



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SliderComponent,
    TopActivitiesComponent,
    HeaderComponent,
    FooterComponent,
    CategoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
