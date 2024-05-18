import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {PaymentDetails} from "../../model/PaymentDetails.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8083/api/payment/charge';
  private _paymentDetails!:PaymentDetails;
  private paymentMessageSubject = new Subject<string>();
  paymentMessage$: Observable<string> = this.paymentMessageSubject.asObservable();


  constructor(private http: HttpClient) {}


  chargeCard(paymentRequest: any): Observable<string> {
    return this.http.post<string>(this.apiUrl, paymentRequest, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'text' as 'json' // Définir le type de réponse comme texte
    });
  }


  updatePaymentStatus(message: string) {
    this.paymentMessageSubject.next(message);
  }


  set paymentDetails(value: PaymentDetails) {
    this._paymentDetails = value;
  }

  get paymentDetails(): PaymentDetails {
    return this._paymentDetails;
  }
}
