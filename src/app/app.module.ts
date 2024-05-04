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
<<<<<<< HEAD

import {SlickCarouselModule} from "ngx-slick-carousel";
import {AdminModule} from "./admin/admin.module";
import {UserModule} from "./user/user.module";
=======
import { CitiesComponent } from './home/cities/cities.component';
import { CallbackComponent } from './home/callback/callback.component';
import { TestimonialComponent } from './home/testimonial/testimonial.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { BodyDetailsComponent } from './activity-details/body-details/body-details.component';
import { DetailsHeaderComponent } from './activity-details/details-header/details-header.component';
import {TopActivitiesComponent} from "./home/top-activities/top-activities.component";
import {CartComponent} from "./Paiement_process/cart_wishlist/cart/cart.component";
// import {SlickCarouselModule} from "ngx-slick-carousel";
import { ActivitesByCityComponent } from './activites-by-city/activites-by-city.component';
import {PaymentResolver} from "./resolvers/payment/payment.resolver";


>>>>>>> payment


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
      MatSlideToggleModule

  ],
  providers: [
    provideAnimationsAsync(),
    PaymentResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
