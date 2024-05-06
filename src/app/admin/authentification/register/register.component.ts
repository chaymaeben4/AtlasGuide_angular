import {Component, OnInit} from '@angular/core';
import {AuthentificationService} from "../authentification.service";
import Swal, {SweetAlertOptions} from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {passwordValidator} from "../passwordValidator/password-validator";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{

  registrationForm!: FormGroup;
  formSubmitted = false;
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  constructor(private authService: AuthentificationService,
              private formBuilder: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,passwordValidator]],
      PasswordConfirmation: ['',[Validators.required,passwordValidator]],
      phone: ['', Validators.required],
      location: ['', Validators.required]
    });
    const queryParams = this.route.snapshot.queryParams;
    this.authService.verifyAccount(queryParams['token']).subscribe(
      messages => {
        console.log(JSON.stringify(messages));
      },
      error => {
        if (error.status===200){
          this.router.navigate(['/Admin_login'],{ queryParams: { v: '1' } });
        }
      }
    );

  }

  register() {
    this.formSubmitted = true;
    setTimeout(() => {
      this.formSubmitted = false;
    },6000)
    if (this.registrationForm.valid) {
      console.log("valide")
      this.authService.register(this.registrationForm.value).subscribe(
        messages => {
          console.log(JSON.stringify(messages));
        },
        error => {
          if (error.status===200){
            Swal.fire(this.succeed_swalOptions);
          }
          if (error.status === 400) {
            Swal.fire(this.error_swalOptions);
          }
        }
      );
    }

  }

  error_swalOptions: SweetAlertOptions = {
    text: 'Email is already in use! .',
    position: 'top',
    width: '400px',
    showCloseButton: true,
    showConfirmButton: false,
    customClass: {
      popup: 'alert alert-danger',
    }
  };

  succeed_swalOptions: SweetAlertOptions = {
    text: 'Confirm your Account by the link sent to your email address .',
    position: 'top',
    width: '400px',
    showConfirmButton: true,
    customClass: {
      popup: 'alert alert-info',
    }
  };


}
