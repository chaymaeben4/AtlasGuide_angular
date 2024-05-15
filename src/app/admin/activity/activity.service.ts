import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environnment} from "../../environnment/environnment";
import {ActivityDto} from "../../models-dto/activity-dto";
import {Activity} from "../../models/Activity";
import {map, Observable} from "rxjs";
import {SessionService} from "../session.service";
import colors from "tailwindcss/colors";
import {Browser} from "leaflet";
import retina = Browser.retina;

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private webSocket: WebSocket;
  data!: Activity[];
  private activityYRL = environnment.adminURL + "/activities";

  constructor(private http: HttpClient,
              private sessionService: SessionService)
  {
    this.webSocket = new WebSocket('ws://localhost:8080/activity?userId='+this.sessionService.getSessionData('user').Uid);
  }

  public connect(): Activity[]{
    this.webSocket = new WebSocket('ws://localhost:8080/activity?userId='+this.sessionService.getSessionData('user').Uid);
    this.webSocket.onmessage = (event) => {
      console.log(JSON.parse(event.data))
      this.data =  JSON.parse(event.data);
    };
    return this.data;
  }

  getActivities(): Observable<Activity[]> {
    return this.http.get<ActivityDto[]>(this.activityYRL).pipe(
      map(activities => activities.map(activity => {
        return this.convertToActivity(activity)
      }))
    );
  }

  getAgencyActivitiesById(agenceId: number): Observable<Activity[]>  {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.sessionService.getSessionData('user').token);
    return this.http.get<ActivityDto[]>(this.activityYRL+'/agence/'+agenceId, {headers }).pipe(
      map(activities => activities.map(activity => {
        return this.convertToActivity(activity)
      }))
    );
  }

  getActivity(id: number): Observable<Activity> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.sessionService.getSessionData('user').token);
    return this.http.get<ActivityDto>(this.activityYRL+'/'+id,{
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).
    pipe(
      map(activity => this.convertToActivity(activity))
    )
  }

  addActivity(data: Activity,agenceId: number): Observable<Activity> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.sessionService.getSessionData('user').token)
      .set('Content-Type', 'application/json');
    return this.http.post<ActivityDto>(this.activityYRL+'/'+agenceId,data,{headers}).pipe(
      map(activity => this.convertToActivity(activity))
    );
  }

  updateActivity(data: Activity,id: number): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.sessionService.getSessionData('user').token);
    return this.http.put<void>(this.activityYRL +'/'+id,data,{headers});
  }

  deleteActivity(id: number): Observable<void> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer ' + this.sessionService.getSessionData('user').token);
    return this.http.delete<void>(this.activityYRL+'/'+id,{headers});
  }

  createReservation(activityId: number,participantCount: number) {
    const url = environnment.adminURL+'/reservations';
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    }).set('Authorization', 'Bearer ' + this.sessionService.getSessionData('user').token)
    const options = { headers };

    this.http.get<any>(url+'/email', options).subscribe(
      response => {
        console.log('Réservation créée avec succès');
        // Gérer la réponse du backend selon vos besoins (par exemple, afficher un message de succès à l'utilisateur)
      },
      error => {
        console.error('Erreur lors de la création de la réservation', error.status);
        // Gérer l'erreur selon vos besoins (par exemple, afficher un message d'erreur à l'utilisateur)
      }
    );
  }

  uploadfile(file: File){
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.http.post(this.activityYRL+'/upload', formData).subscribe(
      response => {
        console.log('Image téléchargée avec succès.');
      },
      error => {
        console.error('Erreur lors du téléchargement de l\'image :', error);
      }
    );
  }

  loadImage(imageName: string): Observable<any> {
     return this.http.get(`${this.activityYRL}/images/${imageName}`);
  }

  private convertToActivity(activity: ActivityDto): Activity{
    return {
      id: activity.id,
      designation: activity.designation,
      description: activity.description,
      price: activity.price,
      descriptionDetail: activity.descriptionDetail,
      location: activity.location,
      imageUrl: activity.imageUrl,
      category: activity.category,
      city: activity.city,
      startDate: activity.startDate,
      endDate: activity.endDate,
      bookingStartDate: activity.bookingStartDate,
      bookingEndDate: activity.bookingEndDate,
      participants: activity.participants,
      maxParticipants: activity.maxParticipants,
      isPlacesLimited: activity.isPlacesLimited,
      isFlexibleDates: activity.isFlexibleDates,
      isAvailableYearRound: activity.isAvailableYearRound,
      agence: activity.agence,
      status: activity.status,
    };
  }


}
