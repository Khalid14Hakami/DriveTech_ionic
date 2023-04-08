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

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class ForgotPasswordPage implements OnInit {
  myForm!: FormGroup;

  constructor(private Navctrl: NavController) {}

  ngOnInit(): void {
    this.myForm = new FormGroup({
      Email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onbackClick() {
    this.Navctrl.navigateBack('');
  }

  onSubmitClick() {
    console.log('my form value :- ', this.myForm.value);

    this.Navctrl.navigateForward('/tabs/tab1');
  }

  onSubmit() {
    console.warn(this.myForm.value);
  }
  get form() {
    return this.myForm.controls;
  }
}
