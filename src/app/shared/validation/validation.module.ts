import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { ValidationService } from './validation.service';
import { ValidationMessageComponent } from './validation.message.component';

@NgModule({
  declarations: [ValidationMessageComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    ValidationMessageComponent,
  ],
  providers: [ValidationService],
})
export class ValidationModule { }
