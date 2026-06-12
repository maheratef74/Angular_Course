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
import { ProductForm } from '../components/product-form/product-form';
import { NotFound } from '../components/not-found/not-found';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: Products },
  { path: 'products/add', component: ProductForm },
  { path: 'products/edit/:id', component: ProductForm },
  { path: 'error', component: NotFound, data: { hideNavbar: true } },
  { path: '**', redirectTo: 'error' }
];

