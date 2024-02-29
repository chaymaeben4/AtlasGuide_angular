// slider.component.ts

import { Component, OnInit, OnDestroy } from '@angular/core';
import { SliderService } from './slider.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, OnDestroy {
  currentIndex: number = 0;
  private subscription!: Subscription; // Add definite assignment assertion

  constructor(private sliderService: SliderService) {}

  ngOnInit() {
    const interval = 3000; // 3 seconds
    const totalSlides = 2; // Number of slides

    this.subscription = this.sliderService
        .startSlider(interval, totalSlides)
        .subscribe((index) => (this.currentIndex = index));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
