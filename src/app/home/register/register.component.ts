import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as grpcWeb from 'grpc-web';

import { Message } from '../../shared/models/message.model';
import { RegisterRequest, AuthResponse } from '../../shared/api/v1/user_pb';
import { UserServiceClient } from '../../shared/api/v1/UserServiceClientPb';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  registerFormSubmitted: boolean = false;
  registerMessage: Message = new Message("success", "");

  constructor(
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    })
  }

  submitRegisterForm() {
    this.registerFormSubmitted = true
    if (this.registerForm.valid) {
      try {
        console.log(this.registerForm.value)
        this.registerFormSubmitted = false
        this.registerMessage = new Message("success", "")
        this.registerForm.reset()

        var userService = new UserServiceClient('http://alllead.best:2091');

        var request = new RegisterRequest();
        request.setFullname(this.registerForm.value.fullname);
        request.setEmail(this.registerForm.value.email);
        request.setPhone(this.registerForm.value.phone);
        request.setPassword(this.registerForm.value.password);

        const call = userService.register(request, { 'custom-header-1': 'value1' }, function (err: grpcWeb.Error, response: AuthResponse) {
          console.log(err, response);
          //console.log(response.getMessage());
        });

        call.on('status', (status: grpcWeb.Status) => {
          console.log(status);
        });

        //this.router.navigateByUrl("/admin")
      } catch (err) {
        this.registerMessage = new Message("danger", err.message)
        console.log(this.registerMessage)
      }
    }
  }
}
