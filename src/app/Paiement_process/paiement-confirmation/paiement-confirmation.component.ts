import {Component,OnDestroy, OnInit , ChangeDetectorRef} from '@angular/core';
import {PaymentService} from "../../services/payment.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-paiement-confirmation',
  templateUrl: './paiement-confirmation.component.html',
  styleUrl: './paiement-confirmation.component.css'
})
export class PaiementConfirmationComponent implements OnInit, OnDestroy {

  paymentMessage!: string;
  paymentMessageSubscription!: Subscription ;

  constructor(private paymentService: PaymentService ,private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.paymentMessageSubscription = this.paymentService.paymentMessage$.subscribe(
      message => {
        this.paymentMessage = message;
        console.log("Message mis à jour dans un autre composant:", this.paymentMessage);
        this.changeDetectorRef.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.paymentMessageSubscription.unsubscribe();
  }
}
