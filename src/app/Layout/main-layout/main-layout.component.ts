import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavbarComponent } from '../../Shared/components/main-navbar/main-navbar.component';
import { AuthService } from '../../core/Services/auth.service';

@Component({
  selector: 'app-main-layout',
  imports: [MainNavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent { 
  constructor(private _authService: AuthService) {
    _authService.validateToken();
  }
}
