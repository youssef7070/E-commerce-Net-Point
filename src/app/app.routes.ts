import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './Layout/auth-layout/auth-layout.component';
import { SignInComponent } from './Features/sign-in/sign-in.component';
import { SignUpComponent } from './Features/sign-up/sign-up.component';
import { MainLayoutComponent } from './Layout/main-layout/main-layout.component';
import { HomeComponent } from './Features/home/home.component';
import { CategoriesComponent } from './Features/categories/categories.component';
import { BrandsComponent } from './Features/brands/brands.component';
import { ProductsComponent } from './Features/products/products.component';
import { NotFoundComponent } from './Features/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: AuthLayoutComponent, children: [
            {
                path: '',
                redirectTo: "signIn",
                pathMatch: "full"
            },
            {
                path: "signIn",
                component: SignInComponent,
            },
            {
                path: "signUp",
                component: SignUpComponent,
            },
        ]
    },
    {
        path: '',
        component: MainLayoutComponent, children: [
            {
                path: '',
                redirectTo: "home",
                pathMatch: "full"
            },
            {
                path: "home",
                component: HomeComponent
            },
            {
                path: "products",
                component: ProductsComponent
            },
            {
                path: "products/:id",
                component: ProductsComponent
            }
            ,
            {
                path: "categories",
                component: CategoriesComponent
            },

            {
                path: "brands",
                component: BrandsComponent
            },
        ]
    },
    {
        path: "**",
        component: NotFoundComponent
    }
];