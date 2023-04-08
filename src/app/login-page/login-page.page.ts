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
import { Router } from '@angular/router';
// import { ApisService } from 'src/service/apis.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { get } from '@ionic-native/core/decorators/common';
import { ApisService } from 'src/service/apis.service';

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
})
export class LoginPagePage implements OnInit {
  passwordVisible: boolean = false;

  myForm!: FormGroup;
  type: any;
  // http: any;

  email: string;
  password: string;
  ApisService: any;
  http: any;
  trim: any;
  apiService: any;

  constructor(private navCtrl: NavController, private HttpClient: HttpClient) {}

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

  onSubmitClick() {
    if (this.myForm.valid) {
      this.HttpClient.post(
        `https://my-json-server.typicode.com/techsithgit/json-faker-directory/profiles/`,
        { email: this.myForm.value.Email, password: this.myForm.value.password }
      ).subscribe((data: any[]) => {
        console.log('data stored.');
      });

      this.navCtrl.navigateForward('tabs');
    } else {
      console.error('form is invalid');
    }
  }

  onSubmit() {
    console.warn(this.myForm.value);
  }
  get form() {
    return this.myForm.controls;
  }
}
