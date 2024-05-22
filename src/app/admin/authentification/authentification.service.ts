import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {AgenceDto} from "../../models-dto/AgenceDto";
import {Agence} from "../../models/Agence";
import {Injectable} from "@angular/core";
import {SessionService} from "../session.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient,
              private sessionService: SessionService,
              private router: Router,) { }

  isAuthenticated(){
    const user = this.sessionService.getSessionData('user');
    if (!user){
      this.router.navigate(["/Admin_login"])
    }
  }

  login(data: {email: string; password: string}): Observable<any> {
    return this.http.post<any>('http://localhost:8082/authenticate',data).pipe(
      tap((data: any) => console.log(data)),
      catchError(err => throwError(() => err))
    )
  }

  register(user: {
    firstname: string;
    lastname: string;
    password: string;
    phone: string;
    email: string
  },role: boolean): Observable<any> {
    let roleName = "ROLE_USER"
    if (role) roleName = "ROLE_CONTENT_MANAGER"
    return this.http.post<User>('http://localhost:8080/CityThrillsMorocco/register/'+roleName, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })});
  }

  updateData(agence: Agence,id: number): Observable<any> {
    return this.http.put<any>('http://localhost:8080/CityThrillsMorocco/'+id,agence,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })});
  }

  resetPasword(email: string): Observable<any>  {
    return this.http.post<any>('http://localhost:8080/CityThrillsMorocco/Reset-password',email,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })});
  }

  deleteAccount(id: number): Observable<any>{
    return this.http.delete<any>('http://localhost:8080/CityThrillsMorocco/'+id);
  }



  registerNewPassword(token: string,password: string): Observable<any>{
    return this.http.post<any>('http://localhost:8080/CityThrillsMorocco/New_password?token='+token,password,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })} );
  }


  verifyAccount(token: string): Observable<any> {
    return this.http.get<any>('http://localhost:8080/CityThrillsMorocco/confirm-account?token='+token,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })});
  }

  private convertToAgence(agence: AgenceDto): Agence {
    return {
      id: agence.id,
      name: agence.name,
      location: agence.location,
      phone: agence.phone,
      email: agence.email,
      password: agence.password,
    }
  }

}
