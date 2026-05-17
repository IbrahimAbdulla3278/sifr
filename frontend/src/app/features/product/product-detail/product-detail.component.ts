import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { AuthService } from '../../../core/services/auth.service';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { Product, Variant } from '../../../shared/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductCardComponent],
  template: `
    <div class="detail" *ngIf="product">
      <div class="gallery">
        <button class="back-btn" routerLink="..">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <div class="main-img">
          <img [src]="apiService.getImageUrl(selectedImage)" [alt]="product.name" />
        </div>
        <div class="thumbs" *ngIf="product.images.length > 1">
          <button *ngFor="let img of product.images" [class.active]="img === selectedImage" (click)="selectedImage = img">
            <img [src]="apiService.getImageUrl(img)" alt="" />
          </button>
        </div>
      </div>

      <div class="info">
        <span class="brand" *ngIf="product.brand">{{ product.brand }}</span>
        <h1>{{ product.name }}</h1>

        <div class="rating" *ngIf="product.reviewCount > 0">
          <span class="stars">&#9733;</span>
          <span class="val">{{ product.averageRating }}</span>
          <span class="count">({{ product.reviewCount }} reviews)</span>
        </div>

        <div class="pricing">
          <span class="current">&#8377;{{ (selectedVariant?.discountPrice || product.discountPrice || product.price) | number }}</span>
          <span class="original" *ngIf="selectedVariant?.discountPrice || product.discountPrice">&#8377;{{ (selectedVariant?.price || product.price) | number }}</span>
          <span class="badge" *ngIf="discountPercent > 0">{{ discountPercent }}% OFF</span>
        </div>

        <div class="variants" *ngIf="product.variants.length > 0">
          <span class="variant-label">{{ product.variants[0].name }}</span>
          <div class="variant-list">
            <button *ngFor="let v of product.variants" [class.active]="selectedVariant?.id === v.id"
                    (click)="selectVariant(v)" [disabled]="v.stock === 0">{{ v.value }}</button>
          </div>
        </div>

        <div class="stock" [class.oos]="currentStock === 0">
          {{ currentStock > 0 ? 'In Stock' : 'Out of Stock' }}
        </div>

        <div class="actions">
          <button class="btn-atc" (click)="addToCart()" [disabled]="currentStock === 0">
            <span class="material-icons-round">shopping_bag_outline</span>
            Add to Cart
          </button>
          <button class="btn-wl" (click)="toggleWishlist()" [class.saved]="inWishlist">
            <span class="material-icons-round">{{ inWishlist ? 'favorite' : 'favorite_outline' }}</span>
          </button>
        </div>

        <div class="desc" *ngIf="product.description">
          <h3>Details</h3>
          <p>{{ product.description }}</p>
        </div>

        <div class="reviews" *ngIf="product.reviews.length > 0">
          <h3>Reviews ({{ product.reviewCount }})</h3>
          <div class="review" *ngFor="let review of product.reviews">
            <div class="rv-header">
              <span class="rv-name">{{ review.userName }}</span>
              <span class="rv-rating">&#9733; {{ review.rating }}</span>
            </div>
            <p *ngIf="review.comment">{{ review.comment }}</p>
            <span class="rv-date">{{ review.createdAt | date }}</span>
          </div>
        </div>

        <div class="add-review" *ngIf="authService.isLoggedIn()">
          <h3>Write a Review</h3>
          <div class="star-pick">
            <button *ngFor="let s of [1,2,3,4,5]" (click)="newRating = s" [class.active]="s <= newRating">&#9733;</button>
          </div>
          <textarea [(ngModel)]="newComment" placeholder="Share your thoughts..." rows="3"></textarea>
          <button class="btn-submit" (click)="submitReview()">Submit Review</button>
        </div>
      </div>

      <div class="related" *ngIf="relatedProducts.length > 0">
        <h2>You May Also Like</h2>
        <div class="related-grid">
          <app-product-card *ngFor="let p of relatedProducts" [product]="p"></app-product-card>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .detail { max-width: 900px; margin: 0 auto; padding: 0 0 24px; }
    .gallery { position: relative; margin: 0; }
    .back-btn {
      position: absolute; top: 16px; left: 16px; z-index: 10;
      width: 40px; height: 40px; border-radius: 50%;
      background: rgba(255,255,255,0.9); backdrop-filter: blur(8px);
      box-shadow: 0 2px 12px rgba(0,0,0,0.08); border: none;
      display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
    }
    .back-btn:hover { background: white; }
    .main-img { background: #F8FAFC; }
    .main-img img { width: 100%; height: 380px; object-fit: cover; }
    .thumbs { display: flex; gap: 8px; padding: 12px 16px; overflow-x: auto; }
    .thumbs button {
      width: 56px; height: 56px; border-radius: 12px; overflow: hidden;
      border: 2px solid transparent; cursor: pointer; padding: 0; flex-shrink: 0; transition: all 0.2s;
    }
    .thumbs button.active { border-color: #8B5CF6; }
    .thumbs img { width: 100%; height: 100%; object-fit: cover; }

    .info { padding: 24px 16px; background: white; border-radius: 24px 24px 0 0; margin-top: -24px; position: relative; }
    .brand { font-size: 12px; font-weight: 600; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; display: block; }
    .info h1 { font-size: 22px; font-weight: 700; color: #0F172A; margin-bottom: 8px; }
    .rating { display: flex; align-items: center; gap: 4px; margin-bottom: 12px; }
    .stars { color: #D4A373; }
    .val { font-weight: 600; font-size: 14px; color: #0F172A; }
    .count { color: #94A3B8; font-size: 13px; }
    .pricing { display: flex; align-items: center; gap: 8px; margin-bottom: 20px; }
    .current { font-size: 24px; font-weight: 700; color: #0F172A; }
    .original { font-size: 15px; color: #94A3B8; text-decoration: line-through; }
    .badge { font-size: 12px; font-weight: 700; color: white; background: #EF4444; padding: 3px 10px; border-radius: 999px; }

    .variants { margin-bottom: 16px; }
    .variant-label { font-size: 13px; font-weight: 600; color: #64748B; display: block; margin-bottom: 8px; }
    .variant-list { display: flex; flex-wrap: wrap; gap: 8px; }
    .variant-list button {
      padding: 8px 18px; border-radius: 10px; border: 1.5px solid #E2E8F0;
      background: white; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; color: #0F172A;
    }
    .variant-list button.active { border-color: #8B5CF6; background: rgba(139,92,246,0.06); color: #8B5CF6; }
    .variant-list button:disabled { opacity: 0.3; cursor: not-allowed; }

    .stock { font-size: 13px; font-weight: 600; color: #10B981; margin-bottom: 20px; }
    .stock.oos { color: #EF4444; }

    .actions { display: flex; gap: 12px; margin-bottom: 28px; }
    .btn-atc {
      flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
      padding: 16px; border-radius: 14px; border: none;
      background: #0F172A; color: white;
      font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit;
      transition: all 0.3s;
    }
    .btn-atc:hover:not(:disabled) { background: #1E293B; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(15,23,42,0.2); }
    .btn-atc:disabled { opacity: 0.4; cursor: not-allowed; }
    .btn-wl {
      width: 54px; height: 54px; border-radius: 14px;
      border: 1.5px solid #E2E8F0; background: white;
      display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.2s;
    }
    .btn-wl:hover { border-color: #EF4444; }
    .btn-wl.saved { border-color: #EF4444; color: #EF4444; background: rgba(239,68,68,0.06); }

    .desc { margin-bottom: 24px; }
    .desc h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
    .desc p { color: #64748B; line-height: 1.7; }

    .reviews { margin-bottom: 24px; }
    .reviews h3 { font-size: 16px; font-weight: 600; margin-bottom: 12px; }
    .review { padding: 14px 0; border-bottom: 1px solid #F1F5F9; }
    .review:last-child { border-bottom: none; }
    .rv-header { display: flex; justify-content: space-between; margin-bottom: 4px; }
    .rv-name { font-weight: 600; font-size: 14px; color: #0F172A; }
    .rv-rating { color: #D4A373; font-size: 13px; }
    .review p { font-size: 14px; color: #64748B; }
    .rv-date { font-size: 12px; color: #94A3B8; }

    .add-review { margin-bottom: 24px; }
    .add-review h3 { font-size: 16px; font-weight: 600; margin-bottom: 8px; }
    .star-pick { margin-bottom: 10px; }
    .star-pick button { font-size: 26px; color: #E2E8F0; cursor: pointer; border: none; background: none; padding: 0 3px; transition: color 0.2s; }
    .star-pick button.active { color: #D4A373; }
    .add-review textarea {
      width: 100%; padding: 14px; border: 1.5px solid #E2E8F0; border-radius: 14px;
      font-size: 14px; font-family: inherit; outline: none; resize: vertical; margin-bottom: 12px; transition: border-color 0.2s;
    }
    .add-review textarea:focus { border-color: #8B5CF6; box-shadow: 0 0 0 3px rgba(139,92,246,0.08); }
    .btn-submit {
      padding: 12px 24px; border-radius: 12px; border: none;
      background: #0F172A; color: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; transition: all 0.3s;
    }
    .btn-submit:hover { background: #1E293B; transform: translateY(-1px); }

    .related { padding: 0 16px; margin-bottom: 24px; }
    .related h2 { font-size: 20px; font-weight: 700; margin-bottom: 14px; }
    .related-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
    @media (min-width: 768px) { .main-img img { height: 520px; } .related-grid { grid-template-columns: repeat(4, 1fr); } }
  `],
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  relatedProducts: Product[] = [];
  selectedImage = '';
  selectedVariant: Variant | null = null;
  inWishlist = false;
  newRating = 0;
  newComment = '';

  constructor(
    private route: ActivatedRoute,
    public apiService: ApiService,
    public authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) this.loadProduct(params['id']);
    });
  }

  get currentStock() { return this.selectedVariant ? this.selectedVariant.stock : this.product?.stock || 0; }

  get discountPercent() {
    const price = this.selectedVariant?.price || this.product?.price || 0;
    const disc = this.selectedVariant?.discountPrice || this.product?.discountPrice || 0;
    if (price && disc) return Math.round((1 - disc / price) * 100);
    return 0;
  }

  loadProduct(id: string) {
    this.apiService.getProduct(id).subscribe(res => {
      this.product = res.data;
      this.selectedImage = this.product.images[0] || '';
      this.loadRelated();
      if (this.authService.isLoggedIn()) {
        this.apiService.checkWishlist(id).subscribe(r => this.inWishlist = r.data);
      }
    });
  }

  loadRelated() { this.apiService.getRelatedProducts(this.product.id).subscribe(res => this.relatedProducts = res.data); }

  selectVariant(v: Variant) { this.selectedVariant = v; if (v.image) this.selectedImage = v.image; }

  addToCart() {
    if (!this.authService.isLoggedIn()) return;
    this.apiService.addToCart(this.product.id, this.selectedVariant?.id, 1).subscribe({
      next: () => this.snackBar.open('Added to cart!', 'OK', { duration: 2000 }),
      error: () => this.snackBar.open('Failed to add to cart', 'OK', { duration: 2000 }),
    });
  }

  toggleWishlist() {
    if (!this.authService.isLoggedIn()) return;
    const action = this.inWishlist
      ? this.apiService.removeFromWishlist(this.product.id)
      : this.apiService.addToWishlist(this.product.id);
    action.subscribe(() => this.inWishlist = !this.inWishlist);
  }

  submitReview() {
    if (!this.newRating || !this.newComment) return;
    this.apiService.addReview(this.product.id, { rating: this.newRating, comment: this.newComment }).subscribe({
      next: (res) => { this.product = res.data; this.newRating = 0; this.newComment = ''; this.snackBar.open('Review submitted!', 'OK', { duration: 2000 }); },
    });
  }
}
