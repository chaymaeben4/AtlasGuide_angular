import {Component, OnInit} from '@angular/core';
import {ActivityService} from "../../../../service/activity/activity.service";
import {Activity} from "../../../../model/Activity.model";

@Component({
  selector: 'app-famous-places',
  templateUrl: './famous-places.component.html',
  styleUrl: './famous-places.component.css'
})
export class FamousPlacesComponent implements OnInit{
  activities : Activity[]=[];

  averageNotes: number[] = [];
  numberOfComments : number [] = [];

  constructor(private activityService : ActivityService) {
  }
ngOnInit() {
      this.loadActivities();
}

  loadActivities() {
    this.activityService.findFamousPlaces().subscribe(
        (activities: Activity[]) => {
          this.activities = activities;
          this.activities.forEach(activity => {
            this.getNote(activity.id);
            this.getnumberOfComments(activity.id);
          });
        },
        (error) => {
          console.error('Error fetching activities:', error);
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
}
