import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../service/apis.service';
import { CmnServiceService } from '../service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.page.html',
  styleUrls: ['./car-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CarDetailPage implements OnInit {
  carDetail;
  constructor(
    private navCtrl: NavController,
    private aRoute: ActivatedRoute,
    private apiService: ApisService,
    private cmnService: CmnServiceService
  ) {
    this.aRoute.queryParams.subscribe((res: any) => {
      console.log(JSON.parse(res?.car));
      this.getCarDetails(JSON.parse(res?.car)?.car_id);
    });
  }

  ngOnInit() {}

  getCarDetails(id) {
    this.cmnService.showLoader();
    this.apiService.getCarDetailsById(id).subscribe(
      (res: any) => {
        this.carDetail = res;
        console.log(this.carDetail);
        this.cmnService.hideLoader();
      },
      (err) => {
        this.cmnService.hideLoader();
      }
    );
  }

  onBackClick() {
    this.navCtrl.navigateBack('tabs/tabs/tab3');
  }
}
