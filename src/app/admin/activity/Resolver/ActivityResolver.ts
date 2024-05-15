import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import {ActivityService} from "../activity.service";
import {Activity} from "../../../models/Activity";
import {SessionService} from "../../session.service";

@Injectable({
  providedIn: 'root'
})
export class ActivityResolver implements Resolve<Activity[]> {

  constructor(
    private activityService: ActivityService,
    private Session: SessionService
  ) {}

  resolve(): Observable<Activity[]> {
    return this.activityService.getAgencyActivitiesById(20);
  }
}
