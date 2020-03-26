import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { IndexComponent } from './index/index.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditComponent } from './categories/category-edit/category-edit.component';
import { PropertiesComponent } from './properties/properties.component';

export const AdminRoutes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', component: IndexComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/edit/:alias', component: CategoryEditComponent },
      { path: 'properties', component: PropertiesComponent },
      { path: 'db', component: IndexComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

