import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ApisService } from '../service/apis.service';

@Component({
  selector: 'app-check-in-vehicle',
  templateUrl: './check-in-vehicle.page.html',
  styleUrls: ['./check-in-vehicle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class CheckInVehiclePage implements OnInit {
  showData = false;

  scanData: any;
  showScanner = false;
  constructor(
    private navCtrl: NavController,
    private apiService: ApisService,
    private aRoute: ActivatedRoute
  ) {}

  async ngOnInit() {}

  async ionViewDidEnter() {
    await BarcodeScanner.prepare();
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
        this.navCtrl.navigateForward(['add-vehicle'], {
          queryParams: {
            result: JSON.stringify(result),
          },
        });
      } else {
        this.showScanner = false;
      }
    });
  }

  onBackClick() {
    this.navCtrl.pop();
  }
}
