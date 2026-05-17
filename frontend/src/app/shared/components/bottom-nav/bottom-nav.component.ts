import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <nav class="bnav">
      <a routerLink="/" class="item" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
        <span class="lbl">Home</span>
      </a>
      <a routerLink="/categories" class="item" routerLinkActive="active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
        <span class="lbl">Categories</span>
      </a>
      <a routerLink="/offers" class="item" routerLinkActive="active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        <span class="lbl">Discover</span>
      </a>
      <a routerLink="/wishlist" class="item" routerLinkActive="active">
        <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
        <span class="lbl">Wishlist</span>
      </a>
    </nav>
  `,
  styles: [`
    .bnav { position:fixed;bottom:0;left:0;right:0;z-index:1000;display:flex;align-items:center;justify-content:space-around;background:white;border-top:1px solid #F0F0F0;padding:4px 0;padding-bottom:env(safe-area-inset-bottom,0);height:56px; }
    .item { display:flex;flex-direction:column;align-items:center;gap:1px;padding:4px 8px;cursor:pointer;transition:all .15s;text-decoration:none;color:#ADB5BD;min-width:48px; }
    .icon { width:22px;height:22px;transition:all .15s; }
    .lbl { font-size:10px;font-weight:500;transition:all .15s; }
    .item.active { color:#F4A7A7; }
    @media(min-width:768px){ .bnav{display:none} }
  `],
})
export class BottomNavComponent {}
