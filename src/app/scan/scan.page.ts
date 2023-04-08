import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

import { ApisService } from 'src/service/apis.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ActivatedRoute } from '@angular/router';
export interface detail {
  VIN: string;
  arrival_date: number;
  job_id: number;
  last_maintenance_date: number;
  make: string;
  storage_location: string;
}
@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ScanPage implements OnInit {
  showData = false;
  modaldetails: detail[] = [];
  scanData: any;
  showScanner = false;
  constructor(
    private navCtrl: NavController,
    private apiService: ApisService,
    private aRoute: ActivatedRoute
  ) {}

  async ngOnInit() {
    this.scanData = this.aRoute.snapshot.params.scanData;
  }

  async ionViewDidEnter() {
    await BarcodeScanner.prepare();
    await this.getscaner();
    document.querySelector('body').classList.add('scanner-active');
    this.showScanner = true;
    await this.scanQR();
  }

  ionViewDidLeave() {
    BarcodeScanner.stopScan();
    this.showScanner = false;
    document.querySelector('body').classList.remove('scanner-active');
  }

  async scanQR() {
    await BarcodeScanner.checkPermission({ force: true });
    await BarcodeScanner.hideBackground();
    BarcodeScanner.hideBackground().then(async (res: any) => {
      console.log('hideBackground res :  ', res);
      document.querySelector('body').classList.add('scanner-active');
      const result = await BarcodeScanner.startScan();
      if (result.hasContent) {
        console.log(result.content); // log the raw scanned content
        this.showData = true;
      } else {
        this.showScanner = false;
      }
    });
  }

  getscaner() {
    this.apiService.getJobDetails().subscribe((res: any) => {
      this.modaldetails = res;
    });
  }
  onBackClick() {
    this.navCtrl.pop();
  }
}
