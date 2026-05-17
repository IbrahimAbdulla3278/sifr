import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { User, Address, Cart } from '../../shared/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-content">
      <div class="page-header">
        <button class="back-button" routerLink="/cart">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <h1>Checkout</h1>
      </div>

      <div class="checkout-section">
        <h3>Shipping Address</h3>
        <div class="address-list" *ngIf="user?.addresses?.length">
          <div class="address-card" *ngFor="let addr of user?.addresses"
               [class.selected]="selectedAddress?.id === addr.id" (click)="selectedAddress = addr">
            <div class="address-radio">
              <span class="radio-dot" [class.checked]="selectedAddress?.id === addr.id"></span>
            </div>
            <div class="address-details">
              <p class="address-label">{{ addr.label || 'Address' }}</p>
              <p>{{ addr.fullName }}, {{ addr.addressLine1 }}</p>
              <p>{{ addr.city }}, {{ addr.state }} - {{ addr.pincode }}</p>
              <p>Phone: {{ addr.phone }}</p>
            </div>
          </div>
        </div>

        <div class="add-address-form" *ngIf="showAddressForm">
          <h3>Add New Address</h3>
          <input [(ngModel)]="newAddress.label" placeholder="Label (Home, Office)" />
          <input [(ngModel)]="newAddress.fullName" placeholder="Full Name" />
          <input [(ngModel)]="newAddress.phone" placeholder="Phone" />
          <input [(ngModel)]="newAddress.addressLine1" placeholder="Address Line 1" />
          <input [(ngModel)]="newAddress.addressLine2" placeholder="Address Line 2" />
          <div class="form-row">
            <input [(ngModel)]="newAddress.city" placeholder="City" />
            <input [(ngModel)]="newAddress.state" placeholder="State" />
          </div>
          <input [(ngModel)]="newAddress.pincode" placeholder="Pincode" />
          <button class="save-address-btn" (click)="saveAddress()">Save Address</button>
        </div>

        <button class="toggle-form-btn" (click)="showAddressForm = !showAddressForm">
          {{ showAddressForm ? 'Cancel' : '+ Add New Address' }}
        </button>
      </div>

      <div class="checkout-section">
        <h3>Payment Method</h3>
        <div class="payment-options">
          <div class="payment-option" [class.selected]="paymentMethod === 'COD'" (click)="paymentMethod = 'COD'">
            <span class="radio-dot" [class.checked]="paymentMethod === 'COD'"></span>
            <span class="material-icons-round">payments</span>
            <div>
              <p class="payment-label">Cash on Delivery</p>
              <p class="payment-desc">Pay when you receive</p>
            </div>
          </div>
          <div class="payment-option" [class.selected]="paymentMethod === 'RAZORPAY'" (click)="paymentMethod = 'RAZORPAY'">
            <span class="radio-dot" [class.checked]="paymentMethod === 'RAZORPAY'"></span>
            <span class="material-icons-round">credit_card</span>
            <div>
              <p class="payment-label">Razorpay</p>
              <p class="payment-desc">Pay with cards, UPI, wallet</p>
            </div>
          </div>
        </div>
      </div>

      <div class="order-summary" *ngIf="cart">
        <h3>Order Summary</h3>
        <div class="summary-items">
          <div class="summary-item" *ngFor="let item of cart.items">
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <span>&#8377;{{ item.price * item.quantity | number }}</span>
          </div>
        </div>
        <div class="summary-total">
          <span>Total</span>
          <span>&#8377;{{ cart.total | number }}</span>
        </div>
        <button class="place-order-btn" (click)="placeOrder()" [disabled]="placing">
          {{ placing ? 'Placing Order...' : 'Place Order' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .page-content { max-width: 600px; margin: 0 auto; padding: 16px; }
    .page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
    .back-button {
      display: flex; align-items: center; justify-content: center;
      width: 40px; height: 40px; border-radius: 50%; background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06); cursor: pointer; border: none;
    }
    .page-header h1 { font-size: 20px; font-weight: 700; }
    .checkout-section { background: white; border-radius: 16px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .checkout-section h3 { font-size: 16px; font-weight: 600; margin-bottom: 16px; }
    .address-list { display: flex; flex-direction: column; gap: 12px; margin-bottom: 12px; }
    .address-card {
      display: flex; gap: 12px; padding: 12px; border-radius: 12px;
      border: 2px solid #e9ecef; cursor: pointer; transition: all 0.2s;
    }
    .address-card.selected { border-color: #667eea; background: rgba(102,126,234,0.05); }
    .radio-dot {
      width: 20px; height: 20px; border-radius: 50%; border: 2px solid #ddd;
      display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    }
    .radio-dot.checked { border-color: #667eea; background: #667eea; }
    .radio-dot.checked::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: white; }
    .address-label { font-weight: 600; font-size: 14px; margin-bottom: 2px; }
    .address-details p { font-size: 13px; color: #747d8c; line-height: 1.4; }
    .add-address-form { display: flex; flex-direction: column; gap: 12px; }
    .add-address-form input {
      padding: 10px 14px; border: 2px solid #e9ecef; border-radius: 10px;
      font-size: 14px; font-family: inherit; outline: none;
    }
    .add-address-form input:focus { border-color: #667eea; }
    .form-row { display: flex; gap: 12px; }
    .form-row input { flex: 1; }
    .save-address-btn {
      padding: 12px; border-radius: 10px; border: none;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit;
    }
    .toggle-form-btn {
      width: 100%; padding: 10px; border-radius: 10px; border: 1px dashed #667eea;
      background: transparent; color: #667eea; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit;
    }
    .payment-options { display: flex; flex-direction: column; gap: 12px; }
    .payment-option {
      display: flex; align-items: center; gap: 12px; padding: 16px;
      border-radius: 12px; border: 2px solid #e9ecef; cursor: pointer;
    }
    .payment-option.selected { border-color: #667eea; background: rgba(102,126,234,0.05); }
    .payment-option .material-icons-round { font-size: 28px; color: #667eea; }
    .payment-label { font-weight: 600; font-size: 14px; }
    .payment-desc { font-size: 12px; color: #a4b0be; }
    .order-summary { background: white; border-radius: 16px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .summary-items { margin-bottom: 16px; }
    .summary-item { display: flex; justify-content: space-between; padding: 6px 0; font-size: 13px; color: #747d8c; }
    .summary-total { display: flex; justify-content: space-between; font-size: 18px; font-weight: 700; margin-bottom: 16px; border-top: 1px solid #e9ecef; padding-top: 12px; }
    .place-order-btn {
      width: 100%; padding: 14px; border-radius: 12px; border: none;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white; font-size: 16px; font-weight: 600; cursor: pointer; font-family: inherit;
    }
    .place-order-btn:disabled { opacity: 0.6; cursor: not-allowed; }
  `],
})
export class CheckoutComponent implements OnInit {
  user: User | null = null;
  cart: Cart | null = null;
  selectedAddress: Address | null = null;
  paymentMethod = 'COD';
  showAddressForm = false;
  placing = false;
  newAddress: any = { label: '', fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '' };

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.apiService.getCart().subscribe(res => this.cart = res.data);
    this.authService.getProfile().subscribe(res => {
      this.user = res.data;
      this.selectedAddress = this.user.addresses.find(a => a.isDefault) || this.user.addresses[0] || null;
    });
  }

  saveAddress() {
    this.apiService.addAddress(this.newAddress).subscribe(res => {
      this.user = res.data;
      this.showAddressForm = false;
      this.newAddress = { label: '', fullName: '', phone: '', addressLine1: '', addressLine2: '', city: '', state: '', pincode: '' };
    });
  }

  placeOrder() {
    if (!this.selectedAddress) return;
    this.placing = true;
    this.apiService.createOrder({ addressId: this.selectedAddress.id, paymentMethod: this.paymentMethod }).subscribe({
      next: (res) => {
        this.placing = false;
        this.router.navigate(['/order-success', res.data.id]);
      },
      error: (err) => {
        this.placing = false;
        this.snackBar.open(err.error?.message || 'Failed to place order', 'OK', { duration: 3000 });
      },
    });
  }
}
