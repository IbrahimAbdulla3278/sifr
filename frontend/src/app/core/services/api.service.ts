import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiResponse, PagedResponse, Product, Category, CategoryTree, Cart, Order, Banner, User } from '../../shared/models/models';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  uploadUrl(): string {
    return environment.uploadUrl;
  }

  getImageUrl(filename: string): string {
    if (!filename) return 'assets/images/placeholder.svg';
    if (filename.startsWith('http')) return filename;
    return `${environment.apiUrl}/uploads/${filename}`;
  }

  getCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/categories`);
  }

  getAllCategories(): Observable<ApiResponse<Category[]>> {
    return this.http.get<ApiResponse<Category[]>>(`${this.apiUrl}/categories/all`);
  }

  getCategoryTree(): Observable<ApiResponse<CategoryTree[]>> {
    return this.http.get<ApiResponse<CategoryTree[]>>(`${this.apiUrl}/categories/tree`);
  }

  getCategory(slug: string): Observable<ApiResponse<Category>> {
    return this.http.get<ApiResponse<Category>>(`${this.apiUrl}/categories/slug/${slug}`);
  }

  createCategory(formData: FormData): Observable<ApiResponse<Category>> {
    return this.http.post<ApiResponse<Category>>(`${this.apiUrl}/categories`, formData);
  }

  updateCategory(id: string, formData: FormData): Observable<ApiResponse<Category>> {
    return this.http.put<ApiResponse<Category>>(`${this.apiUrl}/categories/${id}`, formData);
  }

  deleteCategory(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/categories/${id}`);
  }

  getProducts(params: any = {}): Observable<ApiResponse<PagedResponse<Product>>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        httpParams = httpParams.set(key, String(value));
      }
    });
    return this.http.get<ApiResponse<PagedResponse<Product>>>(`${this.apiUrl}/products`, { params: httpParams });
  }

  getProduct(id: string): Observable<ApiResponse<Product>> {
    return this.http.get<ApiResponse<Product>>(`${this.apiUrl}/products/${id}`);
  }

  getFeaturedProducts(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products/featured`);
  }

  getTopSelling(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products/top-selling`);
  }

  getNewArrivals(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products/new-arrivals`);
  }

  getRelatedProducts(id: string): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/products/${id}/related`);
  }

  createProduct(formData: FormData): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.apiUrl}/products`, formData);
  }

  updateProduct(id: string, formData: FormData): Observable<ApiResponse<Product>> {
    return this.http.put<ApiResponse<Product>>(`${this.apiUrl}/products/${id}`, formData);
  }

  deleteProduct(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/products/${id}`);
  }

  addReview(productId: string, data: { rating: number; comment: string }): Observable<ApiResponse<Product>> {
    return this.http.post<ApiResponse<Product>>(`${this.apiUrl}/products/${productId}/reviews`, data);
  }

  getCart(): Observable<ApiResponse<Cart>> {
    return this.http.get<ApiResponse<Cart>>(`${this.apiUrl}/cart`);
  }

  addToCart(productId: string, variantId?: string, quantity: number = 1): Observable<ApiResponse<Cart>> {
    let params = new HttpParams().set('productId', productId).set('quantity', quantity);
    if (variantId) params = params.set('variantId', variantId);
    return this.http.post<ApiResponse<Cart>>(`${this.apiUrl}/cart/add`, null, { params });
  }

  updateCartItem(productId: string, quantity: number, variantId?: string): Observable<ApiResponse<Cart>> {
    let params = new HttpParams().set('productId', productId).set('quantity', quantity);
    if (variantId) params = params.set('variantId', variantId);
    return this.http.put<ApiResponse<Cart>>(`${this.apiUrl}/cart/update`, null, { params });
  }

  removeFromCart(productId: string, variantId?: string): Observable<ApiResponse<Cart>> {
    let params = new HttpParams().set('productId', productId);
    if (variantId) params = params.set('variantId', variantId);
    return this.http.delete<ApiResponse<Cart>>(`${this.apiUrl}/cart/remove`, { params });
  }

  clearCart(): Observable<ApiResponse<Cart>> {
    return this.http.delete<ApiResponse<Cart>>(`${this.apiUrl}/cart/clear`);
  }

  createOrder(data: { addressId: string; paymentMethod?: string; notes?: string }): Observable<ApiResponse<Order>> {
    return this.http.post<ApiResponse<Order>>(`${this.apiUrl}/orders`, data);
  }

  getOrders(page: number = 0, size: number = 10): Observable<ApiResponse<PagedResponse<Order>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<PagedResponse<Order>>>(`${this.apiUrl}/orders`, { params });
  }

  getOrder(id: string): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${this.apiUrl}/orders/${id}`);
  }

  getActiveBanners(): Observable<ApiResponse<Banner[]>> {
    return this.http.get<ApiResponse<Banner[]>>(`${this.apiUrl}/banners/active`);
  }

  getAllBanners(): Observable<ApiResponse<Banner[]>> {
    return this.http.get<ApiResponse<Banner[]>>(`${this.apiUrl}/banners`);
  }

  createBanner(formData: FormData): Observable<ApiResponse<Banner>> {
    return this.http.post<ApiResponse<Banner>>(`${this.apiUrl}/banners`, formData);
  }

  updateBanner(id: string, formData: FormData): Observable<ApiResponse<Banner>> {
    return this.http.put<ApiResponse<Banner>>(`${this.apiUrl}/banners/${id}`, formData);
  }

  deleteBanner(id: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.apiUrl}/banners/${id}`);
  }

  getWishlist(): Observable<ApiResponse<Product[]>> {
    return this.http.get<ApiResponse<Product[]>>(`${this.apiUrl}/wishlist`);
  }

  addToWishlist(productId: string): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/wishlist/add/${productId}`, null);
  }

  removeFromWishlist(productId: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiUrl}/wishlist/remove/${productId}`);
  }

  checkWishlist(productId: string): Observable<ApiResponse<boolean>> {
    return this.http.get<ApiResponse<boolean>>(`${this.apiUrl}/wishlist/check/${productId}`);
  }

  addAddress(address: any): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/users/addresses`, address);
  }

  updateAddress(addressId: string, address: any): Observable<ApiResponse<User>> {
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/users/addresses/${addressId}`, address);
  }

  deleteAddress(addressId: string): Observable<ApiResponse<User>> {
    return this.http.delete<ApiResponse<User>>(`${this.apiUrl}/users/addresses/${addressId}`);
  }

  addAdmin(data: { name: string; email: string; password: string }): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.apiUrl}/admin/add-admin`, data);
  }

  getAdmins(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.apiUrl}/admin/admins`);
  }

  getAllOrdersAdmin(page: number = 0, size: number = 20): Observable<ApiResponse<PagedResponse<Order>>> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<ApiResponse<PagedResponse<Order>>>(`${this.apiUrl}/admin/orders`, { params });
  }

  updateOrderStatus(id: string, status: string): Observable<ApiResponse<Order>> {
    let params = new HttpParams().set('status', status);
    return this.http.put<ApiResponse<Order>>(`${this.apiUrl}/admin/orders/${id}/status`, null, { params });
  }

  updatePaymentStatus(id: string, status: string): Observable<ApiResponse<Order>> {
    let params = new HttpParams().set('status', status);
    return this.http.put<ApiResponse<Order>>(`${this.apiUrl}/admin/orders/${id}/payment`, null, { params });
  }
}
