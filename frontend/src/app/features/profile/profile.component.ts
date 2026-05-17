import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../shared/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="page-content">
      <div class="profile-header">
        <div class="profile-avatar">
          <img *ngIf="user?.profileImage" [src]="apiService.getImageUrl(user!.profileImage)" />
          <span *ngIf="!user?.profileImage" class="material-icons-round">person</span>
          <button class="change-photo" (click)="photoInput.click()">
            <span class="material-icons-round">camera_alt</span>
          </button>
          <input #photoInput type="file" accept="image/*" hidden (change)="changePhoto($event)" />
        </div>
        <h2>{{ user?.name }}</h2>
        <p>{{ user?.email }}</p>
      </div>

      <div class="profile-menu">
        <a routerLink="/orders" class="menu-item">
          <span class="material-icons-round">inventory_2</span>
          <span>My Orders</span>
          <span class="material-icons-round chevron">chevron_right</span>
        </a>
        <a routerLink="/wishlist" class="menu-item">
          <span class="material-icons-round">favorite</span>
          <span>Wishlist</span>
          <span class="material-icons-round chevron">chevron_right</span>
        </a>
        <div class="menu-item" (click)="showAddressSection = !showAddressSection">
          <span class="material-icons-round">location_on</span>
          <span>My Addresses</span>
          <span class="material-icons-round chevron">chevron_right</span>
        </div>
        <a routerLink="/about" class="menu-item">
          <span class="material-icons-round">info</span>
          <span>About Us</span>
          <span class="material-icons-round chevron">chevron_right</span>
        </a>
        <a routerLink="/contact" class="menu-item">
          <span class="material-icons-round">support</span>
          <span>Contact Us</span>
          <span class="material-icons-round chevron">chevron_right</span>
        </a>
        <div class="menu-item" (click)="logout()">
          <span class="material-icons-round">logout</span>
          <span>Logout</span>
          <span class="material-icons-round chevron">chevron_right</span>
        </div>
      </div>

      <div class="addresses-section" *ngIf="showAddressSection">
        <h3>My Addresses</h3>
        <div class="address-card" *ngFor="let addr of user?.addresses">
          <p class="addr-label">{{ addr.label || 'Address' }}</p>
          <p>{{ addr.fullName }}, {{ addr.addressLine1 }}</p>
          <p>{{ addr.city }}, {{ addr.state }} - {{ addr.pincode }}</p>
          <p>Phone: {{ addr.phone }}</p>
          <button class="delete-addr" (click)="deleteAddress(addr.id)">Delete</button>
        </div>
        <div *ngIf="!user?.addresses?.length" class="no-addresses">No addresses saved</div>
      </div>

      <div class="admin-link" *ngIf="authService.isAdmin()">
        <a routerLink="/admin" class="menu-item admin-link-item">
          <span class="material-icons-round">admin_panel_settings</span>
          <span>Admin Dashboard</span>
          <span class="material-icons-round chevron">chevron_right</span>
        </a>
      </div>
    </div>
  `,
  styles: [`
    .page-content { max-width: 500px; margin: 0 auto; padding: 16px; }
    .profile-header { text-align: center; padding: 24px 0; }
    .profile-avatar {
      position: relative; width: 96px; height: 96px; border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 16px; overflow: hidden;
    }
    .profile-avatar img { width: 100%; height: 100%; object-fit: cover; }
    .profile-avatar .material-icons-round { font-size: 48px; color: white; }
    .change-photo {
      position: absolute; bottom: 0; right: 0; width: 32px; height: 32px;
      border-radius: 50%; background: white; border: 2px solid #fff;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }
    .change-photo .material-icons-round { font-size: 16px; color: #667eea; }
    .profile-header h2 { font-size: 20px; font-weight: 700; }
    .profile-header p { color: #747d8c; font-size: 14px; }
    .profile-menu { display: flex; flex-direction: column; gap: 4px; margin: 16px 0; }
    .menu-item {
      display: flex; align-items: center; gap: 16px; padding: 16px;
      background: white; border-radius: 12px; cursor: pointer;
      text-decoration: none; color: inherit; transition: background 0.2s;
    }
    .menu-item:hover { background: #f8f9fa; }
    .menu-item .material-icons-round:first-child { color: #667eea; font-size: 24px; }
    .menu-item span:nth-child(2) { flex: 1; font-size: 15px; font-weight: 500; }
    .chevron { color: #a4b0be !important; font-size: 20px !important; }
    .addresses-section { background: white; border-radius: 16px; padding: 20px; margin-bottom: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .addresses-section h3 { font-size: 16px; font-weight: 600; margin-bottom: 12px; }
    .address-card { padding: 12px; border: 1px solid #e9ecef; border-radius: 12px; margin-bottom: 8px; }
    .address-card p { font-size: 13px; color: #747d8c; }
    .addr-label { font-weight: 600; color: #2f3542 !important; }
    .delete-addr { margin-top: 8px; padding: 4px 12px; border-radius: 6px; border: none; background: #fff5f5; color: #ff4757; font-size: 12px; font-weight: 500; cursor: pointer; }
    .no-addresses { text-align: center; color: #a4b0be; padding: 16px; }
    .admin-link-item { background: rgba(102,126,234,0.08) !important; border: 1px solid rgba(102,126,234,0.2); }
    .admin-link-item .material-icons-round:first-child { color: #764ba2 !important; }
  `],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  showAddressSection = false;

  constructor(
    public apiService: ApiService,
    public authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.authService.getProfile().subscribe(res => this.user = res.data);
  }

  changePhoto(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.authService.updateProfileImage(file).subscribe(res => this.user = res.data);
    }
  }

  deleteAddress(id: string) {
    this.apiService.deleteAddress(id).subscribe(res => this.user = res.data);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
