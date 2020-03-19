import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { ValidationService } from './validation.service';

@Component({
  selector: 'validator-message',
  template: `
    <mat-error *ngIf="(submitted || field.dirty) && field.invalid">
      <p *ngFor="let error of validation.getValidationMessages(field, title)" style="margin: 0;">
        {{error}}
      </p>
    </mat-error>
  `
})
export class ValidationMessageComponent {
  @Input() field: FormControl;
  @Input() submitted: boolean;
  @Input() title: string;

  constructor(
    public validation: ValidationService,
  ) { }
}