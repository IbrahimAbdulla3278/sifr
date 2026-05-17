import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Banner, Product, CategoryTree } from '../../shared/models/models';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <div class="home">

      <section class="hero" *ngIf="banners.length > 0">
        <div class="hero-track" [style.transform]="'translateX(-' + slide * 100 + '%)'">
          <div class="hero-slide" *ngFor="let b of banners">
            <img [src]="apiService.getImageUrl(b.image)" alt="" class="hero-bg-img" />
            <div class="hero-overlay"></div>
            <div class="hero-content">
              <span class="hero-badge">New Collection</span>
              <h1 class="hero-title">{{ b.title }}</h1>
              <p class="hero-sub">{{ b.subtitle }}</p>
              <a [routerLink]="b.link" class="hero-cta">Shop Now</a>
            </div>
          </div>
        </div>
        <div class="hero-dots">
          <span *ngFor="let b of banners;let i=index" [class.active]="i===slide" (click)="slide=i"></span>
        </div>
      </section>

      <section class="sec">
        <div class="sec-h"><h2>Shop by Category</h2><a routerLink="/categories" class="sec-link">Explore All</a></div>
        <div class="cats">
          <button *ngFor="let cat of tree" class="cat-chip" (click)="showSub(cat)">
            <span class="chip-img-w"><img [src]="apiService.getImageUrl(cat.image)" alt="" class="chip-img" loading="lazy" /></span>
            <span class="chip-label">{{ cat.name }}</span>
          </button>
        </div>
      </section>

      <section class="sec" *ngIf="featuredProducts.length > 0">
        <div class="sec-h"><h2>Featured</h2><a routerLink="/products" class="sec-link">View All</a></div>
        <div class="h-scroll"><app-product-card *ngFor="let p of featuredProducts" [product]="p" class="pw"></app-product-card></div>
      </section>

      <section class="sec" *ngIf="newArrivals.length > 0">
        <div class="sec-h"><h2>New Arrivals</h2><a routerLink="/products" class="sec-link">View All</a></div>
        <div class="grid-2"><app-product-card *ngFor="let p of newArrivals" [product]="p"></app-product-card></div>
      </section>
    </div>
  `,
  styles: [`
    .home { padding-bottom:8px; }

    .hero { position:relative;overflow:hidden;box-sizing:border-box; }
    .hero-track { display:flex;transition:transform .6s cubic-bezier(.25,.46,.45,.94); }
    .hero-slide { min-width:100%;position:relative;display:flex;align-items:center;min-height:240px;padding:48px 28px;box-sizing:border-box;overflow:hidden; }
    .hero-bg-img { position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:0; }
    .hero-overlay { position:absolute;inset:0;z-index:1;background:linear-gradient(135deg,rgba(10,10,10,.88) 0%,rgba(10,10,10,.35) 55%,rgba(10,10,10,.1) 100%); }
    .hero-content { position:relative;z-index:3;max-width:480px;animation:fadeUp .6s ease; }
    .hero-badge { display:inline-block;font-size:11px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:#F4A7A7;background:rgba(244,167,167,.12);padding:5px 14px;border-radius:20px;margin-bottom:14px; }
    .hero-title { font-family:Playfair Display,Georgia,serif;font-size:30px;font-weight:700;color:white;margin:0 0 8px;line-height:1.15;letter-spacing:-.5px; }
    .hero-sub { font-size:14px;color:rgba(255,255,255,.6);margin:0 0 22px;line-height:1.6;max-width:360px; }
    .hero-cta { display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#F4A7A7 0%,#E8A87C 100%);color:white;border-radius:50px;font-size:13px;font-weight:600;text-decoration:none;transition:all .3s;box-shadow:0 4px 20px rgba(244,167,167,.25); }
    .hero-cta:hover { transform:translateY(-2px);box-shadow:0 8px 30px rgba(244,167,167,.35); }
    .hero-dots { position:absolute;bottom:14px;left:50%;transform:translateX(-50%);display:flex;gap:8px;z-index:4; }
    .hero-dots span { width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.25);cursor:pointer;transition:all .4s; }
    .hero-dots span.active { background:#F4A7A7;width:28px;border-radius:5px; }
    @keyframes fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @media(min-width:600px){ .hero-slide{min-height:300px;padding:52px 40px} .hero-title{font-size:38px} .hero-sub{font-size:15px;max-width:400px} .hero-badge{font-size:12px;padding:6px 16px} .hero-cta{padding:13px 32px;font-size:14px} }
    @media(min-width:768px){ .hero-slide{min-height:380px;padding:64px 52px} .hero-title{font-size:46px} .hero-sub{font-size:16px;margin-bottom:28px} .hero-badge{margin-bottom:18px} .hero-cta{padding:14px 36px;font-size:15px} .hero-dots{bottom:20px;gap:10px} .hero-dots span{width:10px;height:10px} .hero-dots span.active{width:32px} }
    @media(min-width:1024px){ .hero-slide{min-height:460px;padding:80px 64px} .hero-title{font-size:54px} .hero-sub{font-size:17px;max-width:440px} }

    .sec { padding:20px 16px 0; }
    .sec-h { display:flex;align-items:center;justify-content:space-between;margin-bottom:14px; }
    .sec-h h2 { font-family:Playfair Display,Georgia,serif;font-size:18px;font-weight:700;color:#0A0A0A;margin:0;letter-spacing:-.3px; }
    .sec-link { font-size:12px;font-weight:500;color:#F4A7A7;text-decoration:none;white-space:nowrap;transition:opacity .2s; }
    .sec-link:hover { opacity:.7; }
    @media(min-width:768px){ .sec{padding:28px 24px 0} .sec-h h2{font-size:22px} .sec-link{font-size:13px} }

    .cats { display:flex;gap:14px;overflow-x:auto;padding:0 0 6px;-ms-overflow-style:none;scrollbar-width:none; }
    .cats::-webkit-scrollbar { display:none; }
    .cat-chip { display:flex;flex-direction:column;align-items:center;gap:8px;border:none;flex-shrink:0;cursor:pointer;transition:all .2s;font-family:inherit;background:none;padding:0;min-width:64px; }
    .cat-chip:hover .chip-img-w { transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,.08); }
    .chip-img-w { width:56px;height:56px;border-radius:50%;overflow:hidden;background:#F5F0EB;transition:all .25s;box-shadow:0 2px 8px rgba(0,0,0,.04); }
    .chip-img { width:100%;height:100%;object-fit:cover;display:block; }
    .chip-label { font-size:11px;font-weight:500;color:#1A1A1A;text-align:center;white-space:nowrap; }
    @media(min-width:768px){ .cat-chip{min-width:72px} .chip-img-w{width:64px;height:64px} .chip-label{font-size:12px} }

    .h-scroll { display:flex;gap:12px;overflow-x:auto;padding-bottom:6px;-ms-overflow-style:none;scrollbar-width:none; }
    .h-scroll::-webkit-scrollbar { display:none; }
    .pw { min-width:160px;flex-shrink:0; }
    @media(min-width:600px){ .pw{min-width:200px} }
    @media(min-width:1024px){ .pw{min-width:220px} }

    .grid-2 { display:grid;grid-template-columns:repeat(2,1fr);gap:12px; }
    @media(min-width:600px){ .grid-2{grid-template-columns:repeat(3,1fr)} }
    @media(min-width:1024px){ .grid-2{grid-template-columns:repeat(4,1fr);gap:16px} }
  `],
})
export class HomeComponent implements OnInit {
  banners: Banner[] = [];
  tree: CategoryTree[] = [];
  featuredProducts: Product[] = [];
  newArrivals: Product[] = [];
  slide = 0;

  constructor(public apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.apiService.getActiveBanners().subscribe(res => this.banners = res.data);
    this.apiService.getCategoryTree().subscribe(res => this.tree = res.data);
    this.apiService.getFeaturedProducts().subscribe(res => { this.featuredProducts = res.data; this.newArrivals = res.data; });
    setInterval(() => { if(this.banners.length) this.slide = (this.slide + 1) % this.banners.length; }, 5000);
  }

  prevSlide() { this.slide = this.slide > 0 ? this.slide - 1 : this.banners.length - 1; }
  nextSlide() { this.slide = (this.slide + 1) % this.banners.length; }

  showSub(cat: CategoryTree) { this.router.navigate(['/category', cat.slug]); }
}
