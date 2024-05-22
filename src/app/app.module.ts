// app.module.ts

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser'
import {CommonModule, DatePipe} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule} from "@angular/common/http";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import {SlickCarouselModule} from "ngx-slick-carousel";
import {AdminModule} from "./admin/admin.module";
import {UserModule} from "./user/user.module";
import {ActivityModule} from "./admin/activity/activity.module";
import {DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from '@angular/material-moment-adapter';
import {PaymentResolver} from "./resolvers/payment/payment.resolver";


// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,

  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        CommonModule,
        AdminModule,
        UserModule,
        FormsModule,
        MatSlideToggleModule,
        SlickCarouselModule,
        ActivityModule,
      MatDatepickerModule,
      MatNativeDateModule,
    ],
  providers: [
    provideAnimationsAsync(),
    PaymentResolver,
    DatePipe,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS] }, // If you're using Moment.js for dates
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Use your preferred locale

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
