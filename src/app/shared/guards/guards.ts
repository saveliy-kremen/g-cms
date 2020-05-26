import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot, RouterStateSnapshot,
  Router
} from "@angular/router";
import { AuthService } from '../services/auth.service';
import { environment } from "../../../environments/environment.prod";

@Injectable()
export class AdminAuthGuard {
  constructor(private router: Router,
    private auth: AuthService) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const user = await this.auth.getUser();
    if (user && environment.roles[user.role] === "Администратор") {
      return true;
    }
    this.router.navigateByUrl("/");
    return false;
  }
}
