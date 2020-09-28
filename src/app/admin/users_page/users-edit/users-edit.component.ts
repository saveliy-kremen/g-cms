import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Message } from 'src/app/shared/models/message.model';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { environment } from 'src/environments/environment';
import { UserGrpcService } from 'src/app/shared/services/grpc/user.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.scss']
})
export class UsersEditComponent implements OnInit {
  userForm: FormGroup
  userFormSubmitted: boolean
  userMessage: Message = new Message("success", "")
  userID: number
  user: any = {}
  roles: string[] = environment.roles;
  changePassword: boolean = false;

  constructor(
    private router: Router,
    private loaderService: LoaderService,
    private activeRoute: ActivatedRoute,
    private authService: AuthService,
    private userService: UserGrpcService,
  ) { }

  async ngOnInit() {
    this.userForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      shopName: new FormControl('', Validators.required),
      shopUrl: new FormControl('', Validators.required),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl('',),
      confirmPassword: new FormControl('', this.confirmPassword.bind(this)),
      role: new FormControl(''),
      active: new FormControl(''),
    })
    this.loaderService.showLoader()
    if (this.activeRoute.snapshot.params["id"] != undefined) {
      this.userID = Number(this.activeRoute.snapshot.params["id"])
      try {
        let res: any = await this.userService.user(Number(this.userID)).toPromise()
        this.user = res.user
        console.log(this.user)
        this.userForm.patchValue({ ...this.user })
      } catch (err) {
        this.userMessage = new Message("danger", err.message);
      }
      let me: any = await this.authService.getUser()
      if (me.id === this.userID) {
        this.changePassword = true
      }
    } else {
      this.changePassword = true
    }
    this.loaderService.hideLoader()
  }

  async submitUserForm() {
    this.loaderService.showLoader()
    this.userFormSubmitted = true;
    this.validateAllFormFields(this.userForm);
    if (this.userForm.valid) {
      try {
        this.userForm.value.id = this.user?.id ? Number(this.user?.id) : null
        await this.userService.editUser(this.userForm.value)
        this.userFormSubmitted = false
        this.userMessage = new Message("success", "")
        this.userForm.reset();
        this.router.navigateByUrl("/admin/users");
      } catch (err) {
        console.log(err)
        this.userMessage = new Message("danger", err.message);
      }
    }
    this.loaderService.hideLoader()
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.updateValueAndValidity()
      } else if (control instanceof FormGroup) {
      }
    });
  }

  confirmPassword(control: AbstractControl): { [key: string]: boolean } | null {
    let password = this.userForm && this.userForm.get('password').value;
    let confirmPassword = control.value;

    return confirmPassword === password ? null : { "passwordsNotEqual": true }
  }
}
