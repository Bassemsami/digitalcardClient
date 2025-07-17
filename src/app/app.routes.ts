import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'employee/:id',
    data: { animation: 'EmployeePage' },
    loadComponent: () =>
      import('./employees/employees').then(m => m.Employees)
  },
  {
    path: 'login',
    data: { animation: 'LoginPage' },
    loadComponent: () =>
      import('./login/login').then(m => m.Login)
  },
  {
    path: 'signup',
    data: { animation: 'SignupPage' },
    loadComponent: () =>
      import('./signup/signup').then(m => m.Signup)
  },
  {
    path: 'profile',
    title: 'My Profile',
    canActivate: [AuthGuard],
    data: { animation: 'ProfilePage' },
    loadComponent: () =>
      import('./profile/profile').then(m => m.Profile)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

