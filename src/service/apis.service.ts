import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApisService {
  http: any;
  loginUrl: any;
  constructor(private navCtrl: NavController) {}

  getJobs() {
    return of([
      {
        job_id: 67,
        car_id: 1234,
        due: '11/10/2023',
        tasks: [1123, 12656],
        modle: 'GMC YOKON 2023',
      },
      {
        job_id: 67,
        car_id: 1234,
        due: '11/10/2023',
        tasks: [1123, 12656],
        modle: 'GMC YOKON 2023',
      },
    ]);
  }

  getscaner() {
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

  postlogin() {
    //  return this.http.post(environment.apiUrl + 'login' ; data)
  }
}
