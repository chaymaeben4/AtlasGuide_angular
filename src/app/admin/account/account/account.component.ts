import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../authentification/authentification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Agence} from "../../../models/Agence";
import {AccountService} from "../account.service";
import {ActivatedRoute, Route} from "@angular/router";
import {AlertsService} from "../../alerts/alerts.service";
import {FiltersService} from "../../filter/filters.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  constructor(private authService: AuthentificationService,
              private formBuilder: FormBuilder,
              private alertService: AlertsService,
              private route: ActivatedRoute,
              private accountService: AccountService,
              protected filterService: FiltersService) {}

  updateForm!: FormGroup;
  confirmation: boolean = false;
  agence!: Agence;

  ngOnInit() {
   //this.authService.isAuthenticated();
   this.agence = this.route.snapshot.data['account'];
   this.agence.user = this.route.snapshot.data['account'].admin;
   console.log(this.agence);
   this.updateForm = this.formBuilder.group({
     name: [this.agence.name, Validators.required],
     email: [this.agence.email, [Validators.required, Validators.email]],
     phone: [this.agence.phone, Validators.required],
     location: [this.agence.location, Validators.required],
   })

  }

  resetForm() {
    this.updateForm.reset({
      name: this.agence.name,
      email: this.agence.email,
      location: this.agence.location,
      phone: this.agence.phone,
    });
    console.log(this.updateForm.get('email')?.value)
  }

  deleteAccount(){
    this.authService.deleteAccount().subscribe(
      messages => {
        console.log(JSON.stringify(messages));
      },
      error => this.alertService.deleteAlert()
    );
  }

  updateData(){
    this.accountService.updateAgence(this.updateForm.value,this.agence.id).subscribe(
      messages => {
        this.alertService.updateAlert(messages.body)
      },
    );
  }


}
