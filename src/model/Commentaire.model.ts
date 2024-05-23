import {Activity} from "./Activity.model";
import {User} from "./User.model";

export interface Commentaire {
    id: number;
    note: number;
    content: string;
    createdDate: Date;
    activity :  Activity;
    user_id: number ;
    user : User;

}