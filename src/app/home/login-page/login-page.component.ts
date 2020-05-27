import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from '../../shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup
  loginFormSubmitted = false;
  loginMessage: Message;

  constructor(
    private router: Router,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  submitLoginForm() {
    this.loginFormSubmitted = true
    this.loginMessage = null;
    if (this.loginForm.valid) {
      this.loginFormSubmitted = false

      this.authService.login(this.loginForm.value).subscribe(() => {
        this.loginForm.reset()
        this.loginMessage = null
        this.router.navigate(['/admin'])
        this.loginFormSubmitted = false
      }, (err) => {
        console.log(err)
        this.loginFormSubmitted = false
        this.loginMessage = new Message("danger", err.message)
      })
    }
  }
}
