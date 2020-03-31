import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { IndexComponent } from './index/index.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { PropertiesComponent } from './properties/properties.component';
import { PropertyEditComponent } from './properties/property-edit/property-edit.component';
import { ItemsComponent } from './items/items.component';

export const AdminRoutes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', component: IndexComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/edit/:alias', component: CategoryEditComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'properties/:mode', component: PropertyEditComponent },
      { path: 'properties/:mode/:id', component: PropertyEditComponent },
      { path: 'items', component: ItemsComponent },
      { path: 'db', component: IndexComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

