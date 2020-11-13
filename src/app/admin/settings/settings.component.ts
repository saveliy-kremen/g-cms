import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from 'src/app/shared/models/message.model';
import { AdminSettingsGrpcService } from 'src/app/shared/services/grpc/admin-settings.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup
  settingsFormSubmitted: boolean
  settingsMessage: Message = new Message("success", "")

  constructor(
    private router: Router,
    private settingsService: AdminSettingsGrpcService,
    private loaderService: LoaderService,
  ) { }

  async ngOnInit() {
    this.settingsForm = new FormGroup({
      rozetkaMarkup: new FormControl('', Validators.required),
    })
    let res: any = await this.settingsService.settings().toPromise();
    this.settingsForm.patchValue(res.settings)
    this.loaderService.showLoader()
    this.loaderService.hideLoader()
  }

  async submitSettingsForm() {
    this.loaderService.showLoader()
    this.settingsFormSubmitted = true;
    if (this.settingsForm.valid) {
      try {
        await this.settingsService.editSettings(this.settingsForm.value).toPromise();
        this.settingsFormSubmitted = false
        this.settingsMessage = new Message("success", "")
        this.settingsForm.reset();
        this.router.navigateByUrl("/admin");
      } catch (err) {
        console.log(err)
        this.settingsMessage = new Message("danger", err.message);
      }
    }
    this.loaderService.hideLoader()
  }
}
