import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
// import { BarcodeScanner } from '@ionic-native/bar/code-scanner/ngx';
import { ApisService } from 'src/service/apis.service';
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
  modaldetails: detail[] = [];
  constructor(
    // private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private apiService: ApisService
  ) {}

  ngOnInit() {
    // this.barcodeScanner
    //   .scan()
    //   .then((barcodeData) => {
    //     console.log('Barcode data', barcodeData);
    //   })
    //   .catch((err) => {
    //     console.log('Error', err);
    //   });
    this.getscaner();
  }

  getscaner() {
    this.apiService.getscaner().subscribe((res: any) => {
      this.modaldetails = res;
    });
  }
  onBackClick() {
    this.navCtrl.pop();
  }
}
