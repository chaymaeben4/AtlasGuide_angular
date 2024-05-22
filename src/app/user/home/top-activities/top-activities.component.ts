import {Component, OnInit} from '@angular/core';

import {ActivityService} from "../../../../service/activity/activity.service";
import {Activity} from "../../../models/Activity";
import {PipsService} from "../../../admin/pips/pips.service";


@Component({
  selector: 'app-top-activities',
  templateUrl: './top-activities.component.html',
  styleUrl: './top-activities.component.css'
})
export class TopActivitiesComponent implements OnInit{

    activities : Activity[] = [];
    averageNotes: number[] = [];
    numberOfComments : number [] = [];

    clients: any[] = [];
    constructor(
      private  activityService : ActivityService,
      protected Pipe: PipsService) {}
    ngOnInit() {
        this.getActivitiesWithHighRating();
        this.getAllActivities();
    }

    getActivitiesWithHighRating(): void {
        this.activityService.getActivitiesWithHighRating().subscribe(
            (data: Activity[]) => {
                this.activities = data;
                this.activities.forEach(activity => {
                    this.getNote(activity.id);
                    this.getnumberOfComments(activity.id);
                });
            },
            (error) => {
                console.log(error);
            }
        );
    }

    getNote(activityId: number) {
        this.activityService.getNote(activityId).subscribe(
            (averageNote: number) => {
                this.averageNotes.push(averageNote);
            }
        );
    }

    getnumberOfComments(activityId : number){
    this.activityService.getNumberOfComments(activityId).subscribe(
        (numberOfComments: number) => {
            this.numberOfComments.push(numberOfComments);
        }
    );
    }

   getAllActivities() : void{
      this.activityService.getAllActivities().subscribe(
        (data : Activity[]) =>{
          this.activities=data;},
        (error) => {
          console.log(error);
        });
 }





}
