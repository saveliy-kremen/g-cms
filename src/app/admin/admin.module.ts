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
import { ModalModule } from '../shared/modal/modal.module';
import { LoaderService } from '../shared/services/loader.service';

@NgModule({
  declarations: [AdminLayoutComponent, IndexComponent, CategoriesComponent],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    ModalModule,
    RouterModule.forChild(AdminRoutes),
  ],
  providers: [LoaderService]
})
export class AdminModule { }
