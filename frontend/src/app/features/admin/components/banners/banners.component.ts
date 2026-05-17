import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Banner } from '../../../../shared/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-banners',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-section">
      <div class="section-header">
        <h2>Manage Banners</h2>
        <button class="btn-add" (click)="openAdd()">+ Add Banner</button>
      </div>

      <div class="form-overlay" *ngIf="showForm" (click)="showForm = false">
        <div class="form-modal" (click)="$event.stopPropagation()">
          <h3>{{ editingBanner ? 'Edit' : 'Add' }} Banner</h3>
          <div class="form-group">
            <label>Title</label>
            <input [(ngModel)]="formData.title" placeholder="Banner title" />
          </div>
          <div class="form-group">
            <label>Subtitle</label>
            <input [(ngModel)]="formData.subtitle" placeholder="Banner subtitle" />
          </div>
          <div class="form-group">
            <label>Link</label>
            <input [(ngModel)]="formData.link" placeholder="Link URL" />
          </div>
          <div class="form-group">
            <label>Display Order</label>
            <input type="number" [(ngModel)]="formData.displayOrder" />
          </div>
          <div class="form-group">
            <label>Active</label>
            <input type="checkbox" [(ngModel)]="formData.active" />
          </div>
          <div class="form-group">
            <label>Image</label>
            <input type="file" (change)="onFileSelected($event)" accept="image/*" />
          </div>
          <div class="form-actions">
            <button class="btn-cancel" (click)="showForm = false">Cancel</button>
            <button class="btn-save" (click)="saveBanner()">{{ editingBanner ? 'Update' : 'Create' }}</button>
          </div>
        </div>
      </div>

      <div class="banners-grid">
        <div class="banner-card" *ngFor="let b of banners">
          <div class="banner-preview">
            <img [src]="apiService.getImageUrl(b.image)" [alt]="b.title" />
          </div>
          <div class="banner-info">
            <h4>{{ b.title }}</h4>
            <p *ngIf="b.subtitle">{{ b.subtitle }}</p>
            <span class="order-badge">Order: {{ b.displayOrder }}</span>
            <span class="status-badge" [class.inactive]="!b.active">{{ b.active ? 'Active' : 'Inactive' }}</span>
          </div>
          <div class="banner-actions">
            <button class="btn-edit" (click)="openEdit(b)">Edit</button>
            <button class="btn-delete" (click)="deleteBanner(b.id)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .admin-section { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .section-header h2 { font-size: 18px; font-weight: 700; }
    .btn-add { padding: 10px 20px; border-radius: 10px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .form-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); z-index: 1000; display: flex; align-items: center; justify-content: center; }
    .form-modal { background: white; border-radius: 20px; padding: 24px; width: 90%; max-width: 480px; max-height: 90vh; overflow-y: auto; }
    .form-modal h3 { font-size: 18px; font-weight: 700; margin-bottom: 20px; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
    .form-group input { width: 100%; padding: 10px 14px; border: 2px solid #e9ecef; border-radius: 10px; font-size: 14px; font-family: inherit; outline: none; }
    .form-group input:focus { border-color: #667eea; }
    .form-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px; }
    .btn-cancel { padding: 10px 20px; border-radius: 10px; border: 2px solid #e9ecef; background: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .btn-save { padding: 10px 20px; border-radius: 10px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .banners-grid { display: flex; flex-direction: column; gap: 16px; }
    .banner-card { display: flex; gap: 16px; padding: 16px; border: 1px solid #e9ecef; border-radius: 12px; align-items: center; }
    .banner-preview { width: 120px; height: 70px; border-radius: 8px; overflow: hidden; flex-shrink: 0; }
    .banner-preview img { width: 100%; height: 100%; object-fit: cover; }
    .banner-info { flex: 1; }
    .banner-info h4 { font-size: 15px; font-weight: 600; }
    .banner-info p { font-size: 13px; color: #747d8c; }
    .order-badge { font-size: 12px; color: #667eea; font-weight: 500; margin-right: 8px; }
    .status-badge { padding: 2px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: #d4edda; color: #155724; }
    .status-badge.inactive { background: #f8d7da; color: #721c24; }
    .banner-actions { display: flex; gap: 8px; }
    .btn-edit { padding: 6px 12px; border-radius: 6px; border: none; background: #e8f0fe; color: #1967d2; font-size: 12px; font-weight: 500; cursor: pointer; }
    .btn-delete { padding: 6px 12px; border-radius: 6px; border: none; background: #fce8e6; color: #d93025; font-size: 12px; font-weight: 500; cursor: pointer; }
  `],
})
export class BannersComponent implements OnInit {
  banners: Banner[] = [];
  showForm = false;
  editingBanner: Banner | null = null;
  selectedFile: File | null = null;
  formData: any = { title: '', subtitle: '', link: '', displayOrder: 0, active: true };

  constructor(
    public apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() { this.loadBanners(); }

  loadBanners() { this.apiService.getAllBanners().subscribe(res => this.banners = res.data); }

  openAdd() {
    this.editingBanner = null;
    this.formData = { title: '', subtitle: '', link: '', displayOrder: 0, active: true };
    this.selectedFile = null;
    this.showForm = true;
  }

  openEdit(b: Banner) {
    this.editingBanner = b;
    this.formData = { title: b.title, subtitle: b.subtitle, link: b.link, displayOrder: b.displayOrder, active: b.active };
    this.selectedFile = null;
    this.showForm = true;
  }

  onFileSelected(event: any) { this.selectedFile = event.target.files[0]; }

  saveBanner() {
    const formData = new FormData();
    Object.keys(this.formData).forEach(k => { if (this.formData[k] !== undefined && this.formData[k] !== null) formData.append(k, this.formData[k]); });
    if (this.selectedFile) formData.append('image', this.selectedFile);

    const req = this.editingBanner
      ? this.apiService.updateBanner(this.editingBanner.id, formData)
      : this.apiService.createBanner(formData);

    req.subscribe({
      next: () => { this.loadBanners(); this.showForm = false; this.snackBar.open('Banner saved!', 'OK', { duration: 2000 }); },
      error: () => this.snackBar.open('Error saving banner', 'OK', { duration: 3000 }),
    });
  }

  deleteBanner(id: string) {
    if (confirm('Delete this banner?')) {
      this.apiService.deleteBanner(id).subscribe(() => this.loadBanners());
    }
  }
}
