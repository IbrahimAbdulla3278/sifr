import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../shared/models/models';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  template: `
    <div class="page-content">
      <div class="search-header">
        <button class="back-button" routerLink="/">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <div class="search-box">
          <span class="material-icons-round">search</span>
          <input type="text" [(ngModel)]="query" (keyup.enter)="search()" placeholder="Search products..." />
          <button class="clear-btn" *ngIf="query" (click)="query=''; search()">
            <span class="material-icons-round">close</span>
          </button>
        </div>
      </div>

      <div class="results-info" *ngIf="!loading">
        <p *ngIf="products.length > 0">{{ totalCount }} results found</p>
      </div>

      <div class="product-grid" *ngIf="!loading && products.length > 0">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>

      <div class="empty-state" *ngIf="!loading && products.length === 0 && query">
        <span class="material-icons-round empty-icon">search_off</span>
        <h3>No results found</h3>
        <p>Try different keywords or check spelling</p>
      </div>
    </div>
  `,
  styles: [`
    .page-content { max-width: 1200px; margin: 0 auto; padding: 16px; }
    .search-header { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
    .back-button {
      display: flex; align-items: center; justify-content: center;
      width: 40px; height: 40px; border-radius: 50%; background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer; border: none;
    }
    .search-box {
      flex: 1; display: flex; align-items: center; gap: 8px;
      padding: 0 12px; background: white; border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06); height: 44px;
    }
    .search-box input { flex: 1; border: none; outline: none; font-size: 15px; font-family: inherit; }
    .clear-btn { display: flex; cursor: pointer; border: none; background: none; color: #a4b0be; }
    .results-info { margin-bottom: 16px; font-size: 14px; color: #747d8c; }
    .product-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 12px; }
    @media (min-width:768px) { .product-grid { grid-template-columns: repeat(3,1fr); gap: 16px; } }
    @media (min-width:1024px) { .product-grid { grid-template-columns: repeat(4,1fr); gap: 20px; } }
    .empty-state { text-align: center; padding: 48px 16px; }
    .empty-icon { font-size: 64px; color: #a4b0be; }
    .empty-state h3 { font-size: 18px; margin: 16px 0 8px; }
    .empty-state p { color: #747d8c; }
  `],
})
export class SearchComponent implements OnInit {
  query = '';
  products: Product[] = [];
  loading = false;
  totalCount = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['q']) {
        this.query = params['q'];
        this.search();
      }
    });
  }

  search() {
    if (!this.query.trim()) {
      this.products = [];
      this.totalCount = 0;
      return;
    }
    this.loading = true;
    this.apiService.getProducts({ search: this.query, page: 0, size: 20 }).subscribe(res => {
      this.products = res.data.content;
      this.totalCount = res.data.totalElements;
      this.loading = false;
    });
  }
}
