import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { User } from 'src/app/shared/api/v1/user_pb';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  showImportMenu = false;
  sideNavOpened = true;
  sideNavMode: 'side' | 'over' = 'side';
  user: User.AsObject
  subscriptions: Subscription[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.userChange.subscribe((value) => {
      this.user = value
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
