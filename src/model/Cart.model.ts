import {Activity} from "./Activity.model";
import {User} from "./User.model";

export class Cart {
    id: number | undefined;
    number_persons: number = 0;
    sub_total: number | undefined;
    total_amount: number | undefined;
    activityList: Activity[] = [];
    user: User = new User();
}