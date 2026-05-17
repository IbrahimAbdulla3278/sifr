import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-content" style="max-width: 600px; margin: 0 auto; padding: 24px 16px;">
      <div class="page-header">
        <button class="back-button" routerLink="/">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <h1>About Us</h1>
      </div>

      <div class="about-card">
        <div class="about-logo">
          <span class="logo-icon">&#9733;</span>
          <span class="logo-text">ShopHub</span>
        </div>
        <p class="about-description">
          ShopHub is your premium destination for fashion, electronics, and lifestyle products. 
          We curate the best products from around the world to bring you an exceptional shopping experience.
        </p>
        <div class="about-features">
          <div class="feature">
            <span class="material-icons-round">verified</span>
            <h3>Quality Products</h3>
            <p>Curated selection of premium products</p>
          </div>
          <div class="feature">
            <span class="material-icons-round">local_shipping</span>
            <h3>Fast Delivery</h3>
            <p>Free shipping on orders over $50</p>
          </div>
          <div class="feature">
            <span class="material-icons-round">support_agent</span>
            <h3>24/7 Support</h3>
            <p>Dedicated customer support team</p>
          </div>
        </div>
      </div>

      <style>
        .about-card {
          background: white;
          border-radius: 16px;
          padding: 32px 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          text-align: center;
        }
        .about-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-bottom: 16px;
        }
        .logo-icon { font-size: 32px; }
        .logo-text {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .about-description {
          color: #747d8c;
          line-height: 1.6;
          margin-bottom: 32px;
        }
        .about-features {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .feature {
          padding: 16px;
          background: #f8f9fa;
          border-radius: 12px;
        }
        .feature .material-icons-round {
          font-size: 32px;
          color: #667eea;
          margin-bottom: 8px;
        }
        .feature h3 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }
        .feature p {
          font-size: 13px;
          color: #747d8c;
        }
      </style>
    </div>
  `,
})
export class AboutComponent {}
