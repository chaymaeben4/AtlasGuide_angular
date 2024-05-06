import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environnment} from "../../environnment/environnment";
import {ActivityDto} from "../../models-dto/activity-dto";
import {Activity} from "../../models/Activity";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private webSocket: WebSocket;
  data!: Activity[];
  private activityYRL = environnment.adminURL + "/activities";

  constructor(private http: HttpClient) {this.webSocket = new WebSocket('ws://localhost:8080/stocks'); }

  public connect(): Activity[]{
    this.webSocket = new WebSocket('ws://localhost:8080/stocks');
    this.webSocket.onmessage = (event) => {
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



  getActivity(id: number): Observable<Activity> {
    return this.http.get<ActivityDto>(this.activityYRL+'/'+id).
    pipe(
      map(activity => this.convertToActivity(activity))
    )
  }

  addActivity(data: Activity): Observable<Activity> {
    return this.http.post<ActivityDto>(this.activityYRL, data).pipe(
      map(activity => this.convertToActivity(activity))
    );
  }

  updateActivity(data: Activity,id: number): Observable<void> {
    return this.http.put<void>(this.activityYRL +'/'+data.id,{ data,id});
  }

  deleteActivity(id: number): Observable<void> {
    return this.http.delete<void>(this.activityYRL+'/'+id);
  }

  private convertToActivity(activity: ActivityDto): Activity {
    return {
      id: activity.id,
      designation: activity.designation,
      startDate: activity.startDate,
      endDate: activity.endDate,
      description: activity.description,
      price: activity.price,
      descriptiondetail: activity.descriptiondetail,
      location: activity.location,
      imageUrl: activity.imageUrl,
      category: activity.category,
      status: activity.status,
    };
  }
}
