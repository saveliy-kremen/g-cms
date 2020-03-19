import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Message } from '../../shared/models/message.model';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  registerFormSubmitted: boolean = false;
  registerMessage: Message;

  constructor(
    private router: Router,
    private authService: AuthService
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
    this.registerMessage = null;
    if (this.registerForm.valid) {
      try {
        this.registerFormSubmitted = false
        this.authService.register(this.registerForm.value).subscribe(() => {
          this.registerForm.reset()
          this.registerMessage = new Message("success", "")
          this.router.navigate(['/admin'])
          this.registerFormSubmitted = false
        }, (err) => {
          this.registerFormSubmitted = false
          this.registerMessage = new Message("danger", err.message)
        })
      } catch (err) {
        this.registerMessage = new Message("danger", err.message)
      }
    }
  }
}
