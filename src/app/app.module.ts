// app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

import { HttpClientModule } from "@angular/common/http";
import {SliderComponent} from "./home/slider/slider.component";
import { FamousPlacesComponent } from './home/famous-places/famous-places.component';
import { LoginComponent } from './supplier/login/login.component';
import { SignUpComponent } from './supplier/sign-up/sign-up.component';
import {PaiementFormComponent} from "./Paiement_process/paiement-form/paiement-form.component";
import {PaiementConfirmationComponent} from "./Paiement_process/paiement-confirmation/paiement-confirmation.component";
import { WishlistComponent } from './Paiement_process/cart_wishlist/wishlist/wishlist.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatIconModule} from "@angular/material/icon";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CitiesComponent } from './home/cities/cities.component';
import { CallbackComponent } from './home/callback/callback.component';
import { TestimonialComponent } from './home/testimonial/testimonial.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { BodyDetailsComponent } from './activity-details/body-details/body-details.component';
import { DetailsHeaderComponent } from './activity-details/details-header/details-header.component';
import {TopActivitiesComponent} from "./home/top-activities/top-activities.component";
import {CartComponent} from "./Paiement_process/cart_wishlist/cart/cart.component";
import {SlickCarouselModule} from "ngx-slick-carousel";




// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SliderComponent,
    TopActivitiesComponent,
    HeaderComponent,
    FooterComponent,
    FamousPlacesComponent,
    LoginComponent,
    SignUpComponent,
    CartComponent,
    PaiementFormComponent,
    PaiementConfirmationComponent,
    WishlistComponent,
    CitiesComponent,
    CallbackComponent,
    TestimonialComponent,
    ActivityDetailsComponent,
    BodyDetailsComponent,
    DetailsHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
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
