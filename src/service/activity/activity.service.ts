import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Activity} from "../../model/Activity.model";
import {Commentaire} from "../../model/Commentaire.model";
import {Wishlist} from "../../model/Wishlist.model";
import {User} from "../../model/User.model";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  private baseUrl = 'http://localhost:8080/activities';
  private comment_Url = 'http://localhost:8080/comment';
  private wishlistUrl = 'http://localhost:8080/api/wishlist';

  private userUrl = 'http://localhost:8080/CityThrillsMorocco';

  constructor(private http : HttpClient) { }

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.baseUrl}/activities`);
  }

  getActivitiesWithHighRating () : Observable<Activity[]> {
    return this.http.get<Activity[]>(`${this.comment_Url}/comments_with_High_Rating`);
  }

  getNote(activity_id : number) : Observable<number>{
    return this.http.get<number>(`${this.comment_Url}/note/${activity_id}`);
  }

  getNumberOfComments (activity_id : number) : Observable<number>{
    return this.http.get<number>(`${this.comment_Url}/numberOfComments/${activity_id}`);
  }

  getActivity(activity_id : number) : Observable<Activity>{
    return this.http.get<Activity>(`${this.baseUrl}/${activity_id}`);
  }

  getActivityByCity(city : string) : Observable<Activity[]>{
    return this.http.get<Activity[]>(`${this.baseUrl}/activities/city/${city}`);
  }
  findActivitiesByCityAndCategory(city : String , category : String) : Observable<Activity[]>{
    return this.http.get<Activity[]>(`${this.baseUrl}/${city}/${category}`);
  }

  getActivitiesWithHighRatingCategory(category : string) : Observable<Activity[]>{
    return this.http.get<Activity[]>(`${this.comment_Url}/comments_with_High_Rating/${category}`);
  }

  findFamousPlaces() : Observable<Activity[]>{
    return this.http.get<Activity[]>(`${this.baseUrl}/famous_places`);
  }
  
  findComments(activity_id : number) : Observable<Commentaire[]>{
    return this.http.get<Commentaire[]>(`${this.comment_Url}/comments/${activity_id}`);
  }

  addComment(activityId: number, userId: number, comment: Commentaire): Observable<Commentaire> {
    const url = `${this.comment_Url}/add/${activityId}/${userId}`;
    return this.http.post<Commentaire>(url, comment);
  }
  addToWishlist(userId: number, activityId: number): Observable<Wishlist> {
    return this.http.post<Wishlist>(`${this.wishlistUrl}/add/${userId}/${activityId}`, {});
  }

  removeFromWishlist(userId: number, activityId: number): Observable<Wishlist> {
    return this.http.delete<Wishlist>(`${this.wishlistUrl}/${userId}/${activityId}`);
  }
  getWishlistActivities(userId : number) : Observable<Activity[]>{
    return this.http.get<Activity[]>(`${this.wishlistUrl}/${userId}`);
  }
  isActivityInWishlist(userId: number, activityId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.wishlistUrl}/contains/${userId}/${activityId}`);
  }

getUserById(userId: number) : Observable<User> {
    return this.http.get<User>(`${this.userUrl}/${userId}`);

}
}
