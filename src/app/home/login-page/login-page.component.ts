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
    if (this.loginForm.valid) {
      this.loginFormSubmitted = true
      this.loginMessage = null;
      this.authService.login(this.loginForm.value).subscribe(() => {
        this.loginForm.reset()
        this.loginFormSubmitted = false
        this.router.navigate(['/admin'])
      }, (err) => {
        console.log(err)
        this.loginFormSubmitted = false
        this.loginMessage = new Message("danger", err.message)
      })
    }
  }
}
