import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ActivityService} from "../../../service/activity/activity.service";

import {Commentaire} from "../../../model/Commentaire.model";
import {User} from "../../../model/User.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Activity} from "../../models/Activity";


@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css'],
})
export class ActivityDetailsComponent implements OnInit{

  activityId !: number;
  user! : User ;
  userId : number = 3;
  activity! : Activity ;
  numberOfComments! : number;
  averageNote ! : number ;

  comments : Commentaire[]=[];
  comment!: Commentaire;
  commentForm! : FormGroup;



  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id !== null) {
        this.activityId = +id;

      }
    });
    this.getActivity();
    this.findComments(this.activityId);
    this.initForm();
  }
  constructor(private formBuilder: FormBuilder , private renderer: Renderer2, private el: ElementRef , private activityService : ActivityService, private route: ActivatedRoute) { }





  //data

 getActivity(): void {
    this.activityService.getActivity(this.activityId).subscribe(activity => {
      this.activity = activity;
      this.getnumberOfComments(this.activityId);
    });

 }


  getnumberOfComments(activityId : number){
    this.activityService.getNumberOfComments(activityId).subscribe(
        (numberOfComments: number) => {
          this.numberOfComments=numberOfComments;
        }
    );
  }

    findComments(activityId: number): void {
        this.activityService.findComments(activityId).subscribe(
            (comments: Commentaire[]) => {
                let totalNotes = 0;
                this.comments = comments;
                console.log('Comments:', this.comments);

                this.comments.forEach((comment: Commentaire) => {
                    totalNotes += comment.note; // Accumulate the note values
                    this.activityService.getUserById(comment.user_id).subscribe(
                        (user: User) => {
                            comment.user = user;
                        },
                        (error) => {
                            console.error('Error fetching user for comment:', error);
                        }
                    );
                });

                // Calculate the average note
               this.averageNote = totalNotes / comments.length;
                console.log('Average Note:', this.averageNote);
            },
            (error) => {
                console.error('Error fetching comments:', error);
            }
        );
    }



    onSubmit(): void {
        if (this.commentForm.invalid) {
            return;
        }

        const commentDto = this.commentForm.value;


        this.activityService.addComment(this.activityId, this.userId, commentDto).subscribe(
            response => {
                console.log('Comment added:', response);
                this.commentForm.reset();
                this.findComments(this.activityId);
                this.getnumberOfComments(this.activityId);
                // Optionally, update the UI to reflect the new comment
            },
            error => {
                console.error('Error adding comment:', error);
            }
        );
    }

    initForm(): void {
        this.commentForm = this.formBuilder.group({
            note: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
            content: ['', Validators.required]
        });
    }

}
