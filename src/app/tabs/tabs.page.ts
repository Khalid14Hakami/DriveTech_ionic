import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class TabsPage implements OnInit {
  showScanner = false;
  public environmentInjector = inject(EnvironmentInjector);

  constructor(private navCtrl: NavController) {}
  ngOnInit(): void {}

  async scanQR() {
    this.navCtrl.navigateForward('scan/' + 'scandata');
    // document.querySelector('body').classList.add('scanner-active');
    // this.showScanner = true;
    // await BarcodeScanner.checkPermission({ force: true });
    // BarcodeScanner.hideBackground();
    // const result = await BarcodeScanner.startScan(); // start scanning and wait for a result

    // // if the result has content
    // if (result.hasContent) {
    //   this.showScanner = true;
    //   BarcodeScanner.stopScan();
    //   console.log(result.content); // log the raw scanned content
    //   BarcodeScanner.stopScan();

    // }
  }
}
