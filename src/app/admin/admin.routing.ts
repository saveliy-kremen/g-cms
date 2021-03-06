import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { IndexComponent } from './index-page/index.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyEditComponent } from './properties/property-edit/property-edit.component';
import { ItemsComponent } from './items/items.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { XmlImportComponent } from './xml-import/xml-import.component';
import { AdminAuthGuard } from '../shared/guards/guards';
import { OrdersPageComponent } from './orders-page/orders-page.component';
import { UsersComponent } from './users_page/users.component';
import { UsersEditComponent } from './users_page/users-edit/users-edit.component';
import { SettingsComponent } from './settings/settings.component';

export const AdminRoutes: Routes = [
  {
    path: '', component: AdminLayoutComponent, canActivate: [AdminAuthGuard], children: [
      { path: '', component: IndexComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/create', component: UsersEditComponent },
      { path: 'users/edit/:id', component: UsersEditComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/edit/:alias', component: CategoryEditComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'properties/:mode', component: PropertyEditComponent },
      { path: 'properties/:mode/:id', component: PropertyEditComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'items/:mode', component: ItemEditComponent },
      { path: 'items/:mode/:id', component: ItemEditComponent },
      { path: 'items/:mode/:id/offers/:offerMode', component: ItemEditComponent },
      { path: 'items/:mode/:id/offers/:offerMode/:offerID', component: ItemEditComponent },
      { path: 'xml_import', component: XmlImportComponent },
      { path: 'orders', component: OrdersPageComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

