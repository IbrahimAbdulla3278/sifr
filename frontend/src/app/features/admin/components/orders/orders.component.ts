import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Order } from '../../../../shared/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-section">
      <div class="section-header">
        <h2>Manage Orders</h2>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Items</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let order of orders">
              <td class="order-num">{{ order.orderNumber }}</td>
              <td>{{ order.items.length }} items</td>
              <td>&#8377;{{ order.total | number }}</td>
              <td><span class="payment-badge" [class]="order.paymentStatus.toLowerCase()">{{ order.paymentStatus }}</span></td>
              <td><span class="status-badge" [class]="order.orderStatus.toLowerCase()">{{ order.orderStatus }}</span></td>
              <td class="date">{{ order.createdAt | date:'mediumDate' }}</td>
              <td class="actions">
                <select class="status-select" (change)="updateStatus(order.id, $event)" [value]="order.orderStatus">
                  <option value="PENDING">Pending</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="SHIPPED">Shipped</option>
                  <option value="DELIVERED">Delivered</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="load-more" *ngIf="hasMore">
        <button (click)="loadMore()">Load More</button>
      </div>
    </div>
  `,
  styles: [`
    .admin-section { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .section-header { margin-bottom: 20px; }
    .section-header h2 { font-size: 18px; font-weight: 700; }
    .table-container { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 12px; font-size: 12px; font-weight: 600; color: #747d8c; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef; }
    td { padding: 12px; font-size: 14px; border-bottom: 1px solid #e9ecef; }
    .order-num { font-weight: 600; color: #667eea; }
    .date { color: #a4b0be; font-size: 13px; }
    .payment-badge { padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
    .payment-badge.pending { background: #fff3cd; color: #856404; }
    .payment-badge.paid { background: #d4edda; color: #155724; }
    .payment-badge.failed { background: #f8d7da; color: #721c24; }
    .payment-badge.refunded { background: #cce5ff; color: #004085; }
    .status-badge { padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 600; }
    .status-badge.pending { background: #fff3cd; color: #856404; }
    .status-badge.confirmed { background: #cce5ff; color: #004085; }
    .status-badge.shipped { background: #d4edda; color: #155724; }
    .status-badge.delivered { background: #d4edda; color: #155724; }
    .status-badge.cancelled { background: #f8d7da; color: #721c24; }
    .actions { }
    .status-select { padding: 6px 10px; border-radius: 8px; border: 2px solid #e9ecef; font-size: 13px; font-family: inherit; outline: none; cursor: pointer; }
    .load-more { text-align: center; padding: 20px; }
    .load-more button { padding: 10px 24px; border-radius: 10px; border: 2px solid #667eea; background: white; color: #667eea; font-size: 14px; font-weight: 600; cursor: pointer; }
  `],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  page = 0;
  hasMore = false;

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() { this.loadOrders(); }

  loadOrders() {
    this.apiService.getAllOrdersAdmin(this.page).subscribe(res => {
      this.orders = [...this.orders, ...res.data.content];
      this.hasMore = !res.data.last;
    });
  }

  loadMore() {
    this.page++;
    this.loadOrders();
  }

  updateStatus(id: string, event: any) {
    const status = event.target.value;
    this.apiService.updateOrderStatus(id, status).subscribe({
      next: () => this.snackBar.open('Order status updated!', 'OK', { duration: 2000 }),
      error: () => this.snackBar.open('Failed to update', 'OK', { duration: 3000 }),
    });
  }
}
