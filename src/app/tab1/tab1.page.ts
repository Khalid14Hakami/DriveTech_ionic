import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { ApisService } from 'src/app/service/apis.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from '../service/auth-service/auth-service.service';
import { CmnServiceService } from '../service/cmn-service/cmn-service.service';
export interface job {
  car_id: string;
  due: string;
  job_id: string;
  modle: string;
  tasks: [];
}
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class Tab1Page implements OnInit {
  jobs: any[] = [];
  constructor(
    private navCtrl: NavController,
    private apiService: ApisService,
    private cmnService: CmnServiceService
  ) {}
  ngOnInit(): void {}

  ionViewWillEnter() {
    this.getJobs();
  }

  getJobs() {
    this.cmnService.showLoader();
    this.apiService.getJobs().subscribe(
      (res: any) => {
        this.jobs = res;
        this.cmnService.hideLoader();
      },

      (err) => {
        this.cmnService.hideLoader();
        console.log(err, 'error');
      }
    );
  }

  onCardClick(job) {
    this.navCtrl.navigateForward('scan', {
      queryParams: {
        vehicleData: JSON.stringify(job),
      },
    });
  }
}
