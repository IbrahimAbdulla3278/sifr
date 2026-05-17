import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { BottomNavComponent } from '../../shared/components/bottom-nav/bottom-nav.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, BottomNavComponent, FooterComponent],
  template: `<app-navbar></app-navbar><main class="app-container"><router-outlet></router-outlet></main><app-footer></app-footer><app-bottom-nav></app-bottom-nav>`,
  styles: [`.app-container { padding-top:56px;padding-bottom:56px;min-height:100vh; } @media(min-width:768px){ .app-container{padding-bottom:0} }`],
})
export class MainLayoutComponent {}
