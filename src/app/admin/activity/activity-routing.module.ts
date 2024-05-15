import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ActivityCreateComponent} from "./activity-create/activity-create.component";
import {ActivityListComponent} from "./activity-list/activity-list.component";
import {ActivityResolver} from "./Resolver/ActivityResolver";

const routes: Routes = [
  {
    path: "createActivity",
    component: ActivityCreateComponent
  },
  {
    path: "activities",
    component: ActivityListComponent,
    resolve: { activities: ActivityResolver }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ActivityRoutingModule { }
