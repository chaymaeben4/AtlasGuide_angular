import { Component, ElementRef, HostListener, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { Activity } from "../../../../model/Activity.model";
import { ActivityService } from "../../../../service/activity/activity.service";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements AfterViewInit, OnInit {
  selectedCategory!: string;
  activities: Activity[] = [];
  averageNotes: number[] = [];
  numberOfComments: number[] = [];
  userId: number = 5;
  wishlistStatuses: { [key: number]: boolean } = {};
  photos = [
    'assets/images/girl.jpg',
    'assets/images/culture1.jpg',
    'assets/images/nature1.jpg',
    'assets/images/sport.jpg',
    'assets/images/food.jpg'
  ].map(img => `url(${img})`);

  images = [
    ...this.photos,
  ];

  styles = this.images.map(url => ({
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: url
  }));

  index = 0;

  @ViewChild('stickyMenu') menuElement: ElementRef;
  sticky: boolean = false;
  elementPosition: any;

  constructor(private activityService: ActivityService) { this.menuElement = {} as ElementRef; }

  ngOnInit() {
    this.getActivitiesWithHighRating();
  }

  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  onSetIndex(i: number) {
    this.index = i;
    switch (i) {
      case 1:
        this.getActivitiesWithHighRating2('Culture');
        break;
      case 2:
        this.getActivitiesWithHighRating2('Nature');
        break;
      case 3:
        this.getActivitiesWithHighRating2('Sport');
        break;
      case 4:
        this.getActivitiesWithHighRating2('Food');
        break;
      default:
        this.getActivitiesWithHighRating();
        break;
    }
  }

  getActivitiesWithHighRating(): void {
    this.activityService.getActivitiesWithHighRating().subscribe(
        (data: Activity[]) => {
          this.activities = data;
          this.activities.forEach(activity => {
            this.getNoteAndComments(activity.id);
            this.checkIfInWishlist(activity.id);
          });
        },
        (error) => {
          console.log(error);
        }
    );
  }

  getActivitiesWithHighRating2(category: string): void {
    this.activityService.getActivitiesWithHighRatingCategory(category).subscribe(
        (data: Activity[]) => {
          this.activities = data;
          this.activities.forEach(activity => {
            this.getNoteAndComments(activity.id);
            this.checkIfInWishlist(activity.id);
          });
        },
        (error) => {
          console.log(error, "ca marche pas");
        }
    );
  }

  getNoteAndComments(activityId: number) {
    this.activityService.getNote(activityId).subscribe(
        (averageNote: number) => {
          this.averageNotes.push(averageNote);
        }
    );
    this.activityService.getNumberOfComments(activityId).subscribe(
        (numberOfComments: number) => {
          this.numberOfComments.push(numberOfComments);
        }
    );
  }

  checkIfInWishlist(activityId: number) {
    this.activityService.isActivityInWishlist(this.userId, activityId).subscribe(
        (isInWishlist: boolean) => {
          this.wishlistStatuses[activityId] = isInWishlist;
        }
    );
  }

  addToWishlist(activityId: number) {
    if (this.wishlistStatuses[activityId]) {
      this.removeFromWishlist(activityId);
    } else {
      this.activityService.addToWishlist(this.userId, activityId).subscribe(
          wishlist => {
            this.wishlistStatuses[activityId] = true;
          },
          error => {
            console.error('Error adding activity to wishlist:', error);
          }
      );}
  }
  removeFromWishlist(activityId: number) {
    this.activityService.removeFromWishlist(this.userId, activityId).subscribe(
        wishlist => {
          this.wishlistStatuses[activityId] = false;
        },
        error => {
          console.error('Error removing activity from wishlist:', error);
        }
    );
  }
}
