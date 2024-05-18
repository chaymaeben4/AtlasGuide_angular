import {Activity} from "./Activity.model";
import {User} from "./User.model";
import {CartElement} from "./CartElement.model";

export class Cart {
    id: number | undefined;
   total_amount:number=0;
   cartElements:CartElement[] = [];

}
