import {Resolve} from '@angular/router';
import {PaymentService} from "../../../service/payment/payment.service";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class PaymentResolver implements Resolve<string>{
  constructor(private paymentService: PaymentService) {
  }
  resolve():Observable<string>{
    return this.paymentService.paymentMessage$;
  }
}
