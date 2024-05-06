import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Activity} from "../../../models/Activity";
import {ActivityService} from "../activity.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Time} from "@angular/common";
import {priceRangeValidator} from "../../products/price-range.directive";
import {map, Observable} from "rxjs";
import {Router} from "@angular/router";
import {SessionService} from "../../session.service";
import {AuthentificationService} from "../../authentification/authentification.service";


@Component({
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.css']
})
export class ActivityUpdateComponent {

  @Input() activity: Activity | undefined;
  @Output() bought = new EventEmitter();
  @Output() deleted = new EventEmitter();
  @Input() id = -1;
  activity$: Observable<Activity> | undefined;

  constructor(
    public dialogRef: MatDialogRef<ActivityUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private activityService: ActivityService,
    private AuthenticationService: AuthentificationService,
  ) { }

  ngOnChanges(): void {
    this.activity$ = this.activityService.getActivity(this.id);
  }

  remove(activity: Activity) {
    this.activityService.deleteActivity(activity.id).subscribe(() => {
      this.deleted.emit();
    });
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  @Output() added = new EventEmitter<Activity>();

  filename = "";


  activityForm = new FormGroup({
    designation: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    startDate: new FormControl<Date | any  >( undefined,{
      nonNullable: true,
      validators: Validators.required
    }),
    endDate: new FormControl<Date | any>(undefined, {
      nonNullable: true,
      validators: Validators.required
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, priceRangeValidator()]
    }),
    category: new FormControl<String | ''>('', {
      nonNullable: true,
      validators: Validators.required
    }),
    descriptiondetail:  new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    location: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    imageUrl: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
  });

  showPriceRangeHint = false;
  url!: string;
  activities: Activity[] = [];
  activities$: Observable<Activity[]> | undefined;
  categories = ['Hardware', 'Computers', 'Clothing', 'Software'];

  err: string[] = [];

  get designation() { return this.activityForm.controls.designation }
  get description() { return this.activityForm.controls.description }
  get descriptiondetail() { return this.activityForm.controls.descriptiondetail }
  get startDate() { return this.activityForm.controls.startDate }
  get endDate() { return this.activityForm.controls.endDate}
  get category() { return this.activityForm.controls.category }
  get price() { return this.activityForm.controls.price }
  get location() { return this.activityForm.controls.location }
  get imageUrl(){return this.activityForm.controls.imageUrl}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.filename = file.name;
  }

  ngOnInit(): void {
    this.AuthenticationService.isAuthenticated()
    this.activity$ = this.activityService.getActivity(this.data.id)
    console.log(this.activity$)
    this.activity$.subscribe(activity => {
      this.activityForm.patchValue(activity);
      this.filename = activity.imageUrl;
      console.log(this.filename)
    });


    this.price.valueChanges.subscribe(price => {
      if (price) {
        this.showPriceRangeHint = price > 1 && price < 10000;
      }
    });
    this.activityService.getActivities().subscribe(activities => {
      this.activities = activities;
    });
    this.activities$ = this.designation.valueChanges.pipe(
      map(designation => this.activities.filter(activity => activity.designation.startsWith(designation)))
    );
  }


  updateActivity() {
    this.err = JSON.parse(JSON.stringify(this.category.value));
    this.activityService.updateActivity( <Activity>{
      id: this.data.id,
      designation: this.designation.value,
      description: this.description.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      price: Number(this.price.value),
      category: this.err.at(0),
      descriptiondetail: this.descriptiondetail.value,
      location: this.location.value,
      imageUrl: this.filename
    },this.data.id).subscribe(activity => {
      this.activityForm.reset();
    });
  }


  image(filename: string) {

  }
}
