import { Routes } from '@angular/router';

import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';

export const HomeRoutes: Routes = [
  {
    path: '', component: HomeLayoutComponent, children: [
      { path: '', component: IndexPageComponent },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent },
      { path: 'forgot', component: ForgotPasswordPageComponent },
      { path: 'product/:id', component: ProductPageComponent },
      { path: 'cart', component: CartPageComponent },
      { path: 'error', component: ErrorPageComponent },
    ]
  }
];


