import {Time} from "@angular/common";

export interface Activity {
  id: number,
  designation: string,
  startDate: Date,
  endDate: Date,
  description: string,
  descriptiondetail: string,
  price: number,
  imageUrl: string,
  category: string,
  location: string,
  status: string,
}
