import {Component, OnInit} from '@angular/core';
import { register } from 'swiper/element/bundle';
@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrl: './cities.component.css'
})
export class CitiesComponent implements OnInit {

  famousCities = [
    {
      name: 'Marrakech',
      img: 'assets/images/Marrakech.jpg',
      description: 'Experience the natural beauty of glacier',
      link: '/Details'
    },
    {
      name: 'Fes',
      img: 'assets/images/Fez.jpg',
      description: 'Trekking to the mountain camp site',
      link: '/Details'
    },
    {
      name: 'Chefchaouen',
      img: 'assets/images/chefchaouen.jpg',
      description: 'Where Every Corner Paints the Sky Blue',
      link: '/Details'
    }


  ];
  constructor() {
  }
  ngOnInit(){}
}
