import { Component, EnvironmentInjector, OnInit, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { StatusBar } from '@capacitor/status-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ApisService } from './service/apis.service';
import { HttpInterceptorInterceptor } from './interceptors/http-interceptor.interceptor';
import { AuthServiceService } from './service/auth-service/auth-service.service';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, HttpClientModule],
  providers: [
    ApisService,
    AuthServiceService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },
  ],
})
export class AppComponent implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {}
  ngOnInit(): void {
    if (Capacitor.isPluginAvailable('StatusBar')) {
      StatusBar.setBackgroundColor({
        color: '#351a96',
      });
    }
  }
}
