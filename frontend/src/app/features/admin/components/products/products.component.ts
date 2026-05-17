import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Product, Category } from '../../../../shared/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-section">
      <div class="section-header">
        <h2>Manage Products</h2>
        <button class="btn-add" (click)="openAdd()">+ Add Product</button>
      </div>

      <div class="form-overlay" *ngIf="showForm" (click)="showForm = false">
        <div class="form-modal wide" (click)="$event.stopPropagation()">
          <h3>{{ editingProduct ? 'Edit' : 'Add' }} Product</h3>
          <div class="form-row">
            <div class="form-group">
              <label>SKU</label>
              <input [(ngModel)]="formData.sku" placeholder="SKU" />
            </div>
            <div class="form-group">
              <label>Brand</label>
              <input [(ngModel)]="formData.brand" placeholder="Brand" />
            </div>
          </div>
          <div class="form-group">
            <label>Name</label>
            <input [(ngModel)]="formData.name" placeholder="Product name" />
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="formData.description" placeholder="Description"></textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Category</label>
              <select [(ngModel)]="formData.categoryId">
                <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label>Stock</label>
              <input type="number" [(ngModel)]="formData.stock" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Price</label>
              <input type="number" [(ngModel)]="formData.price" />
            </div>
            <div class="form-group">
              <label>Discount Price</label>
              <input type="number" [(ngModel)]="formData.discountPrice" />
            </div>
          </div>
          <div class="form-group">
            <label>Featured</label>
            <input type="checkbox" [(ngModel)]="formData.featured" />
          </div>
          <div class="form-group">
            <label>Images</label>
            <input type="file" (change)="onFilesSelected($event)" accept="image/*" multiple />
          </div>

          <div class="variants-section">
            <h4>Variants</h4>
            <div class="variant-row" *ngFor="let v of variants; let i = index">
              <input [(ngModel)]="v.name" placeholder="Name (e.g. Size)" />
              <input [(ngModel)]="v.value" placeholder="Value (e.g. M)" />
              <input [(ngModel)]="v.sku" placeholder="SKU" />
              <input type="number" [(ngModel)]="v.price" placeholder="Price" />
              <input type="number" [(ngModel)]="v.stock" placeholder="Stock" />
              <button class="btn-remove" (click)="variants.splice(i,1)">X</button>
            </div>
            <button class="btn-add-variant" (click)="addVariant()">+ Add Variant</button>
          </div>

          <div class="form-actions">
            <button class="btn-cancel" (click)="showForm = false">Cancel</button>
            <button class="btn-save" (click)="saveProduct()">{{ editingProduct ? 'Update' : 'Create' }}</button>
          </div>
        </div>
      </div>

      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let p of products">
              <td><img *ngIf="p.images[0]" [src]="apiService.getImageUrl(p.images[0])" class="thumb" /></td>
              <td>{{ p.name }}</td>
              <td class="slug">{{ p.sku }}</td>
              <td>&#8377;{{ p.discountPrice || p.price | number }}</td>
              <td>{{ p.stock }}</td>
              <td>{{ p.categoryName }}</td>
              <td class="actions">
                <button class="btn-edit" (click)="openEdit(p)">Edit</button>
                <button class="btn-delete" (click)="deleteProduct(p.id)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .admin-section { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.06); }
    .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
    .section-header h2 { font-size: 18px; font-weight: 700; }
    .btn-add { padding: 10px 20px; border-radius: 10px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .form-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.4); z-index: 1000; display: flex; align-items: center; justify-content: center; }
    .form-modal.wide { background: white; border-radius: 20px; padding: 24px; width: 90%; max-width: 700px; max-height: 90vh; overflow-y: auto; }
    .form-modal h3 { font-size: 18px; font-weight: 700; margin-bottom: 20px; }
    .form-row { display: flex; gap: 12px; }
    .form-row .form-group { flex: 1; }
    .form-group { margin-bottom: 16px; }
    .form-group label { display: block; font-size: 13px; font-weight: 600; margin-bottom: 4px; }
    .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px 14px; border: 2px solid #e9ecef; border-radius: 10px; font-size: 14px; font-family: inherit; outline: none; }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: #667eea; }
    .form-group textarea { resize: vertical; min-height: 80px; }
    .form-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px; }
    .btn-cancel { padding: 10px 20px; border-radius: 10px; border: 2px solid #e9ecef; background: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .btn-save { padding: 10px 20px; border-radius: 10px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .table-container { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th { text-align: left; padding: 12px; font-size: 12px; font-weight: 600; color: #747d8c; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #e9ecef; }
    td { padding: 12px; font-size: 14px; border-bottom: 1px solid #e9ecef; }
    .thumb { width: 40px; height: 40px; border-radius: 8px; object-fit: cover; }
    .slug { color: #a4b0be; font-size: 13px; }
    .actions { display: flex; gap: 8px; }
    .btn-edit { padding: 6px 12px; border-radius: 6px; border: none; background: #e8f0fe; color: #1967d2; font-size: 12px; font-weight: 500; cursor: pointer; }
    .btn-delete { padding: 6px 12px; border-radius: 6px; border: none; background: #fce8e6; color: #d93025; font-size: 12px; font-weight: 500; cursor: pointer; }
    .variants-section { margin: 16px 0; padding: 16px; background: #f8f9fa; border-radius: 12px; }
    .variants-section h4 { font-size: 14px; font-weight: 600; margin-bottom: 12px; }
    .variant-row { display: flex; gap: 8px; margin-bottom: 8px; }
    .variant-row input { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px; font-size: 12px; font-family: inherit; }
    .btn-remove { padding: 4px 8px; border-radius: 4px; border: none; background: #fce8e6; color: #d93025; font-size: 12px; cursor: pointer; }
    .btn-add-variant { padding: 8px 16px; border-radius: 8px; border: 1px dashed #667eea; background: transparent; color: #667eea; font-size: 13px; font-weight: 500; cursor: pointer; }
  `],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  categories: Category[] = [];
  showForm = false;
  editingProduct: Product | null = null;
  selectedFiles: File[] = [];
  formData: any = { sku: '', name: '', description: '', categoryId: '', price: 0, discountPrice: 0, brand: '', stock: 0, featured: false };
  variants: any[] = [];

  constructor(
    public apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.apiService.getAllCategories().subscribe(res => this.categories = res.data);
  }

  loadProducts() {
    this.apiService.getProducts({ page: 0, size: 100, sort: 'newest' }).subscribe(res => this.products = res.data.content);
  }

  openAdd() {
    this.editingProduct = null;
    this.formData = { sku: '', name: '', description: '', categoryId: '', price: 0, discountPrice: 0, brand: '', stock: 0, featured: false };
    this.variants = [];
    this.selectedFiles = [];
    this.showForm = true;
  }

  openEdit(p: Product) {
    this.editingProduct = p;
    this.formData = { sku: p.sku, name: p.name, description: p.description, categoryId: p.categoryId, price: p.price, discountPrice: p.discountPrice || 0, brand: p.brand || '', stock: p.stock, featured: p.featured };
    this.variants = p.variants.map(v => ({ name: v.name, value: v.value, sku: v.sku, price: v.price, stock: v.stock }));
    this.selectedFiles = [];
    this.showForm = true;
  }

  onFilesSelected(event: any) { this.selectedFiles = Array.from(event.target.files); }

  addVariant() { this.variants.push({ name: '', value: '', sku: '', price: 0, stock: 0 }); }

  saveProduct() {
    const formData = new FormData();
    const prodData: any = {};
    Object.keys(this.formData).forEach(k => { if (this.formData[k] !== undefined && this.formData[k] !== null) prodData[k] = this.formData[k]; });
    if (this.variants.length > 0) prodData.variants = this.variants;
    formData.append('product', new Blob([JSON.stringify(prodData)], { type: 'application/json' }));
    this.selectedFiles.forEach(f => formData.append('images', f));

    const req = this.editingProduct
      ? this.apiService.updateProduct(this.editingProduct.id, formData)
      : this.apiService.createProduct(formData);

    req.subscribe({
      next: () => { this.loadProducts(); this.showForm = false; this.snackBar.open('Product saved!', 'OK', { duration: 2000 }); },
      error: (err) => this.snackBar.open(err.error?.message || 'Error saving product', 'OK', { duration: 3000 }),
    });
  }

  deleteProduct(id: string) {
    if (confirm('Delete this product?')) {
      this.apiService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }
}
