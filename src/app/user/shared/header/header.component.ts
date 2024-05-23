import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import { Router} from "@angular/router";
import {City} from "../../../../model/enumeration/City.enum";





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit,AfterViewInit{

  @ViewChild('stickyMenu') menuElement: ElementRef;
  sticky: boolean = false;


  constructor(private router : Router ) {
    this.menuElement = {} as ElementRef;

  }

  isHomepage : Boolean =false;

  ngOnInit(){
    this.isHomepage=this.router.url==='/';
  }


  cities = Object.values(City);
  searchText: string = "";
  filteredCities: string[] = [];



  ngAfterViewInit() {

  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if(windowScroll >= 100){
      this.sticky=true;
      console.log(windowScroll);

    }
    else{
      this.sticky=false;
      console.log(windowScroll);

    }
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


}
