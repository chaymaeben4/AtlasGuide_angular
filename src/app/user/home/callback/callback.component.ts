import { Component, OnInit } from '@angular/core';
import { CallbackService } from './callback.service';
import { Observable } from "rxjs";
import { City } from "../../../../model/enumeration/City.enum";

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.css']
})
export class CallbackComponent implements OnInit {
  nombreTotalClients!: number ;
  nombreActuelClients: number = 0;

  nombreTotalAgences: number = 0;
  nombreActuelAgences: number = 0;

  nombreTotalDestinations: number = Object.keys(City).length;
  nombreActuelDestinations: number = 0;

  nombreTotalActivites: number = 0;
  nombreActuelActivites: number = 0;

  increment: number = 1;
  intervalId: any;

  constructor(private callbackService: CallbackService) { }

  ngOnInit(): void {
    this.getNumberOfAgences();
    this.getNumberOfActivities();
    this.getNumberOfGoodComments();

    this.intervalId = setInterval(() => {
      // Incrémentation du nombre de clients
      if (this.nombreActuelClients < this.nombreTotalClients) {
        this.nombreActuelClients += this.increment;
      }

      // Incrémentation du nombre d'agences
      if (this.nombreActuelAgences < this.nombreTotalAgences) {
        this.nombreActuelAgences += this.increment;
      }

      // Incrémentation du nombre de destinations
      if (this.nombreActuelDestinations < this.nombreTotalDestinations) {
        this.nombreActuelDestinations += this.increment;
      }

      // Incrémentation du nombre d'activités
      if (this.nombreActuelActivites < this.nombreTotalActivites) {
        this.nombreActuelActivites += this.increment;
      }

      // Vérification pour arrêter l'intervalle lorsque toutes les valeurs sont atteintes
      if (this.toutesLesValeursAtteintes()) {
        clearInterval(this.intervalId);
      }
    }, 100);
  }

  // Fonction pour vérifier si toutes les valeurs sont atteintes
  toutesLesValeursAtteintes(): boolean {
    return (
        this.nombreActuelClients >= this.nombreTotalClients &&
        this.nombreActuelAgences >= this.nombreTotalAgences &&
        this.nombreActuelDestinations >= this.nombreTotalDestinations &&
        this.nombreActuelActivites >= this.nombreTotalActivites
    );
  }

  getNumberOfAgences(): void {
    this.callbackService.getNumerOfAgences().subscribe(
        (totalAgences: number) => {
          this.nombreTotalAgences = totalAgences;
        }
    );
  }

  getNumberOfActivities(): void {
    this.callbackService.getCountActivities().subscribe(
        (totalActivities: number) => {
          this.nombreTotalActivites = totalActivities;
        }
    );
  }
  getNumberOfGoodComments() : void{
    this.callbackService.getNumberOfGoodComments().subscribe(
        (totalClients: number) => {
          this.nombreTotalClients = totalClients;
        }
    );
  }
}
