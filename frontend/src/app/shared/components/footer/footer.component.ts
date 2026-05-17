import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="footer">
      <div class="f-wrap">
        <div class="f-trust">
          <div class="ti"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg><span>Secure Payments</span></div>
          <div class="ti"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg><span>Genuine Product</span></div>
          <div class="ti"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10"/></svg><span>Try &amp; Buy</span></div>
          <div class="ti"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg><span>7 Day Return</span></div>
        </div>

        <div class="f-social">
          <div class="f-soc-icons">
            <a href="https://www.instagram.com" target="_blank" class="soc" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg></a>
            <a href="https://www.facebook.com" target="_blank" class="soc" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>
          </div>
          <span class="f-soc-txt">Show us some <svg class="f-heart" viewBox="0 0 24 24" fill="#F4A7A7" width="14" height="14"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg> on our social media</span>
        </div>

        <div class="f-main">
          <div class="f-left">
            <span class="f-brand">SIFR</span>
            <p>Experience the SIFR App on your mobile.</p>
            <div class="app-btns">
              <a href="#" class="app-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.609 20.142V3.858a1.444 1.444 0 011.422-1.423h13.938a1.444 1.444 0 011.423 1.423v16.284a1.444 1.444 0 01-1.423 1.423H5.031a1.444 1.444 0 01-1.422-1.423z"/></svg><span><small>GET IT ON</small><strong>Google Play</strong></span></a>
              <a href="#" class="app-btn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg><span><small>Download on the</small><strong>App Store</strong></span></a>
            </div>
            <div class="f-news">
              <span>Subscribe to our newsletter</span>
              <div class="news-row"><input type="email" placeholder="Enter your email" /><button>SUBSCRIBE</button></div>
            </div>
          </div>

          <div class="f-links">
            <div class="f-col"><h4>Help</h4><a routerLink="/contact">Contact Us</a><a href="#">FAQ's</a><a routerLink="/orders">Track Order</a><a href="#">Careers</a><a href="#">Sitemap</a></div>
            <div class="f-col"><h4>Quick Links</h4><a routerLink="/offers">Offer Zone</a><a routerLink="/categories">Brands</a></div>
            <div class="f-col"><h4>Top Categories</h4><a routerLink="/category/top-wear">Top Wear</a><a routerLink="/category/bottom-wear">Bottom wear</a><a routerLink="/category/athleisure">Athleisure</a><a routerLink="/category/co-ords">Co-ords</a><a routerLink="/category/dresses">Dresses</a><a routerLink="/category/sleepwear">Sleep Wear</a><a routerLink="/category/innerwear">Inner Wear</a><a routerLink="/category/jumpsuits">Jumpsuits</a></div>
            <div class="f-col"><h4>About Us</h4><a routerLink="/about">Who are we</a></div>
            <div class="f-col"><h4>Policies</h4><a href="#">Terms and Conditions</a><a href="#">Privacy Policy</a><a href="#">Refund Policy</a><a href="#">Return &amp; Exchange Policy</a><a href="#">Shipping Policy</a></div>
          </div>
          <div class="f-links-mob">
            <details class="f-acc"><summary>Help<svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9"/></svg></summary><div class="acc-body"><a routerLink="/contact">Contact Us</a><a href="#">FAQ's</a><a routerLink="/orders">Track Order</a><a href="#">Careers</a><a href="#">Sitemap</a></div></details>
            <details class="f-acc"><summary>Quick Links<svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9"/></svg></summary><div class="acc-body"><a routerLink="/offers">Offer Zone</a><a routerLink="/categories">Brands</a></div></details>
            <details class="f-acc"><summary>Top Categories<svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9"/></svg></summary><div class="acc-body"><a routerLink="/category/top-wear">Top Wear</a><a routerLink="/category/bottom-wear">Bottom wear</a><a routerLink="/category/athleisure">Athleisure</a><a routerLink="/category/co-ords">Co-ords</a><a routerLink="/category/dresses">Dresses</a><a routerLink="/category/sleepwear">Sleep Wear</a><a routerLink="/category/innerwear">Inner Wear</a><a routerLink="/category/jumpsuits">Jumpsuits</a></div></details>
            <details class="f-acc"><summary>About Us<svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9"/></svg></summary><div class="acc-body"><a routerLink="/about">Who are we</a></div></details>
            <details class="f-acc"><summary>Policies<svg class="acc-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v3m0 0v3m0-3h3m-3 0H9"/></svg></summary><div class="acc-body"><a href="#">Terms and Conditions</a><a href="#">Privacy Policy</a><a href="#">Refund Policy</a><a href="#">Return &amp; Exchange Policy</a><a href="#">Shipping Policy</a></div></details>
          </div>
        </div>

        <div class="f-copy">&copy; 2024 SLIKSYNC TECHNOLOGIES PRIVATE LIMITED All Rights Reserved.</div>
      </div>
    </footer>
  `,
  styles: [`
    .footer { background:#0A0A0A;color:rgba(255,255,255,.7);margin-top:24px; }
    .f-wrap { max-width:1240px;margin:0 auto;padding:0 4px; }
    @media(min-width:1024px){ .f-wrap{padding:0 104px} }

    .f-trust { display:flex;align-items:center;justify-content:space-around;padding:12px 4px;border-bottom:1px solid rgba(255,255,255,.06);gap:0; }
    .ti { display:flex;flex-direction:column;align-items:center;gap:4px;flex:1;max-width:100px; }
    .ti svg { width:28px;height:28px;color:#F4A7A7;opacity:.5; }
    .ti span { font-size:9px;font-weight:600;color:rgba(255,255,255,.4);text-align:center;line-height:1.2; }
    @media(min-width:768px){ .f-trust{gap:40px;justify-content:center;padding:16px 0} .ti svg{width:36px;height:36px} .ti span{font-size:10px} }

    .f-social { display:flex;flex-direction:column;align-items:center;gap:10px;padding:20px 16px;border-bottom:1px solid rgba(255,255,255,.06); }
    .f-soc-icons { display:flex;gap:12px; }
    .soc { width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.08);border-radius:50%;color:rgba(255,255,255,.4);transition:all .15s; }
    .soc:hover { background:rgba(255,255,255,.12);color:white; }
    .soc svg { width:14px;height:14px; }
    .f-soc-txt { font-size:12px;font-weight:500;color:rgba(255,255,255,.5);display:flex;align-items:center;gap:4px; }
    .f-heart { display:inline-block;vertical-align:middle; }
    @media(min-width:1024px){ .f-social{flex-direction:row;gap:20px;padding:20px 0} }

    .f-main { display:flex;flex-direction:column;padding:16px 0;gap:20px; }
    @media(min-width:1024px){ .f-main{flex-direction:row;gap:5%;padding:24px 0} }

    .f-left { display:flex;flex-direction:column;gap:12px;padding:0 12px; }
    @media(min-width:1024px){ .f-left{width:35%;padding:0} }
    .f-brand { font-size:20px;font-weight:700;letter-spacing:2px;color:white; }
    .f-left p { font-size:12px;color:rgba(255,255,255,.4); }
    .app-btns { display:flex;gap:8px;flex-wrap:wrap; }
    .app-btn { display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(255,255,255,.08);border-radius:8px;text-decoration:none;color:rgba(255,255,255,.8);font-size:11px;transition:background .15s;min-width:140px; }
    .app-btn:hover { background:rgba(255,255,255,.12); }
    .app-btn svg { width:18px;height:18px;flex-shrink:0; }
    .app-btn span { display:flex;flex-direction:column;gap:1px; }
    .app-btn small { font-size:8px;color:rgba(255,255,255,.4); }
    .app-btn strong { font-size:11px;color:white; }

    .f-news { display:flex;flex-direction:column;gap:8px; }
    .f-news span { font-size:12px;font-weight:500;color:rgba(255,255,255,.5); }
    .news-row { display:flex;border:1px solid rgba(255,255,255,.1);border-radius:6px;overflow:hidden;max-width:360px; }
    .news-row input { flex:1;padding:10px 12px;background:transparent;border:none;color:white;font-size:12px;font-family:inherit;outline:none; }
    .news-row input::placeholder { color:rgba(255,255,255,.2); }
    .news-row button { padding:10px 16px;background:#F4A7A7;color:white;border:none;font-size:10px;font-weight:700;cursor:pointer;transition:background .15s;white-space:nowrap;letter-spacing:.5px; }
    .news-row button:hover { background:#E89A9A; }

    .f-links { display:none; }
    @media(min-width:1024px){ .f-links{display:flex;flex-direction:row;gap:0;padding:0} .f-links-mob{display:none} }

    .f-col { display:none; }
    @media(min-width:1024px){ .f-col{display:flex;flex-direction:column;gap:6px;flex:1} .f-col h4{font-size:12px;font-weight:600;color:white;margin-bottom:8px} .f-col a{font-size:11px;color:rgba(255,255,255,.35);text-decoration:none;padding:1px 0;transition:color .15s;line-height:1.6} .f-col a:hover{color:#F4A7A7} }

    .f-links-mob { display:flex;flex-direction:column;padding:0 4px; }
    @media(min-width:1024px){ .f-links-mob{display:none} }
    .f-acc { border-bottom:1px solid rgba(255,255,255,.06); }
    .f-acc summary { display:flex;align-items:center;justify-content:space-between;padding:12px;cursor:pointer;font-size:12px;font-weight:600;color:rgba(255,255,255,.8);list-style:none; }
    .f-acc summary::-webkit-details-marker { display:none; }
    .acc-icon { width:16px;height:16px;color:rgba(255,255,255,.25);flex-shrink:0;transition:transform .2s; }
    .f-acc[open] .acc-icon { transform:rotate(45deg); }
    .acc-body { display:flex;flex-direction:column;padding:0 12px 10px;gap:2px; }
    .acc-body a { font-size:11px;color:rgba(255,255,255,.35);padding:4px 0;transition:color .15s;text-decoration:none; }
    .acc-body a:hover { color:#F4A7A7; }

    .f-copy { text-align:center;padding:14px 12px;font-size:10px;color:rgba(255,255,255,.2);border-top:1px solid rgba(255,255,255,.06); }
  `],
})
export class FooterComponent {}
