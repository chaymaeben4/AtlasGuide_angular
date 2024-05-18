import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cart} from "../../model/Cart.model";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8083/CityThrillsMorocco/cart';

  constructor(private http: HttpClient) { }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/user/2`);
  }
  addToCart(activity_id:number , user_id:number, nbr:number){
     return this.http.post<void>(`${this.baseUrl}/${activity_id}/addTo/${user_id}/${nbr}`,{});
  }
}
