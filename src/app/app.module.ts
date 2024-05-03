// app.module.ts

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import {SlickCarouselModule} from "ngx-slick-carousel";
import {AdminModule} from "./admin/admin.module";
import {UserModule} from "./user/user.module";


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    AdminModule,
    UserModule,
      FormsModule,
      MatSlideToggleModule,
      SlickCarouselModule

  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
