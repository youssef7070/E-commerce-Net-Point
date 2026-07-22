import { Component } from '@angular/core';
import { MainNavbarComponent } from "../../Features/main-navbar/main-navbar.component";

@Component({
  selector: 'app-main-layout',
  imports: [MainNavbarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {}
