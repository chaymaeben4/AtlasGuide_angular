import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Activity} from "../../../models/Activity";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ActivityService} from "../activity.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from '@angular/material/dialog';
import {ActivityUpdateComponent} from "../activity-update/activity-update.component";
import {DeleteConfirmationDialogComponent} from "../delete-confirmation-dialog/delete-confirmation-dialog.component";
import {AuthentificationService} from "../../authentification/authentification.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit{

  status = '';


  activities = new MatTableDataSource<Activity>([]);
  activities$: Activity[] = [];
  formatDateString(dateString: string, currentFormat: string, desiredFormat: string): string {
    const dateObject = new Date(dateString);
    const formattedDate = this.datePipe.transform(dateObject, desiredFormat);
    return <string>formattedDate;
  }
  rowStyles: string[] = ['t','table-light'];
  rowIcon: string[] = ["mdi mdi-waveform mdi-20px text-success me-3","mdi mdi-checkbox-marked-circle-plus-outline mdi-20px text-danger me-3"]
  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;


  constructor(private activityService: ActivityService,
              private AuthenticatinService: AuthentificationService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private datePipe: DatePipe,) {}

  ngOnInit(): void {
    this.activities = new MatTableDataSource(this.activityService.connect());
    this.getActivities();
    const queryParams = this.route.snapshot.queryParams;
    this.status = queryParams['status'];
    this.AuthenticatinService.isAuthenticated()
  }



  private getActivities() {
    this.activityService.getActivities().subscribe(activities => {
      this.activities = new MatTableDataSource(activities);
      console.log(this.activities)
      this.activities$ = activities;
      this.activities.sort = this.sort;
      this.activities.paginator = this.paginator;
    });
  }


  openDeleteConfirmationDialog(id: number): void {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.activityService.deleteActivity(id).subscribe(() => {
          this.getActivities();
        });}
    });
  }


  openUpdateDialog(id: number): void {
    const dialogRef = this.dialog.open(ActivityUpdateComponent, {
      width: '900px',
      height: '600px',
      data: { id: id},
      position: {
        top: '100px'
      }
    });

    dialogRef.afterOpened().subscribe(() => {
      // Focus sur le haut de la boîte de dialogue
      const dialogElement = document.querySelector('.mat-dialog-container');
      if (dialogElement) {
        dialogElement.scrollTop = 100;
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Optionally, you can perform any action after the dialog is closed
    });
}
 generateRandomBinaryDigit() {
    return Math.round(Math.random());
  }

}
