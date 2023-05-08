import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { ApisService } from '../service/apis.service';
import { CmnServiceService } from '../service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab3Page implements OnInit {
  cars = [];
  constructor(
    private apiService: ApisService,
    private cmnService: CmnServiceService,
    private navCtrl: NavController
  ) {}
  ngOnInit(): void {
    this.getCars();
  }

  getCars() {
    this.cmnService.showLoader();
    this.apiService.getCars().subscribe(
      (res: any) => {
        console.log(res);
        this.cars = res;
        this.cmnService.hideLoader();
      },
      (err) => {
        this.cmnService.hideLoader();
      }
    );
  }

  onCarClick(car) {
    this.navCtrl.navigateForward('car-detail', {
      queryParams: {
        car: JSON.stringify(car),
      },
    });
  }
}
