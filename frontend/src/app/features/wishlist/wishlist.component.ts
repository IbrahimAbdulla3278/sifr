import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../shared/models/models';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <div class="page-content">
      <div class="page-header">
        <button class="back-button" routerLink="/">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <h1>My Wishlist</h1>
      </div>

      <div class="product-grid" *ngIf="products.length > 0">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>

      <div class="empty-state" *ngIf="products.length === 0">
        <span class="material-icons-round empty-icon">favorite_border</span>
        <h3>Your wishlist is empty</h3>
        <p>Save your favorite items here</p>
        <button class="shop-btn" routerLink="/">Discover Products</button>
      </div>
    </div>
  `,
  styles: [`
    .page-content { max-width: 1200px; margin: 0 auto; padding: 16px; }
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .back-button { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer; border: none; }
    .page-header h1 { font-size: 20px; font-weight: 700; }
    .product-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
    @media (min-width:768px) { .product-grid { grid-template-columns: repeat(3,1fr); gap: 16px; } }
    @media (min-width:1024px) { .product-grid { grid-template-columns: repeat(4,1fr); gap: 20px; } }
    .empty-state { text-align: center; padding: 48px 16px; }
    .empty-icon { font-size: 64px; color: #a4b0be; }
    .empty-state h3 { font-size: 18px; margin: 16px 0 8px; }
    .empty-state p { color: #747d8c; margin-bottom: 24px; }
    .shop-btn { padding: 12px 32px; border-radius: 12px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; }
  `],
})
export class WishlistComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.apiService.getWishlist().subscribe(res => this.products = res.data);
    }
  }
}
