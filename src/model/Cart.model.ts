import {Activity} from "./Activity.model";
import {User} from "./User.model";

export interface Cart {
    id: number ;
    number_persons: number ;
    sub_total: number;
    total_amount: number ;
    activityList: Activity[] ;
    user: User ;
}