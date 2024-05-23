import {Time} from "@angular/common";
import {Category} from "./enumeration/Category.enum";
import {City} from "./enumeration/City.enum";

export interface Activity {
    id: number,
    designation: string,
    starteddate: Date,
    finisheddate: Date,
    description: string,
    descriptiondetail: string,
    price: number,
    imageUrl: string,
    category: Category,
    location: string,
    status: string,

    city : City
}
