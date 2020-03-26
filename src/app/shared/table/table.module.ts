import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TableComponent } from './table.component';
import { MaterialModule } from '../material/material.module';
import { SafeHtmlPipe } from '../pipes/sanitize.pipe';


@NgModule({
  declarations: [TableComponent, SafeHtmlPipe],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule
  ],
  exports: [TableComponent]
})
export class TableModule { }
