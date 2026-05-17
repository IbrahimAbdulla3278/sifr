import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-layout">
      <header class="admin-header">
        <a routerLink="/" class="back-link">
          <span class="material-icons-round">arrow_back</span>
        </a>
        <h1>Admin Dashboard</h1>
      </header>

      <div class="admin-nav">
        <a routerLink="/admin/categories" routerLinkActive="active" class="nav-link">
          <span class="material-icons-round">category</span>
          <span>Categories</span>
        </a>
        <a routerLink="/admin/products" routerLinkActive="active" class="nav-link">
          <span class="material-icons-round">inventory</span>
          <span>Products</span>
        </a>
        <a routerLink="/admin/banners" routerLinkActive="active" class="nav-link">
          <span class="material-icons-round">slideshow</span>
          <span>Banners</span>
        </a>
        <a routerLink="/admin/orders" routerLinkActive="active" class="nav-link">
          <span class="material-icons-round">receipt_long</span>
          <span>Orders</span>
        </a>
        <a routerLink="/admin/add-admin" routerLinkActive="active" class="nav-link">
          <span class="material-icons-round">admin_panel_settings</span>
          <span>Add Admin</span>
        </a>
      </div>

      <main class="admin-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout { min-height: 100vh; background: #f8f9fa; }
    .admin-header {
      display: flex; align-items: center; gap: 12px;
      padding: 16px 20px; background: white; border-bottom: 1px solid #e9ecef;
    }
    .back-link { display: flex; cursor: pointer; color: #667eea; text-decoration: none; }
    .admin-header h1 { font-size: 20px; font-weight: 700; }
    .admin-nav {
      display: flex; overflow-x: auto; gap: 8px; padding: 12px 16px;
      background: white; border-bottom: 1px solid #e9ecef;
      -ms-overflow-style: none; scrollbar-width: none;
    }
    .admin-nav::-webkit-scrollbar { display: none; }
    .nav-link {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px; border-radius: 10px; font-size: 13px; font-weight: 500;
      white-space: nowrap; text-decoration: none; color: #747d8c; transition: all 0.2s;
    }
    .nav-link.active { background: rgba(102,126,234,0.1); color: #667eea; font-weight: 600; }
    .nav-link .material-icons-round { font-size: 20px; }
    .admin-content { max-width: 1000px; margin: 0 auto; padding: 20px 16px; }
  `],
})
export class AdminComponent {}
