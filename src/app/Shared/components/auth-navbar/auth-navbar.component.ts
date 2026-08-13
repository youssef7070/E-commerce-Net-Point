import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MyTranslationService } from '../../../core/services/my-translation.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-auth-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './auth-navbar.component.html',
  styleUrl: './auth-navbar.component.scss',
})
export class AuthNavbarComponent {
  private readonly translationService = inject(MyTranslationService);
  selectLang(lang:string){
    this.translationService.changeLang(lang);
  }
  toggleLanguage() {
    let currentLang = localStorage.getItem('lang') || 'en',
        newLang = currentLang === 'en' ? 'ar' : 'en';
    this.selectLang(newLang);
  }
  ngOnInit(): void {
      this.translationService.changeDirection();
    }
}
