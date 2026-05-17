import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
  template: `
    <header class="nav">
      <div class="nav-inner">
        <div class="nav-left">
          <button class="ham" (click)="menuOpen = !menuOpen"><span class="material-icons-round">menu</span></button>
          <a routerLink="/" class="logo">SIFR</a>
        </div>
        <div class="nav-cats">
          <a routerLink="/" class="cat" [routerLinkActiveOptions]="{exact:true}" routerLinkActive="active">Home</a>
          <a routerLink="/category/women" class="cat">Women</a>
          <a routerLink="/category/men" class="cat">Men</a>
          <a routerLink="/category/beauty" class="cat">Beauty</a>
          <a routerLink="/category/accessories" class="cat">Accessories</a>
          <a routerLink="/category/footwear" class="cat">Footwear</a>
          <a routerLink="/offers" class="cat">Offers</a>
        </div>
        <div class="nav-right">
          <button class="icn" (click)="showSearch = !showSearch"><span class="material-icons-round">search</span></button>
          <button class="icn" routerLink="/wishlist"><span class="material-icons-round">favorite_outline</span></button>
          <button class="icn" routerLink="/cart"><span class="material-icons-round">shopping_bag_outline</span><span class="badge" *ngIf="cartCount > 0">{{ cartCount }}</span></button>
          <button class="icn" [routerLink]="authService.isLoggedIn() ? '/profile' : '/login'"><span class="material-icons-round">person_outline</span></button>
        </div>
      </div>
      <div class="search-ol" *ngIf="showSearch">
        <div class="search-bar"><span class="material-icons-round">search</span><input type="text" placeholder="Search..." [(ngModel)]="searchQuery" (keyup.enter)="onSearch()" autofocus /><button class="icn" (click)="showSearch = false"><span class="material-icons-round">close</span></button></div>
      </div>
      <div class="side" *ngIf="menuOpen">
        <div class="side-bg" (click)="menuOpen = false"></div>
        <div class="side-c"><div class="side-h"><span class="logo">SIFR</span><button class="icn" (click)="menuOpen = false"><span class="material-icons-round">close</span></button></div><div class="side-l"><a routerLink="/" (click)="menuOpen = false"><span class="material-icons-round">home_outline</span> Home</a><a routerLink="/categories" (click)="menuOpen = false"><span class="material-icons-round">grid_view_outline</span> Categories</a><a routerLink="/offers" (click)="menuOpen = false"><span class="material-icons-round">local_offer_outline</span> Offers</a><a routerLink="/orders" (click)="menuOpen = false" *ngIf="authService.isLoggedIn()"><span class="material-icons-round">inventory_2_outline</span> Orders</a><a routerLink="/profile" (click)="menuOpen = false" *ngIf="authService.isLoggedIn()"><span class="material-icons-round">person_outline</span> Profile</a></div></div>
      </div>
    </header>
  `,
  styles: [`
    .nav { position:fixed;top:0;left:0;right:0;z-index:1000;background:white;border-bottom:1px solid #F0EBE6; }
    .nav-inner { max-width:1240px;margin:0 auto;display:flex;align-items:center;padding:0 8px;height:60px;gap:4px;justify-content:flex-start; }
    .nav-left { display:flex;align-items:center;gap:4px;flex-shrink:0; }
    .ham { width:36px;height:36px;display:flex;align-items:center;justify-content:center;color:#444;cursor:pointer;border:none;background:none;border-radius:8px;transition:background .15s; }
    .ham:hover { background:#F5F0EB; }
    .logo { font-size:18px;font-weight:700;letter-spacing:1.5px;color:#0A0A0A;white-space:nowrap;text-decoration:none;font-family:Playfair Display,Georgia,serif; }
    .nav-cats { display:none;gap:2px;overflow-x:auto;-ms-overflow-style:none;scrollbar-width:none;flex:1;justify-content:center; } .nav-cats::-webkit-scrollbar { display:none; }
    .cat { padding:6px 12px;font-size:13px;font-weight:500;color:#6B6560;border-radius:8px;white-space:nowrap;transition:all .15s;text-decoration:none; }
    .cat:hover { color:#0A0A0A;background:#F5F0EB; }
    .cat.active { color:#F4A7A7;font-weight:600; }
    .nav-right { display:flex;align-items:center;gap:8px;flex-shrink:0; }
    .icn { display:flex;align-items:center;justify-content:center;color:#6B6560;cursor:pointer;border:none;background:none;border-radius:8px;transition:all .15s;position:relative;padding:6px; }
    .icn:hover { background:#F5F0EB;color:#0A0A0A; }
    .icn .material-icons-round { font-size:22px;line-height:1; }
    .badge { position:absolute;top:-2px;right:-2px;min-width:16px;height:16px;border-radius:8px;background:#F4A7A7;color:white;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 4px;line-height:1; }
    @media(min-width:768px){ .ham{display:none} .nav-cats{display:flex} .nav-inner{justify-content:space-between;padding:0 16px;gap:8px} .icn{padding:8px} .icn .material-icons-round{font-size:24px} .nav-left{gap:8px} }
    .search-ol { position:absolute;top:0;left:0;right:0;background:white;padding:8px 12px;border-bottom:1px solid #F0EBE6;z-index:100;animation:fadeIn .12s; }
    .search-bar { display:flex;align-items:center;gap:8px;max-width:600px;margin:0 auto;background:#F5F0EB;border-radius:10px;padding:0 12px;height:40px; }
    .search-bar input { flex:1;border:none;background:transparent;font-size:14px;color:#0A0A0A;font-family:inherit;outline:none; }
    .search-bar input::placeholder { color:#A69F99; }
    .side { position:fixed;top:0;left:0;right:0;bottom:0;z-index:2000; }
    .side-bg { position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.3); }
    .side-c { position:absolute;top:0;left:0;width:280px;height:100%;background:white;display:flex;flex-direction:column;animation:slideIn .2s; }
    .side-h { display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #F0EBE6;min-height:60px; }
    .side-h .logo { font-size:20px; }
    .side-l { display:flex;flex-direction:column;padding:8px;gap:2px;flex:1;overflow-y:auto; }
    .side-l a { display:flex;align-items:center;gap:12px;padding:12px 14px;border-radius:10px;font-size:14px;font-weight:500;color:#1A1A1A;text-decoration:none;transition:background .15s;line-height:1; }
    .side-l a:hover { background:#F5F0EB; }
    .side-l a .material-icons-round { color:#F4A7A7;font-size:20px;width:20px;text-align:center; }
    @keyframes slideIn { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  `],
})
export class NavbarComponent implements OnInit {
  searchQuery = ''; showSearch = false; menuOpen = false; cartCount = 0;
  constructor(public authService: AuthService, private apiService: ApiService, private router: Router) {}
  ngOnInit() { if (this.authService.isLoggedIn()) this.apiService.getCart().subscribe({ next: (res) => { this.cartCount = res.data.items.reduce((s, i) => s + i.quantity, 0); } }); }
  onSearch() { if (this.searchQuery.trim()) { this.router.navigate(['/search'], { queryParams: { q: this.searchQuery.trim() } }); this.searchQuery = ''; this.showSearch = false; } }
}
