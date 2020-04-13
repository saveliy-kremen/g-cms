import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileInputComponent } from './file-input.component';

@NgModule({
  declarations: [FileInputComponent],
  imports: [CommonModule],
  exports: [FileInputComponent]
})
export class FileInputModule { }
