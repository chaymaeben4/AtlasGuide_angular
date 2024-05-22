import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivityService} from "../activity.service";
import {map, Observable, startWith} from "rxjs";
import {Activity} from "../../../models/Activity";
import {AuthentificationService} from "../../authentification/authentification.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {priceRangeValidator} from "../../products/price-range.directive";
import {City} from "../../../../model/enumeration/City.enum";
import {SafeResourceUrl} from "@angular/platform-browser";
import {GoogleMapsService} from "../../../maps/google-maps.service";
import {AlertsService} from "../../alerts/alerts.service";
import {ActivityCategories} from "../../enumerations/activity-categories";
import {SessionService} from "../../session.service";
import { NgxImageCompressService } from 'ngx-image-compress';
import {AwsSdkService} from "../../aws-sdk/aws-sdk.service";
@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})


export class ActivityCreateComponent implements OnInit {
  selectedCityIframeSrc!: SafeResourceUrl;
  selectedFile: File | null = null;
  currentFile?: File;
  progress = 0;
  message = '';
  fileName = 'Select File';

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
      const file: File = event.target.files[0];
      this.currentFile = file;
      this.fileName = this.currentFile.name;
    } else {
      this.fileName = 'Select File';
    }
  }
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.selectedFile = target.files[0] as File;
      const formData = new FormData();
      formData.append('image', this.selectedFile);

      this.selectedFileName = this.selectedFile.name;

    }
  }


  isLinear = false;
  @Output() added = new EventEmitter<Activity>();

  cities: City[] = Object.values(City);
  filteredCities!: Observable<City[]>;

  filename = "";
  unsafeUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14131401.081666416!2d-27.633198336256214!3d30.150012426714188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd0b88619651c58d%3A0xd9d39381c42cffc3!2sMaroc!5e0!3m2!1sfr!2sma!4v1715315794985!5m2!1sfr!2sma';
  safeUrl: SafeResourceUrl = this.googleMapService.sanitizer.bypassSecurityTrustResourceUrl(this.unsafeUrl);

  constructor(private activityService: ActivityService,
              private AuthenticatinService: AuthentificationService,
              private sessionService: SessionService,
              protected googleMapService: GoogleMapsService,
              private alertService: AlertsService,
              private imageCompress: NgxImageCompressService,
              private awsService: AwsSdkService,
  ) {
  }

  uploadImage() {
    if (!this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);
    this.awsService.uploadFile(this.selectedFile,"first-project",'/pfsfiles/'+this.selectedFile.name);

  }

  ngOnInit(): void {
    this.activities = this.activityService.connect();
    this.filteredCities = this.city.valueChanges.pipe(
      startWith(''),
      map(value => this.filterCities(value))
    );
    {
      "this.AuthenticatinService.isAuthenticated()"
    }
    this.price.valueChanges.subscribe(price => {
      if (price) {
        this.showPriceRangeHint = price > 1 && price < 10000;
      }
    });


    this.activities$ = this.designation.valueChanges.pipe(
      map(designation => this.activities.filter(activity => activity.designation.startsWith(designation)))
    );


  }

  activity!: Activity;

  activityForm = new FormGroup({
    designation: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    descriptionDetail: new FormControl('', {
      nonNullable: true,
      validators: Validators.required
    }),
    price: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
      validators: [Validators.required, priceRangeValidator()]
    }),
    category: new FormControl<string | 'GGF'>('VHG', {
      nonNullable: true,
      validators: Validators.required
    }),
    imageUrl: new FormControl('', {
      nonNullable: true,

    }),
    startDate: new FormControl<Date | any>(undefined, {
      nonNullable: true,
    }),
    endDate: new FormControl<Date | any>(undefined, {
      nonNullable: true,
    }),
    bookingEndDate: new FormControl<Date | any>(undefined, {
      nonNullable: true,
    }),
    bookingStartDate: new FormControl<Date | any>(undefined, {
      nonNullable: true,
    }),
    city: new FormControl<string | City>('', {
      nonNullable: true,
    }),
    maxParticipants: new FormControl<number | any>(undefined, {
      nonNullable: true,
    }),
    participants: new FormControl<number | any>(undefined, {
      nonNullable: true,
    }),
    isAvailableYearRound: new FormControl<boolean | any>(false, {
      nonNullable: true,
    }),
    isFlexibleDates: new FormControl<boolean | any>(true, {
      nonNullable: true,
    }),
    isPlacesLimited: new FormControl<boolean | any>(false, {
      nonNullable: true,
    }),
  });

  showPriceRangeHint = false;
  activities: Activity[] = [];
  activities$: Observable<Activity[]> | undefined;
  categories = Object.values(ActivityCategories);

  err: string[] = [];

  get designation() {
    return this.activityForm.controls.designation
  }

  get description() {
    return this.activityForm.controls.description
  }

  get descriptionDetail() {
    return this.activityForm.controls.descriptionDetail
  }

  get bookingStartDate() {
    return this.activityForm.controls.bookingStartDate
  }

  get bookingEndDate() {
    return this.activityForm.controls.bookingEndDate
  }

  get startDate() {
    return this.activityForm.controls.startDate
  }

  get endDate() {
    return this.activityForm.controls.endDate
  }

  get category() {
    return this.activityForm.controls.category
  }

  get price() {
    return this.activityForm.controls.price
  }

  get city() {
    return this.activityForm.controls.city
  }

  get maxParticipants() {
    return this.activityForm.controls.maxParticipants
  }

  get participants() {
    return this.activityForm.controls.participants
  }

  get isPlacesLimited() {
    return this.activityForm.controls.isPlacesLimited
  }

  get isFlexibleDates() {
    return this.activityForm.controls.isFlexibleDates
  }

  get isAvailableYearRound() {
    return this.activityForm.controls.isAvailableYearRound
  }


  selectedFileName: string | undefined;


  filterCities(value: string): City[] {
    const filterValue = value.toLowerCase();
    return this.cities.filter(city => city.toLowerCase().includes(filterValue));
  }

  createActivity() {
    this.err = JSON.parse(JSON.stringify(this.category.value));
    this.activityService.addActivity(<Activity>{
      id: 1,
      designation: this.designation.value,
      description: this.description.value,
      startDate: this.startDate.value,
      endDate: this.endDate.value,
      price: Number(this.price.value),
      category: this.err.at(0),
      descriptionDetail: this.descriptionDetail.value,
      location: '',
      imageUrl: this.filename,
      maxParticipants: this.maxParticipants.value,
      participants: this.participants.value,
      isAvailableYearRound: this.isAvailableYearRound.value,
      isFlexibleDates: this.isFlexibleDates.value,
      isPlacesLimited: this.isPlacesLimited.value,
      bookingStartDate: this.bookingStartDate.value,
      bookingEndDate: this.bookingEndDate.value,
      city: this.city.value,
    },this.sessionService.getSessionData('user').agence.Uid).subscribe(
      activity => {
        this.activityForm.reset();
        this.added.emit(activity);
      },
      error => {
        this.alertService.activityAlert(error.status);
      }
    )
  }


  updateMap() {
    this.safeUrl = this.googleMapService.updateMap(this.city.value)
  }

  public imageUrl: string="/assets/img/avatars/drag-drop_8202936.png";

  public loadImage(imageName: string): void {
    this.activityService.loadImage(imageName).subscribe(
      image => this.imageUrl = image
    )
  }
  onCityChange(event: any)  {
    this.safeUrl = this.googleMapService.updateMap(event.value)
  }


}
