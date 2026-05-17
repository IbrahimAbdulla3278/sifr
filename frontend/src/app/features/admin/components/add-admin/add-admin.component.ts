import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-section">
      <h2>Add New Admin</h2>
      <p class="subtitle">Create a new administrator account</p>

      <div class="add-form">
        <div class="form-group">
          <label>Full Name</label>
          <input [(ngModel)]="name" placeholder="Admin name" />
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" [(ngModel)]="email" placeholder="Admin email" />
        </div>
        <div class="form-group">
          <label>Password</label>
          <input type="password" [(ngModel)]="password" placeholder="Password" />
        </div>
        <button class="btn-create" (click)="createAdmin()" [disabled]="loading">
          {{ loading ? 'Creating...' : 'Create Admin' }}
        </button>
      </div>

      <div class="admin-list" *ngIf="admins.length > 0">
        <h3>Current Admins</h3>
        <div class="admin-item" *ngFor="let admin of admins">
          <div class="admin-avatar">
            <span class="material-icons-round">admin_panel_settings</span>
          </div>
          <div class="admin-info">
            <p class="admin-name">{{ admin.name }}</p>
            <p class="admin-email">{{ admin.email }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-section { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); max-width: 500px; }
    h2 { font-size: 18px; font-weight: 700; }
    .subtitle { color: #747d8c; font-size: 14px; margin-bottom: 24px; }
    .add-form { margin-bottom: 32px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
    .form-group input { width: 100%; padding: 10px 14px; border: 2px solid #e9ecef; border-radius: 10px; font-size: 14px; font-family: inherit; outline: none; }
    .form-group input:focus { border-color: #667eea; }
    .btn-create { width: 100%; padding: 12px; border-radius: 10px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 15px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .btn-create:disabled { opacity: 0.6; cursor: not-allowed; }
    .admin-list h3 { font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #747d8c; }
    .admin-item { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 10px; background: #f8f9fa; margin-bottom: 8px; }
    .admin-avatar { width: 40px; height: 40px; border-radius: 50%; background: rgba(102,126,234,0.1); display: flex; align-items: center; justify-content: center; }
    .admin-avatar .material-icons-round { font-size: 20px; color: #667eea; }
    .admin-name { font-weight: 600; font-size: 14px; }
    .admin-email { font-size: 13px; color: #747d8c; }
  `],
})
export class AddAdminComponent {
  name = '';
  email = '';
  password = '';
  loading = false;
  admins: any[] = [];

  constructor(
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.loadAdmins();
  }

  loadAdmins() {
    this.apiService.getAdmins().subscribe(res => this.admins = res.data);
  }

  createAdmin() {
    if (!this.name || !this.email || !this.password) return;
    this.loading = true;
    this.apiService.addAdmin({ name: this.name, email: this.email, password: this.password }).subscribe({
      next: () => {
        this.loading = false;
        this.snackBar.open('Admin created successfully!', 'OK', { duration: 2000 });
        this.name = '';
        this.email = '';
        this.password = '';
        this.loadAdmins();
      },
      error: (err) => {
        this.loading = false;
        this.snackBar.open(err.error?.message || 'Failed to create admin', 'OK', { duration: 3000 });
      },
    });
  }
}
