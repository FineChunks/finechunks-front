import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule), canActivateChild: [AuthGuard] },
  { path: 'users', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule), canActivateChild: [AuthGuard] },
  // {
  //   path: '**',
  //   redirectTo: '',
  // },
];
