import {Component, OnInit} from '@angular/core';
import {FiltersService} from "./admin/filter/filters.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit{
  constructor(protected filterService: FiltersService) {
  }
  ngOnInit() {
  }
}
