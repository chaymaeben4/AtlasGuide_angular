import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-paiement-form',
  templateUrl: './paiement-form.component.html',
  styleUrl: './paiement-form.component.css'
})
export class PaiementFormComponent {
  constructor(private http: HttpClient) { }

  chargeCreditCard() {
    const cardNumber: string = (<HTMLInputElement>document.getElementById('card_number')).value;
    const expMonth: string = (<HTMLInputElement>document.getElementById('expire_month')).value;
    const expYear: string = (<HTMLInputElement>document.getElementById('expire_year')).value;
    const cvc: string = (<HTMLInputElement>document.getElementById('ccv')).value;
    (<any>window).Stripe.card.createToken({
      number: cardNumber,
      exp_month: expMonth,
      exp_year: expYear,
      cvc: cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        let token = response.id;
        console.log(token)
        this.chargeCard(token);
      } else {
        console.log(response.error.message);
      }
    });
  }
  chargeCard(token: string) {
    console.log(token);
    const bodyData = {
      "token": token,
      "amount":"70"
    }
    this.http.post('http://localhost:8081/payment/charge', bodyData,{responseType: 'text'})
      .subscribe(resp => {
        console.log(resp);
      })
    console.log(this.http)
  }
}
