import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CallbackService {

baseUrl = 'http://localhost:8080/agence';
activityUrl="http://localhost:8080/activities";
commentUrl="http://localhost:8080/comment";
  constructor(private http: HttpClient) { }

  getNumerOfAgences() : Observable<number> {
   return this.http.get<number>(this.baseUrl+'/number_of_agences');
  }

  getCountActivities() : Observable<number>{
    return this.http.get<number>(this.activityUrl+'/countactivities');
  }

  getNumberOfGoodComments() : Observable<number>{
  return this.http.get<number>(this.commentUrl+'/numberOfGoodComments')
  }
}
