import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./supplier/login/login.component";
import {SignUpComponent} from "./supplier/sign-up/sign-up.component";
import {CartComponent} from "./Paiement_process/cart_wishlist/cart/cart.component";
import {PaiementFormComponent} from "./Paiement_process/paiement-form/paiement-form.component";
import {PaiementConfirmationComponent} from "./Paiement_process/paiement-confirmation/paiement-confirmation.component";
import {WishlistComponent} from "./Paiement_process/cart_wishlist/wishlist/wishlist.component";
import {ActivityDetailsComponent} from "./activity-details/activity-details.component";
import {ActivitesByCityComponent} from "./activites-by-city/activites-by-city.component";
import {resolve} from "@angular/compiler-cli";
import {PaymentResolver} from "./resolvers/payment/payment.resolver";

const routes: Routes = [
  {path:'' , component : HomeComponent},
  {path:'Admin_login' , component : LoginComponent},
  {path:'Admin_sign_up' , component : SignUpComponent},
  {path:'Cart' , component : CartComponent},
  {path:'paiement' , component : PaiementFormComponent},
  {path:'confirmation' , component : PaiementConfirmationComponent , resolve: { state: PaymentResolver}},
  {path:'wishlist' , component : WishlistComponent},
  {path:'Details/:id' , component : ActivityDetailsComponent},
  {path:'activities/:city' , component : ActivitesByCityComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
