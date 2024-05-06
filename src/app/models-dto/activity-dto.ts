import {Time} from "@angular/common";
import {ActivityCategories} from "../admin/enumerations/activity-categories";

export interface ActivityDto {
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
