import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  constructor(
    private translate: TranslateService
  ) { }

  getValidationMessages(state: any, thingName?: string) {
    let thing: string = state.path || thingName || "this field";
    let messages: string[] = [];
    if (state.errors) {
      for (let errorName in state.errors) {
        switch (errorName) {
          case "required":
            this.translate.get(thing).subscribe((res: string) => {
              messages.push(`Вы должны заполнить "${res}"`);
            });
            break;
          case "email":
            messages.push(`Неверный email`);
            break;
          case "maxlength":
            messages.push(`Поле не должно быть больше ${state.errors[errorName].requiredLength} символов`);
            break;
        }
      }
    }
    return messages;
  }

  getFormValidationMessages(form: any): string[] {
    let messages: string[] = [];
    Object.keys(form.controls).forEach(k => {
      this.getValidationMessages(form.controls[k], k)
        .forEach(m => messages.push(m));
    });
    return messages;
  }
}
