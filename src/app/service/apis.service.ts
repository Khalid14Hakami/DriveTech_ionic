import { Injectable, NgModule } from '@angular/core';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApisService {
  constructor(private navCtrl: NavController, private http: HttpClient) {}

  getJobs() {
    return this.http.get(environment.apiUrl + 'jobs');
  }

  getJobDetails() {
    return of([
      {
        make: 'GMC YOKON 2023',
        storage_location: 'N94',
        arrival_date: '19/12/2023',
        last_maintenance_date: '19/12/2023',
        VIN: '10F0GH1038475',
        job_id: 67,
        tasks: [1123, 12656],
      },
    ]);
  }

  addVehicleCheckIn(data) {
    return this.http.post(environment.apiUrl + 'check-in', data);
  }

  getCars() {
    return this.http.get(environment.apiUrl + 'cars');
  }

  getCarDetailsById(id) {
    return this.http.get(environment.apiUrl + 'cars/' + id);
  }

  addJobLog(data) {
    return this.http.post(environment.apiUrl + 'job_log', data);
  }
}
