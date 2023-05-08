import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';

import { ApisService } from 'src/app/service/apis.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ActivatedRoute } from '@angular/router';
import { CmnServiceService } from '../service/cmn-service/cmn-service.service';
import { Camera, CameraResultType } from '@capacitor/camera';
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

  vehicleData: any;
  showScanner = false;
  vin: string;
  constructor(
    private navCtrl: NavController,
    private apiService: ApisService,
    private aRoute: ActivatedRoute,
    private cmnService: CmnServiceService
  ) {}

  async ngOnInit() {
    this.aRoute.queryParams.subscribe((res: any) => {
      if (res) {
        this.vehicleData = JSON.parse(res?.vehicleData);
        console.log('vehicleData', this.vehicleData);

        this.vehicleData?.tasks?.forEach((task) => {
          let attributes = JSON.parse(task?.attrib_names.replace(/'/g, '"'));
          let tasksKeys = Object.keys(attributes);
          if (tasksKeys.length > 0) {
            let measureTasks = [];

            tasksKeys.forEach((taskKey: string) => {
              measureTasks.push({
                key: taskKey,
                nameOfAttribute: attributes[taskKey],
              });
            });

            console.log('measureTasks :- ', measureTasks);
            task.measureTasks = measureTasks;
          }
        });
      }
    });
  }

  async onAddPictureClick(task) {
    await Camera.requestPermissions().then(async (res: any) => {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });

      if (task?.pictures && task?.pictures.length) {
        task.pictures.push(image.dataUrl);
      } else {
        task.pictures = [image.dataUrl];
      }
    });
  }

  onInputChange(e, task, value) {
    task.value = value;
  }
  onTaskChecked(e, task) {
    task.checked = e?.detail?.checked;
  }

  onRemoveImageClick(pictures: string[], index) {
    console.log(pictures, index);
    pictures.splice(index, 1);
  }

  async ionViewDidEnter() {
    this.showData = true;
  }

  async startScanning() {
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
        let scanResult = result.content.split(',');
        console.log('scan result:- ', scanResult);
        this.vin = scanResult[0];
        if (this.vin != this.vehicleData?.VIN) {
          this.showData = true;
          // uncomment this code to make user go back if vin number does not match. and remove above line
          // this.cmnService.showWarning('VIN number does not match');
          // this.onBackClick();
        } else {
          this.showData = true;
        }
      } else {
        this.showScanner = false;
      }
    });
  }

  onNotesAdded(task, note) {
    task.notes = note;
  }

  onCompleteClick() {
    let data = {
      car_id: this.vehicleData?.car_id,
      rtn_id: this.vehicleData?.tasks[0]?.rtn_id,
      tasks: this.vehicleData?.tasks.map((task: any) => {
        let taskValue = {};

        if (task?.type == 'check') {
          taskValue = '';
        } else {
          task?.measureTasks.forEach((mTask) => {
            taskValue[mTask?.nameOfAttribute] = mTask?.value
              ? mTask?.value
              : '';
          });
        }

        return {
          task_id: task?.task_id,
          task_status: task?.checked,
          task_value: taskValue,
          notes: task?.notes,
          pictures: task?.pictures?.length ? task?.pictures : [],
        };
      }),
    };

    for (let i = 0; i < data?.tasks?.length; i++) {
      if (data?.tasks[i]?.task_status != true) {
        this.cmnService.showWarning(
          'Please mark all tasks as checked with appropriate information'
        );
        return;
      }
    }

    this.cmnService.showLoader();

    this.apiService.addJobLog(data).subscribe(
      (res: any) => {
        this.cmnService.showSuccess('Job Log added successfully');
        this.cmnService.hideLoader();
        this.navCtrl.navigateBack('tabs');
      },
      (err) => {
        this.cmnService.hideLoader();
        console.log(err);
      }
    );
  }

  onBackClick() {
    this.navCtrl.navigateBack('tabs');
  }
}
