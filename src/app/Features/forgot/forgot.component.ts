import { Component, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.scss',
})
export class ForgotComponent {


  private readonly authService = inject(AuthService)
  private readonly route = inject(Router)

  // private readonly fb = inject(FormBuilder)

  step = signal<number>(1);

  // form control

  email: FormControl = new FormControl("", [Validators.required]);

  code: FormControl = new FormControl("", [Validators.required]);

  password: FormControl = new FormControl("", [Validators.required]);

  // submit Email
  submitEmail(e: Event): void {
    // prvent reload
    e.preventDefault();
    if (this.email.valid) {
      // create object and send value
      const data = {
        email: this.email.value
      }
      // send data api

      this.authService.forgotPassword(data).subscribe({
        next: (res) => {
          this.step.set(2)
        }
      })

    }

  }

  // submitCode
  submitCode(e: Event): void {
    // prvent reload
    e.preventDefault();
    if (this.code.valid) {
      // create sobject and send value
      const data = {
        resetCode: this.code.value
      }
      // send data api

      this.authService.verifyResetCode(data).subscribe({
        next: (res) => {
          this.step.set(3)
        }
      })

    }

  }


  // submitPassword
  submitPassword(e: Event): void {
    // prvent reload
    e.preventDefault();
    if (this.password.valid) {
      // create object and send value
      const data = {
        email: this.email.value,
        newPassword: this.password.value
      }
      // send data api

      this.authService.resetPassword(data).subscribe({
        next: (res) => {
          this.route.navigate(['/signIn'])
        }
      })

    }

  }

}
