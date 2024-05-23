import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ActivityService} from "../../../service/activity/activity.service";
import {City} from "../../../model/enumeration/City.enum";
import {Category} from "../../../model/enumeration/Category.enum";
import {Activity} from "../../../model/Activity.model";

@Component({
  selector: 'app-activites-by-city',
  templateUrl: './activites-by-city.component.html',
  styleUrl: './activites-by-city.component.css'
})
export class ActivitesByCityComponent implements OnInit{
  constructor(private route : ActivatedRoute , private activityService : ActivityService, private router : Router) {
  }
  city! : City ;

  activities : Activity[]=[];
  averageNotes: number[] = [];
  numberOfComments : number [] = [];
  cities = Object.values(City);
  searchText: string = "";
  filteredCities: string[] = [];
  categories: Category[] = [Category.Sport, Category.Nature, Category.Culture, Category.Food];
  userId: number = 5;
  wishlistStatuses: { [key: number]: boolean } = {};


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const city = params.get('city');
      if (city !== null) {
        this.city = City[city as keyof typeof City];
      }
      this.loadActivities();
    });

  }

  loadActivities() {
    this.activityService.getActivityByCity(this.city).subscribe(
        (activities: Activity[]) => {
          this.activities = activities;
          this.activities.forEach(activity => {
            this.getNote(activity.id);
            this.getnumberOfComments(activity.id);
            this.checkIfInWishlist(activity.id);
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



  filterCities() {
    if (this.searchText) {
      this.filteredCities = this.cities.filter((city: City) =>
          city.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredCities = [];
    }
  }


  selectCity(city: string) {
    this.searchText = city;
    this.filteredCities = [];
    this.router.navigate(['/activities', city]);
  }

  selectedIndex = -1;

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredCities.length;
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.selectedIndex = (this.selectedIndex - 1 + this.filteredCities.length) % this.filteredCities.length;
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (this.selectedIndex !== -1) {
        this.selectCity(this.filteredCities[this.selectedIndex]);
      }
    }
  }

  getCategoryPhoto(category: Category): string {
    switch (category) {
      case Category.Culture:
        return 'assets/images/culture1.jpg';
      case Category.Nature:
        return 'assets/images/nature1.jpg';
      case Category.Sport:
        return 'assets/images/sport.jpg';
      case Category.Food:
        return 'assets/images/food.jpg';
      default:
        return '';
    }
  }

  getCategoryDescription(category: Category): string {
    switch (category) {
      case Category.Culture:
        return 'Immerse yourself in Morocco\'s rich cultural heritage.';
      case Category.Nature:
        return 'Explore the breathtaking natural landscapes of Morocco.';
      case Category.Sport:
        return 'Discover the dynamic world of sports in Morocco.';
      case Category.Food:
        return 'Indulge in the diverse and flavorful cuisine of Morocco.';
      default:
        return '';
    }
  }
  findActivitiesByCityAndCategory(category: Category) {
    this.activityService.findActivitiesByCityAndCategory(this.city, category).subscribe(
        (activities: Activity[]) => {
          this.activities = activities;
          this.activities.forEach(activity => {
            this.getNote(activity.id);
            this.getnumberOfComments(activity.id);
            this.checkIfInWishlist(activity.id);
          });
        },
        (error) => {
          console.error('Error fetching activities:', error);
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
