import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { TranslateModule } from "@ngx-translate/core"
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { NgsgModule } from 'ng-sortgrid'
import { NgDragDropModule } from 'ng-drag-drop';

import { AdminRoutes } from './admin.routing'
import { AdminLayoutComponent } from './admin-layout/admin-layout.component'
import { IndexComponent } from './index-page/index.component'
import { MaterialModule } from '../shared/material/material.module'
import { CategoriesComponent } from './categories/categories.component'
import { ModalModule } from '../shared/modal/modal.module'
import { LoaderService } from '../shared/services/loader.service'
import { CategoryEditComponent } from './categories/category-edit/category-edit.component'
import { ValidationModule } from '../shared/validation/validation.module'
import { PropertiesComponent } from './properties/properties.component'
import { TableModule } from '../shared/table/table.module'
import { PropertyEditComponent } from './properties/property-edit/property-edit.component'
import { PropertyValueComponent } from './properties/property-value/property-value.component'
import { ItemsComponent } from './items/items.component'
import { ItemEditComponent } from './items/item-edit/item-edit.component'
import { UploadService } from '../shared/services/upload.service';
import { XmlImportComponent } from './xml-import/xml-import.component'
import { FileInputModule } from '../shared/file-input/file-input.module'
import { AdminAuthGuard } from '../shared/guards/guards'
import { OrdersPageComponent } from './orders-page/orders-page.component'
import { VendorGrpcService } from '../shared/services/grpc/vendor.service'
import { AdminCategoryGrpcService } from '../shared/services/grpc/admin-category.service'
import { AdminItemGrpcService } from '../shared/services/grpc/admin-item.service'
import { AdminPropertyGrpcService } from '../shared/services/grpc/admin-property.service'
import { CurrencyGrpcService } from '../shared/services/grpc/currency.service'
import { GrpcHelper } from '../shared/services/grpc/helpers/grpc-helper'

@NgModule({
  declarations: [
    AdminLayoutComponent,
    IndexComponent,
    CategoriesComponent,
    CategoryEditComponent,
    PropertiesComponent,
    PropertyEditComponent,
    PropertyValueComponent,
    ItemsComponent,
    ItemEditComponent,
    XmlImportComponent,
    OrdersPageComponent
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
    NgsgModule,
    FileInputModule,
    NgDragDropModule.forRoot(),
    RouterModule.forChild(AdminRoutes),
  ],
  providers: [
    LoaderService,
    UploadService,
    AdminAuthGuard,
    GrpcHelper,
    AdminCategoryGrpcService,
    AdminItemGrpcService,
    AdminPropertyGrpcService,
    CurrencyGrpcService,
    VendorGrpcService
  ],
})
export class AdminModule { }
