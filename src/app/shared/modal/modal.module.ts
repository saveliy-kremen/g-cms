import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';

import { ModalService } from './modal.service';
import { ModalComponent } from './modal.component';
import { MatDividerModule } from '@angular/material/divider';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    MatDialogModule,
    MatDividerModule
  ],
  providers: [ModalService],
  entryComponents: [ModalComponent]
})
export class ModalModule { }
