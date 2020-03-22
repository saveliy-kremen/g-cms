import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";

import { AdminRoutes } from './admin.routing';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { IndexComponent } from './index/index.component';
import { MaterialModule } from '../shared/material/material.module';
import { UserGrpcService } from '../shared/services/user.service';
import { CategoriesComponent } from './categories/categories.component';

@NgModule({
  declarations: [AdminLayoutComponent, IndexComponent, CategoriesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    RouterModule.forChild(AdminRoutes),
  ],
  exports: [
    MaterialModule,
    TranslateModule,
  ],
})
export class AdminModule { }
