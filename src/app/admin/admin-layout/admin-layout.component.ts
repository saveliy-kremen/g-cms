import { Component, OnInit } from '@angular/core';
import { UserResponse, User } from 'src/app/shared/api/v1/user_pb';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  showMenu = false;
  sideNavOpened = true;
  sideNavMode: 'side' | 'over' = 'side';
  user: User

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.userChange.subscribe((value) => {
      this.user = value
    }, (err) => {
      console.log(err)
    })
  }

  toggleSidebar() {
    this.sideNavOpened = !this.sideNavOpened;
  }

  onLogout() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }
}
