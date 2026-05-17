import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `<div class="al"><div class="ab"><div class="abrand">SIFR</div><router-outlet></router-outlet></div></div>`,
  styles: [`.al { min-height:100vh;display:flex;align-items:center;justify-content:center;background:#F5F0EB;padding:16px; } .ab { width:100%;max-width:400px; } .abrand { font-size:24px;font-weight:700;letter-spacing:2px;color:#0A0A0A;text-align:center;margin-bottom:24px;font-family:Playfair Display,Georgia,serif; }`],
})
export class AuthLayoutComponent {}
