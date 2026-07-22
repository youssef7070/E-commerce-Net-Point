import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./Features/home/home.component').then(m => m.HomeComponent),
        title: 'home page'
    },
    {
        path: 'home',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'AuthNavbarComponent',
        loadComponent: () => import('./Features/auth-navbar/auth-navbar.component').then(m => m.AuthNavbarComponent),
        title: 'auth-navbar'
    },
    {
        path: 'main-navbar',
        loadComponent: () => import('./Features/main-navbar/main-navbar.component').then(m => m.MainNavbarComponent),
        title: 'main-navbar'
    },
    {
        path: 'brands',
        loadComponent: () => import('./Features/brands/brands.component').then(m => m.BrandsComponent),
        title: 'brands page'
    },
    {
        path: '**',
        loadComponent: () => import('./Features/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: 'not found page'
    },
];