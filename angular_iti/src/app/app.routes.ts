import { Routes } from '@angular/router';
import { authGuard, loggedOutGuard } from '../guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('../components/login/login').then(m => m.Login),
    canActivate: [loggedOutGuard] 
  },
  { 
    path: 'register', 
    loadComponent: () => import('../components/register/register').then(m => m.Register),
    canActivate: [loggedOutGuard] 
  },
  {
    path: '',
    canActivateChild: [authGuard],
    children: [
      { 
        path: 'products', 
        loadComponent: () => import('../components/products/products').then(m => m.Products) 
      },
      { 
        path: 'products/add', 
        loadComponent: () => import('../components/product-form/product-form').then(m => m.ProductForm) 
      },
      { 
        path: 'products/edit/:id', 
        loadComponent: () => import('../components/product-form/product-form').then(m => m.ProductForm) 
      }
    ]
  },
  { 
    path: 'error', 
    loadComponent: () => import('../components/not-found/not-found').then(m => m.NotFound), 
    data: { hideNavbar: true } 
  },
  { path: '**', redirectTo: 'error' }
];
