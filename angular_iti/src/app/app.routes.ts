import { Routes } from '@angular/router';
import { Products } from '../components/products/products';
import { Login } from '../components/login/login';
import { Register } from '../components/register/register';
import { authGuard, loggedOutGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'login', component: Login, canActivate: [loggedOutGuard] },
  { path: 'register', component: Register, canActivate: [loggedOutGuard] },
  { path: 'products', component: Products, canActivate: [authGuard] },
  { path: '**', redirectTo: 'products' }
];
