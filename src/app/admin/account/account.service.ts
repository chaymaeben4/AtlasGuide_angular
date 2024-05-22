import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Agence} from "../../models/Agence";
import {User} from "../../models/User";
import {Observable} from "rxjs";
import {SessionService} from "../session.service";
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private user!: User;
  private webSocket: WebSocket;
  data!: Agence;
  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    ) { this.webSocket = new WebSocket('ws://localhost:8080/agence');}
  public connect(): Agence{
    this.webSocket = new WebSocket('ws://localhost:8080/agence');
    this.webSocket.onmessage = (event) => {
      this.data =  JSON.parse(event.data);
    };
    return this.data;
  }

  getAgence(): Observable<Agence>{
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.sessionService.getSessionData('user').token)
      .set('Content-Type', 'application/json');
    return this.http.get<Agence>('http://localhost:8080/CityThrillsMorocco/Admin/'+this.sessionService.getSessionData('user').Uid,{headers})
  }

  getUser(): Observable<User>{
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.sessionService.getSessionData('user').token)
      .set('Content-Type', 'application/json');
    return this.http.get<User>('http://localhost:8080/CityThrillsMorocco/'+this.sessionService.getSessionData('user').Uid,{headers})
  }

  updateAgence(agence: Agence,id: number): Observable<any> {
    return this.http.put<any>('http://localhost:8080/CityThrillsMorocco/Admin/'+id,agence,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })});
  }



}
