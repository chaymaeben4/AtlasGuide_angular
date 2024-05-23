import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Cart} from "../../model/Cart.model";
import {Activity} from "../../app/models/Activity";
import {City} from "../../app/models/City";


@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl = 'http://localhost:8080/CityThrillsMorocco/cart';
  private activity_Url = 'http://localhost:8080/activity'

  constructor(private http: HttpClient) { }

  getCart(): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/user/1`);
  }

  getActivitiesByCity(city: City) : Observable<Activity>{
    return this.http.get<Activity>(`${this.activity_Url}/activities/city/${city}`);
  }
}
