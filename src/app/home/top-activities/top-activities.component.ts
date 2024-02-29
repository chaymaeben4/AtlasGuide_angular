import { Component } from '@angular/core';
import {ClientService} from "../../services/client.service";

@Component({
  selector: 'app-top-activities',
  templateUrl: './top-activities.component.html',
  styleUrl: './top-activities.component.css'
})
export class TopActivitiesComponent {

    clients: any[] = [];
constructor(private  clientService:ClientService) {}
    ngOnInit(){
    this.getAllClients();
    }
    getAllClients(){
  this.clientService.getALlClient().subscribe((res)=>{
    console.log(res)
      this.clients=res;
      })
    }
}
