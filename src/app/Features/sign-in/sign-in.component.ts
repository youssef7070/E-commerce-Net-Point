import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { InputComponent } from "../../Shared/components/input/input.component";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnDestroy {
  private readonly authServices = inject(AuthService);
  private readonly router = inject(Router);

  private subscription: Subscription = new Subscription();
  isLoading: boolean = false;
  msgError: string = '';

  signInForm = new FormGroup({
    email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  submitForm(): void {
    if (this.signInForm.valid) {
      this.subscription.unsubscribe();
      this.isLoading = true;

      this.subscription = this.authServices.signIn(this.signInForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('token', res.token);
          if (res.message === 'success') {
            this.msgError = '';
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 500);
          }
          this.isLoading = false;
        },
        error: (err) => {
          this.msgError = err.error?.message || 'there are error';
          this.isLoading = false;
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}