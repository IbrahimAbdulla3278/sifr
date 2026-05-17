import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { Order } from '../../../shared/models/models';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="success-page">
      <div class="success-card" *ngIf="order">
        <div class="success-icon">
          <span class="material-icons-round">check_circle</span>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Thank you for your order. We'll start processing it right away.</p>

        <div class="order-details">
          <div class="detail-row">
            <span>Order Number</span>
            <span class="order-num">{{ order.orderNumber }}</span>
          </div>
          <div class="detail-row">
            <span>Payment Method</span>
            <span>{{ order.paymentMethod }}</span>
          </div>
          <div class="detail-row">
            <span>Total Amount</span>
            <span class="total">&#8377;{{ order.total | number }}</span>
          </div>
        </div>

        <div class="action-buttons">
          <button class="btn-primary" routerLink="/orders">View Orders</button>
          <button class="btn-secondary" routerLink="/">Continue Shopping</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .success-page {
      min-height: 60vh; display: flex; align-items: center; justify-content: center; padding: 16px;
    }
    .success-card { text-align: center; max-width: 400px; background: white; border-radius: 24px; padding: 40px 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .success-icon .material-icons-round { font-size: 72px; color: #2ed573; }
    .success-card h1 { font-size: 22px; font-weight: 700; margin: 16px 0 8px; }
    .success-card p { color: #747d8c; font-size: 14px; margin-bottom: 24px; }
    .order-details { background: #f8f9fa; border-radius: 12px; padding: 16px; margin-bottom: 24px; }
    .detail-row { display: flex; justify-content: space-between; padding: 8px 0; font-size: 14px; }
    .order-num { font-weight: 700; color: #667eea; }
    .total { font-weight: 700; font-size: 16px; }
    .action-buttons { display: flex; flex-direction: column; gap: 12px; }
    .btn-primary {
      padding: 14px; border-radius: 12px; border: none;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit;
    }
    .btn-secondary {
      padding: 14px; border-radius: 12px; border: 2px solid #e9ecef;
      background: white; color: #2f3542; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit;
    }
  `],
})
export class OrderSuccessComponent implements OnInit {
  order: Order | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) this.apiService.getOrder(params['id']).subscribe(res => this.order = res.data);
    });
  }
}
