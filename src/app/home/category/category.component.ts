import { Component } from '@angular/core';
import {CategoryService} from "./category.service";
import {CommonModule} from "@angular/common";



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  constructor(private categoryService: CategoryService) {}

  selectCategory(category: string) {
    this.categoryService.setSelectedCategory(category);
  }
}
