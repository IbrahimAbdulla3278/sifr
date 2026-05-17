import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="page-content" style="max-width: 600px; margin: 0 auto; padding: 24px 16px;">
      <div class="page-header">
        <button class="back-button" routerLink="/">
          <span class="material-icons-round">arrow_back</span>
        </button>
        <h1>Contact Us</h1>
      </div>

      <div class="contact-card">
        <div class="contact-item">
          <span class="material-icons-round">email</span>
          <div>
            <h3>Email</h3>
            <p>support&#64;shophub.com</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="material-icons-round">phone</span>
          <div>
            <h3>Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
        </div>
        <div class="contact-item">
          <span class="material-icons-round">location_on</span>
          <div>
            <h3>Address</h3>
            <p>123 Commerce St, Suite 100<br/>New York, NY 10001</p>
          </div>
        </div>
      </div>

      <style>
        .contact-card {
          background: white;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }
        .contact-item {
          display: flex;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid #e9ecef;
        }
        .contact-item:last-child { border-bottom: none; }
        .contact-item .material-icons-round {
          font-size: 28px;
          color: #667eea;
        }
        .contact-item h3 {
          font-size: 15px;
          font-weight: 600;
          color: #2f3542;
          margin-bottom: 2px;
        }
        .contact-item p {
          font-size: 14px;
          color: #747d8c;
        }
      </style>
    </div>
  `,
})
export class ContactComponent {}
