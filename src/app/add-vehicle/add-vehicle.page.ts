import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ApisService } from '../service/apis.service';
import { CmnServiceService } from '../service/cmn-service/cmn-service.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AddVehiclePage implements OnInit {
  vehicleData = [];
  vin = '';
  model = '';
  storageLocation = '';
  arrivalDate = '';
  fl = '';
  fr = '';
  rr = '';
  rl = '';
  color = '';
  isBatteryGreen = false;
  voltage = '';
  batteryModel = '';
  constructor(
    private aRoute: ActivatedRoute,
    private navCtrl: NavController,
    private apiService: ApisService,
    private cmnService: CmnServiceService
  ) {
    this.aRoute.queryParams.subscribe((res: any) => {
      console.log(res);
      this.vehicleData = JSON.parse(res?.result).content.split(',');
      console.log('Vehicle Data:- ', this.vehicleData);
      this.vin = this.vehicleData[0];
      this.model = this.vehicleData[1] + ',' + this.vehicleData[2];
      this.color = this.vehicleData[8];
    });
  }

  ngOnInit() {}

  onBackClick() {
    this.navCtrl.navigateBack('tabs');
  }

  onAddVehicleClick() {
    let data = {
      VIN: this.vin,
      model: this.model,
      color: this.color,
      arrival_date: this.arrivalDate,
      storage_location: this.storageLocation,
      FL: this.fl,
      FR: this.fr,
      RR: this.rr,
      RL: this.rl,
      batt_green: this.isBatteryGreen,
      batt_voltage: this.voltage,
      batt_model: this.batteryModel,
    };

    console.log(data);

    this.cmnService.showLoader();

    this.apiService.addVehicleCheckIn(data).subscribe(
      (res: any) => {
        console.log(res);
        this.cmnService.hideLoader();
        this.cmnService.showSuccess('Vehicle Added Successfully');
        this.navCtrl.navigateBack('tabs');
      },
      (err) => {
        this.cmnService.hideLoader();
        console.log(err);
      }
    );
  }
}
