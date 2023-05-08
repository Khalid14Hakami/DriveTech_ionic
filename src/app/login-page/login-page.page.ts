import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApisService } from 'src/app/service/apis.service';
import { AuthServiceService } from '../service/auth-service/auth-service.service';
import { CmnServiceService } from '../service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ApisService, AuthServiceService],
})
export class LoginPagePage implements OnInit {
  passwordVisible: boolean = false;
  myForm!: FormGroup;
  email: string;
  password: string;

  constructor(
    private navCtrl: NavController,
    private HttpClient: HttpClient,
    private authService: AuthServiceService,
    private cmnService: CmnServiceService
  ) {}

  onforgotClick() {
    this.navCtrl.navigateForward('forgot-password');
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
      ]),
    });
  }

  login() {
    this.cmnService.showLoader();

    this.authService
      .login({
        email: this.myForm.value.Email,
        password: this.myForm.value.password,
      })
      .subscribe(
        (res) => {
          console.log(res, 'login');
          setTimeout(() => {
            this.navCtrl.navigateForward('tabs');
            this.cmnService.hideLoader();
          }, 2000);
        },
        (err) => {
          this.cmnService.showError(
            'Please enter valid username and password.'
          );
          console.log(err, 'error');
          this.cmnService.hideLoader();
        }
      );
  }

  get form() {
    return this.myForm.controls;
  }
}
