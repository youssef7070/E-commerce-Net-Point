import { Component } from '@angular/core';
import { AuthNavbarComponent } from "../../Features/auth-navbar/auth-navbar.component";

@Component({
  selector: 'app-auth-layout',
  imports: [AuthNavbarComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
})
export class AuthLayoutComponent {}
