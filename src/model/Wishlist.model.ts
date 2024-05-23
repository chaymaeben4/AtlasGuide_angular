import {ActivityDto} from "../app/models-dto/activity-dto";
import {User} from "./User.model";

export interface Wishlist{
id: number;
activity : ActivityDto;
user : User;
}