import {Component, OnDestroy, OnInit, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PaymentDetails} from "../../../../model/PaymentDetails.model";
import {PaymentService} from "../../../../service/payment/payment.service";

@Component({
  selector: 'app-paiement-confirmation',
  templateUrl: './paiement-confirmation.component.html',
  styleUrl: './paiement-confirmation.component.css',
})
export class PaiementConfirmationComponent implements OnInit, OnDestroy {

  paymentStatus!: string;
  paymentInformation !: PaymentDetails;


  constructor(private paymentService: PaymentService ,private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.paymentStatus = data['state']; // state est le nom que vous avez donné dans la définition de la route
      this.paymentInformation=this.paymentService.paymentDetails;
    });
  }
  goBack(): void {
    window.history.back();
  }

  paymentState():boolean{
    if(this.paymentStatus ==="true")
      return true;
    else
      return false;
  }

  ngOnDestroy() {
  }
}
