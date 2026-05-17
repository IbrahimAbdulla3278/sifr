import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: 'login', component: AuthLayoutComponent, children: [
    { path: '', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  ]},
  { path: 'register', component: AuthLayoutComponent, children: [
    { path: '', loadComponent: () => import('./features/auth/register/register.component').then(m => m.RegisterComponent) },
  ]},
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
      { path: 'categories', loadComponent: () => import('./features/category/category-list/category-list.component').then(m => m.CategoryListComponent) },
      { path: 'category/:slug', loadComponent: () => import('./features/product/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'product/:id', loadComponent: () => import('./features/product/product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
      { path: 'search', loadComponent: () => import('./features/search/search.component').then(m => m.SearchComponent) },
      { path: 'offers', loadComponent: () => import('./features/product/offers/offers.component').then(m => m.OffersComponent) },
      { path: 'contact', loadComponent: () => import('./features/home/contact/contact.component').then(m => m.ContactComponent) },
      { path: 'about', loadComponent: () => import('./features/home/about/about.component').then(m => m.AboutComponent) },
      { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
      { path: 'wishlist', loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent) },
      { path: 'checkout', loadComponent: () => import('./features/checkout/checkout.component').then(m => m.CheckoutComponent), canActivate: [authGuard] },
      { path: 'order-success/:id', loadComponent: () => import('./features/checkout/order-success/order-success.component').then(m => m.OrderSuccessComponent), canActivate: [authGuard] },
      { path: 'orders', loadComponent: () => import('./features/orders/orders.component').then(m => m.OrdersComponent), canActivate: [authGuard] },
      { path: 'profile', loadComponent: () => import('./features/profile/profile.component').then(m => m.ProfileComponent), canActivate: [authGuard] },
    ],
  },
  {
    path: 'admin',
    loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent),
    canActivate: [authGuard, adminGuard],
    children: [
      { path: '', redirectTo: 'categories', pathMatch: 'full' },
      { path: 'categories', loadComponent: () => import('./features/admin/components/categories/categories.component').then(m => m.CategoriesComponent) },
      { path: 'products', loadComponent: () => import('./features/admin/components/products/products.component').then(m => m.ProductsComponent) },
      { path: 'banners', loadComponent: () => import('./features/admin/components/banners/banners.component').then(m => m.BannersComponent) },
      { path: 'orders', loadComponent: () => import('./features/admin/components/orders/orders.component').then(m => m.OrdersComponent) },
      { path: 'add-admin', loadComponent: () => import('./features/admin/components/add-admin/add-admin.component').then(m => m.AddAdminComponent) },
    ],
  },
  { path: '**', redirectTo: '' },
];
