import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="card"><h1>Welcome Back</h1><p class="sub">Sign in to continue</p>
      <form (ngSubmit)="onSubmit()" class="form">
        <div class="fg"><label>Email</label><input type="email" [(ngModel)]="email" name="email" required placeholder="Enter your email" /></div>
        <div class="fg"><label>Password</label><input type="password" [(ngModel)]="password" name="password" required placeholder="Enter your password" /></div>
        <button type="submit" class="btn" [disabled]="loading">{{ loading ? 'Signing in...' : 'Sign In' }}</button>
        <p class="err" *ngIf="error">{{ error }}</p>
      </form>
      <p class="foot">Don't have an account? <a routerLink="/register">Sign Up</a></p>
    </div>
  `,
  styles: [`.card{background:white;border-radius:20px;padding:32px 24px;box-shadow:0 4px 24px rgba(0,0,0,.04);border:1px solid #F0EBE6}h1{font-family:Playfair Display,Georgia,serif;font-size:22px;font-weight:700;text-align:center;margin-bottom:2px;color:#0A0A0A}.sub{text-align:center;font-size:13px;color:#A69F99;margin-bottom:24px}.form{display:flex;flex-direction:column;gap:16px}.fg{display:flex;flex-direction:column;gap:4px}.fg label{font-size:12px;font-weight:600;color:#1A1A1A}.fg input{padding:12px 14px;border:1px solid #E5DDD6;border-radius:10px;font-size:14px;transition:border-color .2s;font-family:inherit;color:#0A0A0A}.fg input:focus{border-color:#0A0A0A;outline:none}.btn{width:100%;padding:14px;background:#0A0A0A;color:white;border:none;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:all .2s;font-family:inherit}.btn:hover:not(:disabled){background:#1A1A1A}.btn:disabled{opacity:.5;cursor:not-allowed}.err{color:#FF6B6B;font-size:13px;text-align:center}.foot{text-align:center;margin-top:18px;font-size:13px;color:#A69F99}.foot a{color:#F4A7A7;font-weight:600}`],
})
export class LoginComponent {
  email='';password='';loading=false;error='';
  constructor(private authService:AuthService,private router:Router){}
  onSubmit(){if(!this.email||!this.password)return;this.loading=true;this.error='';this.authService.login({email:this.email,password:this.password}).subscribe({next:()=>this.router.navigate(['/']),error:(err)=>{this.error=err.error?.message||'Login failed';this.loading=false}});}
}
