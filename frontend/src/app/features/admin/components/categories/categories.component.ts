import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../core/services/api.service';
import { Category, CategoryTree } from '../../../../shared/models/models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="admin-section">
      <div class="section-header">
        <h2>Manage Categories</h2>
        <button class="btn-add" (click)="openAdd()">+ Add Category</button>
      </div>

      <div class="form-overlay" *ngIf="showForm" (click)="showForm = false">
        <div class="form-modal" (click)="$event.stopPropagation()">
          <h3>{{ editingCategory ? 'Edit' : 'Add' }} Category</h3>
          <div class="form-group">
            <label>Name</label>
            <input [(ngModel)]="formData.name" placeholder="Category name" />
          </div>
          <div class="form-group">
            <label>Parent Category</label>
            <select [(ngModel)]="formData.parentId">
              <option value="">None (Top Level)</option>
              <option *ngFor="let c of allCategories" [value]="c.id">{{ getIndent(c) }}{{ c.name }}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Description</label>
            <textarea [(ngModel)]="formData.description" placeholder="Category description"></textarea>
          </div>
          <div class="form-group">
            <label>Display Order</label>
            <input type="number" [(ngModel)]="formData.displayOrder" placeholder="Order" />
          </div>
          <div class="form-group">
            <label>Image</label>
            <input type="file" (change)="onFileSelected($event)" accept="image/*" />
          </div>
          <div class="form-actions">
            <button class="btn-cancel" (click)="showForm = false">Cancel</button>
            <button class="btn-save" (click)="saveCategory()">{{ editingCategory ? 'Update' : 'Create' }}</button>
          </div>
        </div>
      </div>

      <div class="tree-container">
        <div class="tree-node" *ngFor="let node of categoryTree">
          <div class="node-row" [class.has-children]="node.children.length > 0">
            <div class="node-info">
              <div class="node-icon"><span class="material-icons-round">folder</span></div>
              <div>
                <div class="node-name">{{ node.name }}</div>
                <div class="node-slug">{{ node.slug }}</div>
              </div>
            </div>
            <div class="node-meta">
              <span class="status" [class.inactive]="!node.active">{{ node.active ? 'Active' : 'Inactive' }}</span>
              <span class="order-badge">{{ node.displayOrder }}</span>
            </div>
            <div class="node-actions">
              <button class="btn-edit" (click)="openEdit(node)">Edit</button>
              <button class="btn-delete" (click)="deleteCategory(node.id)">Delete</button>
            </div>
          </div>
          <div class="children" *ngIf="node.children.length > 0">
            <div class="tree-node child" *ngFor="let child of node.children">
              <div class="node-row">
                <div class="node-info">
                  <div class="node-icon"><span class="material-icons-round">subdirectory_arrow_right</span></div>
                  <div>
                    <div class="node-name">{{ child.name }}</div>
                    <div class="node-slug">{{ child.slug }}</div>
                  </div>
                </div>
                <div class="node-meta">
                  <span class="status" [class.inactive]="!child.active">{{ child.active ? 'Active' : 'Inactive' }}</span>
                  <span class="order-badge">{{ child.displayOrder }}</span>
                </div>
                <div class="node-actions">
                  <button class="btn-edit" (click)="openEdit(child)">Edit</button>
                  <button class="btn-delete" (click)="deleteCategory(child.id)">Delete</button>
                </div>
              </div>
              <div class="grandchildren" *ngIf="child.children.length > 0">
                <div class="tree-node grandchild" *ngFor="let gc of child.children">
                  <div class="node-row">
                    <div class="node-info">
                      <div class="node-icon"><span class="material-icons-round">subdirectory_arrow_right</span></div>
                      <div>
                        <div class="node-name">{{ gc.name }}</div>
                        <div class="node-slug">{{ gc.slug }}</div>
                      </div>
                    </div>
                    <div class="node-meta">
                      <span class="status" [class.inactive]="!gc.active">{{ gc.active ? 'Active' : 'Inactive' }}</span>
                      <span class="order-badge">{{ gc.displayOrder }}</span>
                    </div>
                    <div class="node-actions">
                      <button class="btn-edit" (click)="openEdit(gc)">Edit</button>
                      <button class="btn-delete" (click)="deleteCategory(gc.id)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="empty-state" *ngIf="categoryTree.length === 0">
          <p>No categories found. Click "+ Add Category" to create one.</p>
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
    .form-group input, .form-group textarea, .form-group select { width: 100%; padding: 10px 14px; border: 2px solid #e9ecef; border-radius: 10px; font-size: 14px; font-family: inherit; outline: none; background: white; }
    .form-group input:focus, .form-group textarea:focus, .form-group select:focus { border-color: #667eea; }
    .form-group textarea { resize: vertical; min-height: 80px; }
    .form-actions { display: flex; gap: 12px; justify-content: flex-end; margin-top: 20px; }
    .btn-cancel { padding: 10px 20px; border-radius: 10px; border: 2px solid #e9ecef; background: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .btn-save { padding: 10px 20px; border-radius: 10px; border: none; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; font-size: 14px; font-weight: 600; cursor: pointer; font-family: inherit; }
    .tree-container { display: flex; flex-direction: column; gap: 4px; }
    .tree-node { border-radius: 10px; overflow: hidden; }
    .node-row { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 10px; background: #fafafa; margin-bottom: 4px; transition: background 0.2s; }
    .node-row:hover { background: #f0f0f5; }
    .node-row.has-children { border-left: 3px solid #667eea; }
    .node-info { display: flex; align-items: center; gap: 10px; flex: 1; min-width: 0; }
    .node-icon .material-icons-round { font-size: 20px; color: #667eea; }
    .node-name { font-size: 14px; font-weight: 600; }
    .node-slug { font-size: 12px; color: #a4b0be; }
    .node-meta { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
    .status { padding: 3px 8px; border-radius: 999px; font-size: 11px; font-weight: 600; background: #d4edda; color: #155724; }
    .status.inactive { background: #f8d7da; color: #721c24; }
    .order-badge { padding: 2px 8px; border-radius: 6px; background: #e9ecef; font-size: 11px; font-weight: 600; color: #747d8c; }
    .node-actions { display: flex; gap: 6px; flex-shrink: 0; }
    .btn-edit { padding: 5px 10px; border-radius: 6px; border: none; background: #e8f0fe; color: #1967d2; font-size: 12px; font-weight: 500; cursor: pointer; }
    .btn-delete { padding: 5px 10px; border-radius: 6px; border: none; background: #fce8e6; color: #d93025; font-size: 12px; font-weight: 500; cursor: pointer; }
    .children { padding-left: 24px; margin-top: 2px; }
    .grandchildren { padding-left: 24px; margin-top: 2px; }
    .child .node-row { background: #f5f5ff; }
    .grandchild .node-row { background: #fafaff; }
    .empty-state { text-align: center; padding: 40px 20px; color: #a4b0be; }
  `],
})
export class CategoriesComponent implements OnInit {
  categoryTree: CategoryTree[] = [];
  allCategories: Category[] = [];
  showForm = false;
  editingCategory: Category | null = null;
  selectedFile: File | null = null;
  formData: any = { name: '', description: '', displayOrder: 0, active: true, parentId: '' };

  constructor(
    public apiService: ApiService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() { this.loadCategories(); }

  loadCategories() {
    this.apiService.getCategoryTree().subscribe(res => this.categoryTree = res.data);
    this.apiService.getAllCategories().subscribe(res => this.allCategories = res.data);
  }

  getIndent(cat: Category): string {
    return cat.parentId ? '  └ ' : '';
  }

  openAdd() {
    this.editingCategory = null;
    this.formData = { name: '', description: '', displayOrder: 0, active: true, parentId: '' };
    this.selectedFile = null;
    this.showForm = true;
  }

  openEdit(cat: any) {
    this.editingCategory = cat;
    this.formData = { name: cat.name, description: cat.description, displayOrder: cat.displayOrder, active: cat.active, parentId: cat.parentId || '' };
    this.selectedFile = null;
    this.showForm = true;
  }

  onFileSelected(event: any) { this.selectedFile = event.target.files[0]; }

  saveCategory() {
    const formData = new FormData();
    const catData: any = {};
    if (this.formData.name) catData.name = this.formData.name;
    if (this.formData.description) catData.description = this.formData.description;
    if (this.formData.displayOrder !== undefined && this.formData.displayOrder !== null) catData.displayOrder = this.formData.displayOrder;
    if (this.formData.active !== undefined) catData.active = this.formData.active;
    if (this.formData.parentId) catData.parentId = this.formData.parentId;
    formData.append('category', new Blob([JSON.stringify(catData)], { type: 'application/json' }));
    if (this.selectedFile) formData.append('image', this.selectedFile);

    const req = this.editingCategory
      ? this.apiService.updateCategory(this.editingCategory.id, formData)
      : this.apiService.createCategory(formData);

    req.subscribe({
      next: () => { this.loadCategories(); this.showForm = false; this.snackBar.open('Category saved!', 'OK', { duration: 2000 }); },
      error: (err) => this.snackBar.open(err.error?.message || 'Error saving category', 'OK', { duration: 3000 }),
    });
  }

  deleteCategory(id: string) {
    if (confirm('Delete this category and all its subcategories?')) {
      this.apiService.deleteCategory(id).subscribe(() => this.loadCategories());
    }
  }
}
