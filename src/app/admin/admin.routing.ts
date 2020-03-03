import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { IndexComponent } from './index/index.component';

export const AdminRoutes: Routes = [
  {
    path: '', component: AdminLayoutComponent, children: [
      { path: '', component: IndexComponent },
      { path: 'db', component: IndexComponent },
      { path: '**', redirectTo: '' }
    ]
  }
];

