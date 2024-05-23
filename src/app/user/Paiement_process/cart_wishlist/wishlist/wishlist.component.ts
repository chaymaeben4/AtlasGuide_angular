import {Component, OnInit} from '@angular/core';
import {ActivityService} from "../../../../../service/activity/activity.service";
import {Activity} from "../../../../models/Activity";


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit {

  constructor(private activityService : ActivityService) { }
  userId : number = 5 ;
  activities : Activity[] = [];
  averageNotes: number[] = [];
  numberOfComments : number [] = [];
  ngOnInit() {
    this.getWishListActivities(this.userId);
  }

  getWishListActivities(userId : number) {
    this.activityService.getWishlistActivities(userId).subscribe(
        (activities: Activity[]) => {
          this.activities = activities;
          this.activities.forEach(activity => {
            this.getNote(activity.id);
            this.getnumberOfComments(activity.id);
          });
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

