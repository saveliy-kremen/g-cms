import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/shared/api/v1/user_pb';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  showImportMenu = false
  sideNavOpened = true
  sideNavMode: 'side' | 'over' = 'side'
  user: User.AsObject
  subscriptions: Subscription[] = []
  public loading: boolean

  constructor(
    private authService: AuthService,
    private router: Router,
    private loaderService: LoaderService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.userChange.subscribe((value) => {
      this.user = value
      this.ref.detectChanges();
    }, (err) => {
      console.log(err)
    }))
    this.subscriptions.push(this.loaderService.loader$.subscribe((value) => {
      this.loading = value
      this.ref.detectChanges();
    }, (err) => {
      console.log(err)
    }))
  }

  ngOnDestroy() {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

  toggleSidebar() {
    this.sideNavOpened = !this.sideNavOpened;
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
