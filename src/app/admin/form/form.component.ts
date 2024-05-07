import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {passwordValidator} from "../authentification/passwordValidator/password-validator";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent{
  registrationForm!: FormGroup;
  passwordConfirmation!: FormGroup;

  constructor(private formBuilder: FormBuilder,) {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,passwordValidator]],
      phone: ['', Validators.required],
      location: ['', Validators.required]
    });
    this.passwordConfirmation = this.formBuilder.group({
      PasswordConfirmation: ['',[Validators.required,passwordValidator]],
    })
  }
}
