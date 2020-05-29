import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutes } from './home.routing';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { IndexPageComponent } from './index-page/index-page.component';
import { MaterialModule } from '../shared/material/material.module';
import { ValidationModule } from '../shared/validation/validation.module';
import { RegisterPageComponent } from './register-page/register-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ForgotPasswordPageComponent } from './forgot-password-page/forgot-password-page.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ItemGrpcService } from '../shared/services/grpc/item.service'
import { ProductPageComponent } from './product-page/product-page.component';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [HomeLayoutComponent,
    IndexPageComponent,
    RegisterPageComponent,
    LoginPageComponent,
    ForgotPasswordPageComponent,
    CartPageComponent,
    ProductPageComponent,
    ProductComponent,
    ErrorPageComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationModule,

    RouterModule.forChild(HomeRoutes),
  ],
  providers: [ItemGrpcService]
})
export class HomeModule { }
