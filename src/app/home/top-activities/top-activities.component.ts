import {Component, OnInit} from '@angular/core';
import {ClientService} from "../../services/client.service";
import {Activity} from "../../../model/Activity.model";
import {ActivityService} from "../../../service/activity/activity.service";


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
constructor(private  activityService : ActivityService) {}
    ngOnInit() {
        this.getActivitiesWithHighRating();
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

//     getAllActivities() : void{
//   this.activityService.getAllActivities().subscribe(
//       (data : Activity[]) =>{
//       this.activities=data;},
//       (error) => {
//           console.log(error);
//       });
// }





}
