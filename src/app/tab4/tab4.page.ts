import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { CmnServiceService } from '../service/cmn-service/cmn-service.service';
import { AuthServiceService } from '../service/auth-service/auth-service.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class Tab4Page implements OnInit {
  user: any;
  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    public cmn: CmnServiceService,
    private authService: AuthServiceService
  ) {}

  ngOnInit() {
    this.user = this.authService.currentUserValue;
  }
  async onLogoutClick() {
    const alert = await this.alertController.create({
      header: 'Logout?',
      message: 'Are you sure',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {},
        },
        {
          text: 'Yes',
          handler: () => {
            this.logout();
          },
        },
      ],
    });

    await alert.present();
  }

  logout() {
    this.authService.logout();
  }
}
