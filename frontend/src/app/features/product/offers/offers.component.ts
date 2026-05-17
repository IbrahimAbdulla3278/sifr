import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { SkeletonCardComponent } from '../../../shared/components/skeleton-card/skeleton-card.component';
import { Product } from '../../../shared/models/models';

@Component({
  selector: 'app-offers',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent, SkeletonCardComponent],
  template: `
    <div class="page-content">
      <div class="page-header">
        <button class="back-button" routerLink="/">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <h1>Best Offers</h1>
      </div>

      <div class="product-grid" *ngIf="!loading">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>

      <div class="skeleton-grid" *ngIf="loading">
        <app-skeleton-card *ngFor="let _ of [].constructor(6)"></app-skeleton-card>
      </div>
    </div>
  `,
  styles: [`
    .page-content { max-width: 1200px; margin: 0 auto; padding: 16px; }
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .back-button {
      display: flex; align-items: center; justify-content: center;
      width: 40px; height: 40px; border-radius: 50%; background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer; border: none;
    }
    .page-header h1 { font-size: 20px; font-weight: 700; }
    .product-grid, .skeleton-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
    @media (min-width:768px) { .product-grid, .skeleton-grid { grid-template-columns: repeat(3,1fr); gap: 16px; } }
    @media (min-width:1024px) { .product-grid, .skeleton-grid { grid-template-columns: repeat(4,1fr); gap: 20px; } }
  `],
})
export class OffersComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.getProducts({ page: 0, size: 50, sort: 'newest' }).subscribe(res => {
      this.products = res.data.content.filter(p => p.discountPrice && p.discountPrice < p.price);
      this.loading = false;
    });
  }
}
