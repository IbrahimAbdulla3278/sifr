import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Cart, CartItem } from '../../shared/models/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-content">
      <div class="page-header">
        <button class="back-button" routerLink="/">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <h1>Shopping Cart</h1>
      </div>

      <ng-container *ngIf="cart && cart.items.length > 0; else emptyCart">
        <div class="cart-items">
          <div class="cart-item" *ngFor="let item of cart.items">
            <img [src]="apiService.getImageUrl(item.image)" [alt]="item.name" />
            <div class="item-details">
              <h3>{{ item.name }}</h3>
              <p class="item-sku" *ngIf="item.sku">SKU: {{ item.sku }}</p>
              <p class="item-price">&#8377;{{ item.price | number }}</p>
              <div class="quantity-controls">
                <button (click)="updateQuantity(item, -1)" [disabled]="item.quantity <= 1">-</button>
                <span>{{ item.quantity }}</span>
                <button (click)="updateQuantity(item, 1)">+</button>
              </div>
            </div>
            <div class="item-total">
              <p>&#8377;{{ (item.price * item.quantity) | number }}</p>
              <button class="remove-btn" (click)="removeItem(item)">
                <span class="material-icons-round">delete_outline</span>
              </button>
            </div>
          </div>
        </div>

        <div class="cart-summary">
          <div class="summary-row">
            <span>Subtotal ({{ totalItems }} items)</span>
            <span>&#8377;{{ cart.total | number }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping</span>
            <span class="free">Free</span>
          </div>
          <div class="summary-row total">
            <span>Total</span>
            <span>&#8377;{{ cart.total | number }}</span>
          </div>
          <button class="checkout-btn" routerLink="/checkout">Proceed to Checkout</button>
        </div>
      </ng-container>

      <ng-template #emptyCart>
        <div class="empty-state">
          <span class="material-icons-round empty-icon">shopping_bag</span>
          <h3>Your cart is empty</h3>
          <p>Browse our products and add items to your cart</p>
          <button class="shop-btn" routerLink="/">Start Shopping</button>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .page-content { max-width: 800px; margin: 0 auto; padding: 16px; }
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .back-button {
      display: flex; align-items: center; justify-content: center;
      width: 40px; height: 40px; border-radius: 50%; background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer; border: none;
    }
    .page-header h1 { font-size: 20px; font-weight: 700; }
    .cart-items { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
    .cart-item {
      display: flex; gap: 16px; background: white; border-radius: 16px;
      padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .cart-item img { width: 80px; height: 80px; border-radius: 12px; object-fit: cover; }
    .item-details { flex: 1; }
    .item-details h3 { font-size: 14px; font-weight: 600; margin-bottom: 2px; }
    .item-sku { font-size: 11px; color: #a4b0be; }
    .item-price { font-size: 14px; font-weight: 700; color: #667eea; margin: 4px 0; }
    .quantity-controls { display: flex; align-items: center; gap: 8px; }
    .quantity-controls button {
      width: 28px; height: 28px; border-radius: 8px; border: 1px solid #e9ecef;
      background: white; font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center;
    }
    .quantity-controls button:disabled { opacity: 0.5; cursor: not-allowed; }
    .quantity-controls span { font-size: 14px; font-weight: 600; min-width: 20px; text-align: center; }
    .item-total { display: flex; flex-direction: column; align-items: flex-end; justify-content: space-between; }
    .item-total p { font-size: 15px; font-weight: 700; }
    .remove-btn { display: flex; cursor: pointer; border: none; background: none; color: #ff4757; }
    .cart-summary {
      background: white; border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
    }
    .summary-row { display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px; color: #747d8c; }
    .summary-row.total { border-top: 1px solid #e9ecef; padding-top: 12px; font-size: 16px; font-weight: 700; color: #2f3542; }
    .free { color: #2ed573; font-weight: 600; }
    .checkout-btn {
      width: 100%; padding: 14px; border-radius: 12px; border: none;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white; font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit;
      transition: all 0.3s;
    }
    .checkout-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(102,126,234,0.4); }
    .empty-state { text-align: center; padding: 48px 16px; }
    .empty-icon { font-size: 64px; color: #a4b0be; }
    .empty-state h3 { font-size: 18px; margin: 16px 0 8px; }
    .empty-state p { color: #747d8c; margin-bottom: 24px; }
    .shop-btn {
      padding: 12px 32px; border-radius: 12px; border: none;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit;
    }
  `],
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;

  constructor(
    public apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  get totalItems() {
    return this.cart?.items.reduce((s, i) => s + i.quantity, 0) || 0;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.loadCart();
    } else {
      this.router.navigate(['/login']);
    }
  }

  loadCart() {
    this.apiService.getCart().subscribe(res => this.cart = res.data);
  }

  updateQuantity(item: CartItem, delta: number) {
    const newQty = item.quantity + delta;
    if (newQty <= 0) return;
    this.apiService.updateCartItem(item.productId, newQty, item.variantId).subscribe(res => this.cart = res.data);
  }

  removeItem(item: CartItem) {
    this.apiService.removeFromCart(item.productId, item.variantId).subscribe(res => this.cart = res.data);
  }
}
