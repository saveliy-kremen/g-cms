import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';

import { AdminRoutes } from './admin.routing';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { IndexComponent } from './index/index.component';
import { MaterialModule } from '../shared/material/material.module';
import { CategoriesComponent } from './categories/categories.component';
import { ModalModule } from '../shared/modal/modal.module';
import { LoaderService } from '../shared/services/loader.service';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { ValidationModule } from '../shared/validation/validation.module';
import { PropertiesComponent } from './properties/properties.component';
import { TableModule } from '../shared/table/table.module';

@NgModule({
  declarations: [
    AdminLayoutComponent, IndexComponent, CategoriesComponent, CategoryEditComponent, PropertiesComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    ModalModule,
    FormsModule,
    ValidationModule,
    NgxDropzoneModule,
    ReactiveFormsModule,
    TableModule,
    RouterModule.forChild(AdminRoutes),
  ],
  providers: [LoaderService],
})
export class AdminModule { }
