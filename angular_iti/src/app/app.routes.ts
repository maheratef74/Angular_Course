import { Routes } from '@angular/router';
import { Products } from '../components/products/products';
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

