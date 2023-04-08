import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController } from '@ionic/angular';
import { ApisService } from 'src/service/apis.service';
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
  jobs: job[] = [];
  constructor(
    private navCtrl: NavController,
    private apiService: ApisService
  ) {}
  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this.apiService.getJobs().subscribe((res: any) => {
      this.jobs = res;
    });
  }

  onCardClick() {
    this.navCtrl.navigateForward('scan');
  }
}
