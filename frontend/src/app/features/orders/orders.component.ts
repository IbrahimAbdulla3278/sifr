import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { Order } from '../../shared/models/models';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-content">
      <div class="page-header">
        <button class="back-button" routerLink="/">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <h1>My Orders</h1>
      </div>

      <div class="orders-list" *ngIf="orders.length > 0">
        <div class="order-card" *ngFor="let order of orders">
          <div class="order-header">
            <span class="order-number">{{ order.orderNumber }}</span>
            <span class="status-badge" [class]="order.orderStatus.toLowerCase()">{{ order.orderStatus }}</span>
          </div>
          <div class="order-items">
            <div class="order-item" *ngFor="let item of order.items.slice(0, 3)">
              <img [src]="apiService.getImageUrl(item.image)" [alt]="item.name" />
              <div class="item-info">
                <p>{{ item.name }}</p>
                <p class="item-meta">Qty: {{ item.quantity }} | &#8377;{{ item.price | number }}</p>
              </div>
            </div>
            <div class="more-items" *ngIf="order.items.length > 3">+{{ order.items.length - 3 }} more items</div>
          </div>
          <div class="order-footer">
            <span class="order-total">Total: &#8377;{{ order.total | number }}</span>
            <span class="order-date">{{ order.createdAt | date:'mediumDate' }}</span>
          </div>
          <a [routerLink]="['/order-success', order.id]" class="view-details">View Details</a>
        </div>
      </div>

      <div class="empty-state" *ngIf="orders.length === 0">
        <span class="material-icons-round empty-icon">inventory_2</span>
        <h3>No orders yet</h3>
        <p>Start shopping to see your orders here</p>
        <button class="shop-btn" routerLink="/">Start Shopping</button>
      </div>
    </div>
  `,
  styles: [`
    .page-content { max-width: 600px; margin: 0 auto; padding: 16px; }
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .back-button { display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer; border: none; }
    .page-header h1 { font-size: 20px; font-weight: 700; }
    .orders-list { display: flex; flex-direction: column; gap: 12px; }
    .order-card { background: white; border-radius: 16px; padding: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
    .order-number { font-weight: 700; font-size: 14px; color: #667eea; }
    .status-badge { padding: 4px 12px; border-radius: 999px; font-size: 11px; font-weight: 600; }
    .status-badge.pending { background: #fff3cd; color: #856404; }
    .status-badge.confirmed { background: #cce5ff; color: #004085; }
    .status-badge.shipped { background: #d4edda; color: #155724; }
    .status-badge.delivered { background: #d4edda; color: #155724; }
    .status-badge.cancelled { background: #f8d7da; color: #721c24; }
    .order-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px; }
    .order-item { display: flex; gap: 12px; }
    .order-item img { width: 48px; height: 48px; border-radius: 8px; object-fit: cover; }
    .item-info p { font-size: 13px; font-weight: 600; }
    .item-meta { font-size: 12px; color: #747d8c; font-weight: 400; }
    .more-items { font-size: 12px; color: #667eea; font-weight: 600; }
    .order-footer { display: flex; justify-content: space-between; font-size: 13px; color: #747d8c; margin-bottom: 12px; }
    .order-total { font-weight: 700; color: #2f3542; }
    .view-details { display: block; text-align: center; padding: 10px; border-radius: 10px; background: #f8f9fa; font-size: 13px; font-weight: 600; color: #667eea; text-decoration: none; }
    .empty-state { text-align: center; padding: 48px 16px; }
    .empty-icon { font-size: 64px; color: #a4b0be; }
    .empty-state h3 { font-size: 18px; margin: 16px 0 8px; }
    .empty-state p { color: #747d8c; margin-bottom: 24px; }
    .shop-btn { padding: 12px 32px; border-radius: 12px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; }
  `],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];

  constructor(
    public apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.apiService.getOrders().subscribe(res => this.orders = res.data.content);
    }
  }
}
