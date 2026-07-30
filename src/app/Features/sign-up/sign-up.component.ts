import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { InputComponent } from '../../Shared/components/input/input.component';
import { SignUpData } from '../../core/Interfaces/signup.interface';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule, InputComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private readonly authServices = inject(AuthService)
  private readonly router = inject(Router);

  subscription: Subscription = new Subscription();
  flag: boolean = true;
  isLoading: boolean = false;
  msgError: string = "";

  signUpForm = new FormGroup(
    {
      name: new FormControl('', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)] }),
      password: new FormControl('', { validators: [Validators.required, Validators.pattern(/^\w{6,}$/)] }),
      rePassword: new FormControl('', { validators: [Validators.required, this.confirmPassword] }),
      phone: new FormControl('', { validators: [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
    }, { validators: this.confirmPassword }
  )

  confirmPassword(group: AbstractControl) {
    const passwordControl = group.get('password');
    const rePasswordControl = group.get('rePassword');

    if (!passwordControl || !rePasswordControl) {
      return null;
    }
    // passwordControl not equale rePasswordControl
    // set error on rePassword (make mismatch true)
    if (passwordControl.value !== rePasswordControl.value) {
      rePasswordControl.setErrors({ mismatch: true });
      return { mismatch: true };
    }
    else {
      // passwordControl equale rePasswordControl
      if (rePasswordControl.hasError('mismatch')) {
        rePasswordControl.setErrors(null);
      }
      return null;
    }
  }

  submitForm(): void {
    console.log(this.signUpForm);
    if (this.signUpForm.valid) {

      const data = this.signUpForm.value as SignUpData;

      // cancel last subscription
      // appear the loading icon 
      this.subscription.unsubscribe();
      this.isLoading = true;
      // return object have data to Api
      this.subscription = this.authServices.SignUp(data).subscribe({
        next: (res) => {
          console.log(res);
          // if it is succes
          if (res.message === 'success') {
            this.msgError = "";
            setTimeout(() => {
              this.router.navigate(['/signIn']);
            }, 1000);
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.msgError = err.error.message;
          this.isLoading = false;
        },
      });
    }
    else {
      this.signUpForm.markAllAsTouched();
    }
  }
}
