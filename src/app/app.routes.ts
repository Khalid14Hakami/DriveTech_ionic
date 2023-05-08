import { Routes } from '@angular/router';
import { AuthGuardGuard } from './service/authGuard/auth-guard.guard';
import { ApisService } from './service/apis.service';
import { AuthServiceService } from './service/auth-service/auth-service.service';
// import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'tabs',
    providers: [ApisService, AuthServiceService],
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: '',
    loadComponent: () =>
      import('./login-page/login-page.page').then((m) => m.LoginPagePage),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login-page/login-page.page').then((m) => m.LoginPagePage),
  },
  {
    path: 'forgot-password',
    loadComponent: () =>
      import('./forgot-password/forgot-password.page').then(
        (m) => m.ForgotPasswordPage
      ),
    canActivate: [AuthGuardGuard],
  },

  {
    path: 'scan',
    loadComponent: () => import('./scan/scan.page').then((m) => m.ScanPage),
  },
  {
    path: 'check-in-vehicle',
    loadComponent: () =>
      import('./check-in-vehicle/check-in-vehicle.page').then(
        (m) => m.CheckInVehiclePage
      ),
  },
  {
    path: 'add-vehicle',
    loadComponent: () =>
      import('./add-vehicle/add-vehicle.page').then((m) => m.AddVehiclePage),
  },
  {
    path: 'car-detail',
    loadComponent: () => import('./car-detail/car-detail.page').then( m => m.CarDetailPage)
  },
];
