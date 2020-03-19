import { Component } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';

  constructor(
    private auth: AuthService,
    translate: TranslateService
  ) {
    translate.addLangs(['ru'])
    translate.setDefaultLang('ru');
    translate.use('ru');
  }

  ngOnInit() {
    this.auth.profileMe();
  }
}
