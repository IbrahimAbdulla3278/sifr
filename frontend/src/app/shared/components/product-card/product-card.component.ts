import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/models';
import { ApiService } from '../../../core/services/api.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <a [routerLink]="['/product', product.id]" class="card">
      <div class="img-w">
        <img [src]="apiService.getImageUrl(product.images[0])" [alt]="product.name" loading="lazy" />
        <button class="wish-btn" (click)="$event.preventDefault();$event.stopPropagation()" aria-label="Add to wishlist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg></button>
        <span class="disc" *ngIf="discount > 0">{{ discount }}% Off</span>
        <span class="try">Try & Buy</span>
      </div>
      <div class="body">
        <span class="brand" *ngIf="product.brand">{{ product.brand }}</span>
        <h3 class="name">{{ product.name }}</h3>
        <div class="price-row">
          <span class="cur">&#8377;{{ (product.discountPrice || product.price) | number }}</span>
          <span class="old" *ngIf="product.discountPrice">&#8377;{{ product.price | number }}</span>
          <span class="off" *ngIf="discount > 0">{{ discount }}% off</span>
        </div>
      </div>
    </a>
  `,
  styles: [`
    .card { display:block;background:white;border-radius:16px;overflow:hidden;cursor:pointer;text-decoration:none;color:inherit;border:1px solid #F0EBE6;transition:all .25s;box-shadow:0 1px 4px rgba(0,0,0,.02); }
    .card:hover { border-color:#E5DDD6;box-shadow:0 8px 24px rgba(0,0,0,.06);transform:translateY(-2px); }
    .img-w { position:relative;padding-top:125%;background:#F5F0EB;overflow:hidden; }
    .img-w img { position:absolute;top:0;left:0;width:100%;height:100%;object-fit:cover;transition:transform .4s; }
    .card:hover .img-w img { transform:scale(1.06); }
    .wish-btn { position:absolute;top:8px;right:8px;z-index:3;width:32px;height:32px;border-radius:50%;background:rgba(255,255,255,.85);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;color:#1A1A1A;cursor:pointer;transition:all .2s;border:1px solid rgba(0,0,0,.04); }
    .wish-btn:hover { background:white;color:#F4A7A7;transform:scale(1.1); }
    .wish-btn svg { width:15px;height:15px; }
    .disc { position:absolute;top:8px;left:8px;padding:3px 8px;border-radius:6px;background:linear-gradient(135deg,#FF6B6B 0%,#FF4757 100%);color:white;font-size:10px;font-weight:700;z-index:2;box-shadow:0 2px 8px rgba(255,107,107,.25); }
    .try { position:absolute;bottom:8px;left:8px;padding:3px 8px;border-radius:6px;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:#1A1A1A;font-size:9px;font-weight:600;z-index:2;box-shadow:0 1px 4px rgba(0,0,0,.04); }
    .body { padding:12px 14px 14px; }
    .brand { font-size:10px;font-weight:500;color:#A69F99;text-transform:uppercase;letter-spacing:.8px;display:block;margin-bottom:3px; }
    .name { font-size:13px;font-weight:600;color:#1A1A1A;line-height:1.3;margin-bottom:8px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden; }
    .price-row { display:flex;align-items:center;gap:6px;flex-wrap:wrap; }
    .price-row .cur { font-size:15px;font-weight:600;color:#0A0A0A; }
    .price-row .old { font-size:12px;color:#A69F99;text-decoration:line-through; }
    .price-row .off { font-size:11px;font-weight:600;color:#FF6B6B; }
  `],
})
export class ProductCardComponent {
  @Input() product!: Product;
  get discount(): number { if (this.product.discountPrice && this.product.price) return Math.round((1 - this.product.discountPrice / this.product.price) * 100); return 0; }
  constructor(public apiService: ApiService) {}
}
