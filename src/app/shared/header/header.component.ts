import {Component, OnInit} from '@angular/core';
import { Router} from "@angular/router";
import {City} from "../../../model/enumeration/City.enum";





@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  constructor(private router : Router ) {
  }

  isHomepage : Boolean =false;

  ngOnInit(){
    this.isHomepage=this.router.url==='/';
  }
  public isLightTheme = true;

  onThemeSwitchChange() {
    this.isLightTheme = !this.isLightTheme;

    document.body.setAttribute(
        'data-theme',
        this.isLightTheme ? 'light' : 'dark'
    );
  }
  cities = Object.values(City);
  searchText: string = "";
  filteredCities: string[] = [];

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


}
