import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CmnServiceService } from '../cmn-service/cmn-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  public currentUserSubject: BehaviorSubject<any>;

  public currentUser!: Observable<any>;

  constructor(
    private http: HttpClient,
    private cmnService: CmnServiceService,
    private router: Router
  ) {
    const user = localStorage.getItem('cupv_');
    if (user) {
      this.currentUserSubject = new BehaviorSubject<any>(
        JSON.parse(this.cmnService.decrypt(user))
      );
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(null);
    }
  }

  public get currentUserValue() {
    if (this.currentUserSubject) {
      return this.currentUserSubject?.value;
    }
  }

  public setCurrentUserValue(user: any) {
    this.currentUserSubject.next(user);
    localStorage.setItem(
      'cupv_',
      this.cmnService.encrypt(JSON.stringify(user))
    );
  }

  login(userData: any): Observable<any> {
    let myHeaders = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(userData?.email + ':' + userData?.password)
    );

    return this.http
      .get(environment.apiUrl + 'login', { headers: myHeaders })
      .pipe(
        map(
          (loginResponse: any) => {
            if (loginResponse) {
              loginResponse.username = userData?.email;
              loginResponse.password = userData?.password;
              this.currentUserSubject.next(loginResponse);
              localStorage.setItem(
                'cupv_',
                this.cmnService.encrypt(JSON.stringify(loginResponse))
              );
              return loginResponse;
            }
          },
          (err: any) => {
            return err;
          }
        )
      );
  }

  async logout() {
    this.currentUserSubject.next(undefined);

    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}
