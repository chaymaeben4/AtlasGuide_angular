import {Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'app-body-details',
  templateUrl: './body-details.component.html',
  styleUrl: './body-details.component.css'
})
export class BodyDetailsComponent {
  isDescriptionTabSelected = true;
  isProgramTabSelected = false;
  isReviewTabSelected = false;
  isMapTabSelected = false;
  constructor(private renderer: Renderer2, private el: ElementRef) { }

  onProgramTabClick() {
    this.isProgramTabSelected=true;
    this.isDescriptionTabSelected=false;
    this.isMapTabSelected=false;
    this.isReviewTabSelected=false;
    const programContent = this.el.nativeElement.querySelector('#program').innerHTML;
    const overviewContent = this.el.nativeElement.querySelector('.overview-content');

    this.renderer.setProperty(overviewContent, 'innerHTML', programContent);
  }
  onDescriptionTabClick() {
    this.isDescriptionTabSelected = true;
    this.isProgramTabSelected = false;
    this.isReviewTabSelected = false;
    this.isMapTabSelected = false;
    const descriptionContent = this.el.nativeElement.querySelector('#overview').innerHTML;
    const Content = this.el.nativeElement.querySelector('.overview-content');
    this.renderer.setProperty(Content, 'innerHTML', descriptionContent);
  }
  onReviewTabClick() {
    this.isDescriptionTabSelected = false;
    this.isProgramTabSelected = false;
    this.isReviewTabSelected = true;
    this.isMapTabSelected = false;
    const reviewContent = this.el.nativeElement.querySelector('#review').innerHTML;
    const Content = this.el.nativeElement.querySelector('.overview-content');
    this.renderer.setProperty(Content, 'innerHTML', reviewContent);
  }
  onMapTabClick() {
    this.isDescriptionTabSelected = false;
    this.isProgramTabSelected = false;
    this.isReviewTabSelected = false;
    this.isMapTabSelected = true;
    const mapContent = this.el.nativeElement.querySelector('#map').innerHTML;
    const Content = this.el.nativeElement.querySelector('.overview-content');
    this.renderer.setProperty(Content, 'innerHTML', mapContent);
  }

}
