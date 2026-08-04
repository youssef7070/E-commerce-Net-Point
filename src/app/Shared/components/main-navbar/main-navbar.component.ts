import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-main-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './main-navbar.component.html',
  styleUrl: './main-navbar.component.scss',
})
export class MainNavbarComponent {
  constructor(private _authService: AuthService) {
  }

  logout(): void {
    this._authService.logout();
  }
}
