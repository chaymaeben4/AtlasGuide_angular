import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthentificationService} from "../authentification.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SessionService} from "../../session.service";
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../../style_admin.css']
})
export class LoginComponent implements OnInit {

  private token = '';
  loginForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthentificationService,
              private router: Router,
              private sessionService: SessionService,
              private route: ActivatedRoute,
              ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    },);
    this.sessionService.clearSessionData('user');
    const queryParams = this.route.snapshot.queryParams;
    if (queryParams['v']){
      Swal.fire( this.succeed_swalOptions);
    }
  }


  swalOptions: SweetAlertOptions = {
    text: 'Mot de passe incorrect.',
    position: 'top',
    width: '400px',
    showCloseButton: true,
    showConfirmButton: false,
    customClass: {
      popup: 'alert alert-danger',
    }
  };

  succeed_swalOptions: SweetAlertOptions = {
    title: "Email verified successfully",
    text: 'Proceed to Login.',
    position: 'top',
    width: '400px',
    showConfirmButton: false,
    customClass: {
      popup: 'alert alert-success',
    }
  };

  login() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (this.loginForm.invalid) {
      return;
    }

    this.authService.login({email, password}).subscribe(
      response => {
        this.token = response.token;
        this.sessionService.setSessionData('user',
          {token: this.token,agence: response.agence});
        this.router.navigate(['/dashboard']);
      },
      error => {

        if (error.status !== 200) {
          Swal.fire(this.swalOptions);
        }
        });
  }



}
