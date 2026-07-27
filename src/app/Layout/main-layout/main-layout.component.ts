import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainNavbarComponent } from '../../Shared/components/main-navbar/main-navbar.component';

@Component({
  selector: 'app-main-layout',
  imports: [MainNavbarComponent, RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent { }
