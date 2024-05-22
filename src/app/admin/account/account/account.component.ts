import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../../authentification/authentification.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SessionService} from "../../session.service";
import {Agence} from "../../../models/Agence";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit{

  constructor(private authService: AuthentificationService,
              private formBuilder: FormBuilder,
              private accountService: AccountService,) {}

  updateForm!: FormGroup;
  confirmation: boolean = false;
  agence!: Agence;

  ngOnInit() {
   this.authService.isAuthenticated();
   this.agence = this.accountService.connect();
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
    this.authService.deleteAccount(this.agence.id).subscribe(
      messages => {
        console.log(JSON.stringify(messages));
      },
      error => {
        if (error.status===200){
          console.log("success")
        }
        if (error.status === 400) {
          console.log("error")
        }
      }
    );
  }
  updateData(){
    this.authService.updateData(this.updateForm.value,this.agence.id).subscribe(
      messages => {
        console.log(JSON.stringify(messages));
      },
      error => {
        if (error.status===200){
          console.log("success")
        }
        if (error.status === 400) {
          console.log("error")
        }
      }

    );
  }


}
