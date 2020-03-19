import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AdminRoutes } from './admin.routing';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { IndexComponent } from './index/index.component';
import { MaterialModule } from '../shared/material/material.module';
import { UserGrpcService } from '../shared/services/user.service';

@NgModule({
  declarations: [AdminLayoutComponent, IndexComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(AdminRoutes),
  ],
  exports: [
    MaterialModule,
  ],
})
export class AdminModule { }
