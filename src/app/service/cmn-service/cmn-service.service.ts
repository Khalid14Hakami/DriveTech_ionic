import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CmnServiceService {
  loader: BehaviorSubject<any> = new BehaviorSubject(false);
  deviceInfo: BehaviorSubject<string> = new BehaviorSubject('');
  businessDetail: BehaviorSubject<any> = new BehaviorSubject(Object);
  loaderValue: any;
  loading: HTMLIonLoadingElement;
  constructor(
    private toastCtrl: ToastController,
    private locationStrategy: LocationStrategy,
    private loadingCtrl: LoadingController
  ) {}

  async showSuccess(msg: string) {
    (
      await this.toastCtrl.create({
        message: msg,
        duration: 2000,
      })
    ).present();
  }

  async showError(msg: string) {
    (
      await this.toastCtrl.create({
        message: msg,
        duration: 2000,
      })
    ).present();
  }

  async showWarning(msg: string) {
    (
      await this.toastCtrl.create({
        message: msg,
        duration: 2000,
      })
    ).present();
  }

  preventBackButton() {
    history.pushState(null, '', location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, '', location.href);
    });
  }

  decrypt(data: string) {
    if (data) {
      return atob(data);
    }
    return '';
  }

  encrypt(data: string) {
    if (data) {
      return btoa(data);
    }
    return '';
  }

  async showLoader() {
    if (!this.loader?.value) {
      this.loader.next(true);
    }
    this.loading = await this.loadingCtrl.create({
      message: 'Loading...',
    });

    this.loading.present();
  }

  showToast(msg) {}

  hideLoader() {
    if (this.loader?.value) {
      this.loader.next(false);
    }
    if (this.loading) {
      this.loading.dismiss();
    }
    this.loading.dismiss();
  }

  checkDeviceTypeAndSetValue(width: number) {
    if (width > 0 && width < 840) {
      this.deviceInfo.next('mobile');
    } else if (width > 840) {
      this.deviceInfo.next('computer');
    }
  }
}
