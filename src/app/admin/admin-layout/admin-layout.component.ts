import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  showMenu = false;
  sideNavOpened = true;
  sideNavMode: 'side' | 'over' = 'side';

  constructor() { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sideNavOpened = !this.sideNavOpened;
  }

  onLoggedout() {
    //localStorage.removeItem('isLoggedin');
    //this.router.navigate(['/login']);
  }
}
