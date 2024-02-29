// slider.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  private currentIndex = new BehaviorSubject<number>(0);

  constructor() {}

  startSlider(interval: number, totalSlides: number): Observable<number> {
    return timer(0, interval).pipe(
        switchMap(() => this.getNextIndex(totalSlides)),
        map((index) => {
          this.currentIndex.next(index);
          return index;
        })
    );
  }

  private getNextIndex(totalSlides: number): Observable<number> {
    return this.currentIndex.pipe(
        map((currentIndex) => (currentIndex + 1) % totalSlides)
    );
  }
}
