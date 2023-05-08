import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { HttpInterceptorInterceptor } from './app/interceptors/http-interceptor.interceptor';
import { AuthServiceService } from './app/service/auth-service/auth-service.service';
import { CmnServiceService } from './app/service/cmn-service/cmn-service.service';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    AuthServiceService,
    CmnServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true,
    },

    importProvidersFrom(IonicModule.forRoot({})),
    provideHttpClient(),
    provideRouter(routes),
  ],
});
defineCustomElements(window);
