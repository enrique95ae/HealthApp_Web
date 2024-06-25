import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  currentUrl: string;

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
  }

  isNutritionActive(): boolean {
    return this.currentUrl.includes('/create-food') || this.currentUrl.includes('/add-meal') || this.currentUrl.includes('/history');
  }

  onRouterLinkActive(): void {
  }
}