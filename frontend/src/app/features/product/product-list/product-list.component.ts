import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { Product, Category } from '../../../shared/models/models';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  template: `
    <div class="plist">
      <div class="plist-head">
        <button class="back" routerLink="/categories"><span class="material-icons-round">arrow_back</span></button>
        <div>
          <h1>{{ category?.name || 'Products' }}</h1>
          <span class="count" *ngIf="!loading">{{ totalCount }} products</span>
        </div>
        <button class="filter-toggle" (click)="showFilters = !showFilters">
          <span class="material-icons-round">tune</span>
        </button>
      </div>

      <div class="sort-bar">
        <button *ngFor="let opt of sortOptions" [class.active]="sort === opt.value" (click)="setSort(opt.value)" class="sort-chip">{{ opt.label }}</button>
      </div>

      <div class="filter-panel" *ngIf="showFilters">
        <div class="fp-row">
          <div class="fp-group">
            <label>Price</label>
            <div class="fp-inputs">
              <input type="number" [(ngModel)]="minPrice" placeholder="Min" (change)="applyFilters()" />
              <span>&ndash;</span>
              <input type="number" [(ngModel)]="maxPrice" placeholder="Max" (change)="applyFilters()" />
            </div>
          </div>
          <div class="fp-group">
            <label>Rating</label>
            <div class="fp-chips">
              <button *ngFor="let r of [4,3,2,1]" [class.active]="minRating === r" (click)="setRating(r)">{{ r }}+</button>
            </div>
          </div>
        </div>
        <button class="fp-clear" (click)="clearFilters()">Clear Filters</button>
      </div>

      <div class="grid" *ngIf="!loading">
        <app-product-card *ngFor="let product of products" [product]="product"></app-product-card>
      </div>

      <div class="grid-skel" *ngIf="loading">
        <div class="skel" *ngFor="let _ of [].constructor(6)">
          <div class="skel-img"></div><div class="skel-body"><div class="skel-l"></div><div class="skel-l s60"></div></div>
        </div>
      </div>

      <div class="load" *ngIf="hasMore && !loading">
        <button (click)="loadMore()">Load More</button>
      </div>

      <div class="empty" *ngIf="!loading && products.length === 0">
        <span class="material-icons-round">search_off</span>
        <h3>No products found</h3>
        <p>Try adjusting your filters</p>
      </div>
    </div>
  `,
  styles: [`
    .plist { padding: 0 16px 24px; max-width: 1200px; margin: 0 auto; }
    .plist-head { display: flex; align-items: center; gap: 12px; padding: 14px 0; }
    .back { width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 10px; color: #444; cursor: pointer; transition: background 0.2s; flex-shrink: 0; }
    .back:hover { background: #F5F5F5; }
    .plist-head h1 { font-size: 18px; font-weight: 600; }
    .count { font-size: 12px; color: #999; }
    .filter-toggle { margin-left: auto; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; border-radius: 10px; color: #444; cursor: pointer; transition: all 0.2s; background: #F5F5F5; }
    .filter-toggle:hover { background: #E5E5E5; }

    .sort-bar { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 12px; -ms-overflow-style: none; scrollbar-width: none; }
    .sort-bar::-webkit-scrollbar { display: none; }
    .sort-chip { padding: 6px 14px; font-size: 12px; font-weight: 500; color: #666; background: #F5F5F5; border-radius: 8px; cursor: pointer; white-space: nowrap; transition: all 0.2s; border: none; }
    .sort-chip.active { background: #111; color: white; }
    .sort-chip:hover:not(.active) { background: #E5E5E5; }

    .filter-panel { background: #FAFAFA; border-radius: 12px; padding: 16px; margin-bottom: 16px; border: 1px solid #F0F0F0; }
    .fp-row { display: flex; gap: 16px; flex-wrap: wrap; }
    .fp-group { flex: 1; min-width: 180px; }
    .fp-group label { font-size: 12px; font-weight: 600; color: #111; display: block; margin-bottom: 6px; }
    .fp-inputs { display: flex; align-items: center; gap: 6px; }
    .fp-inputs input { width: 80px; padding: 8px 10px; border: 1px solid #E0E0E0; border-radius: 8px; font-size: 13px; font-family: inherit; }
    .fp-inputs input:focus { border-color: #111; }
    .fp-inputs span { color: #999; font-size: 13px; }
    .fp-chips { display: flex; gap: 6px; }
    .fp-chips button { padding: 6px 14px; font-size: 12px; font-weight: 500; color: #666; background: white; border: 1px solid #E0E0E0; border-radius: 8px; cursor: pointer; transition: all 0.2s; }
    .fp-chips button.active { background: #111; color: white; border-color: #111; }
    .fp-clear { margin-top: 12px; padding: 8px 16px; font-size: 12px; font-weight: 500; color: #FF3B30; cursor: pointer; border-radius: 8px; transition: background 0.2s; }
    .fp-clear:hover { background: rgba(255,59,48,0.06); }

    .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    @media (min-width: 600px) { .grid { grid-template-columns: repeat(3, 1fr); gap: 14px; } }
    @media (min-width: 1024px) { .grid { grid-template-columns: repeat(4, 1fr); gap: 18px; } }

    .grid-skel { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
    .skel { border-radius: 12px; overflow: hidden; border: 1px solid #F0F0F0; }
    .skel-img { padding-top: 125%; background: linear-gradient(90deg, #F0F0F0 25%, #E5E5E5 50%, #F0F0F0 75%); background-size: 200% 100%; animation: skel 1.5s infinite; }
    .skel-body { padding: 10px 12px; }
    .skel-l { height: 12px; background: #F0F0F0; border-radius: 4px; margin-bottom: 8px; }
    .skel-l.s60 { width: 60%; }
    @keyframes skel { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

    .load { text-align: center; padding: 20px 0; }
    .load button { padding: 10px 32px; background: #F5F5F5; border-radius: 10px; font-size: 13px; font-weight: 500; color: #111; cursor: pointer; transition: all 0.2s; }
    .load button:hover { background: #E5E5E5; }

    .empty { text-align: center; padding: 60px 16px; }
    .empty .material-icons-round { font-size: 48px; color: #CCC; margin-bottom: 12px; }
    .empty h3 { font-size: 16px; margin-bottom: 6px; }
    .empty p { font-size: 13px; color: #999; }
  `],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  category: Category | null = null;
  loading = true;
  page = 0;
  totalCount = 0;
  hasMore = false;
  sort = 'createdAt,desc';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  minRating: number | null = null;
  showFilters = false;
  slug = '';

  sortOptions = [
    { label: 'Newest', value: 'createdAt,desc' },
    { label: 'Price Low', value: 'price,asc' },
    { label: 'Price High', value: 'price,desc' },
    { label: 'Discount', value: 'discountPrice,asc' },
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.slug = params['slug'] || '';
      this.page = 0;
      this.products = [];
      this.loadProducts();
    });
  }

  loadProducts() {
    this.loading = true;
    const params: any = { page: this.page, size: 12, sort: this.sort };
    if (this.slug) params.categorySlug = this.slug;
    if (this.minPrice !== null) params.minPrice = this.minPrice;
    if (this.maxPrice !== null) params.maxPrice = this.maxPrice;
    if (this.minRating !== null) params.minRating = this.minRating;

    this.apiService.getProducts(params).subscribe(res => {
      this.products = this.page === 0 ? res.data.content : [...this.products, ...res.data.content];
      this.totalCount = res.data.totalElements;
      this.hasMore = !res.data.last;
      this.loading = false;
    });

    if (this.slug) {
      this.apiService.getCategory(this.slug).subscribe(res => this.category = res.data);
    }
  }

  setSort(value: string) { this.sort = value; this.page = 0; this.products = []; this.loadProducts(); }
  applyFilters() { this.page = 0; this.products = []; this.loadProducts(); }
  setRating(r: number) { this.minRating = this.minRating === r ? null : r; this.applyFilters(); }
  clearFilters() { this.minPrice = null; this.maxPrice = null; this.minRating = null; this.applyFilters(); }
  loadMore() { this.page++; this.loadProducts(); }
}
