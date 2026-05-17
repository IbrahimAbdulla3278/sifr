import { Component, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../../core/services/api.service';
import { CategoryTree } from '../../../shared/models/models';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="cp"><div class="ch"><button class="cb" routerLink="/"><span class="material-icons-round">arrow_back</span></button><h1>Categories</h1></div>
      <div class="bw" *ngIf="tree.length>0">
        <div class="lp"><button *ngFor="let cat of tree;let i=index" class="mc" [class.active]="ai===i" (click)="select(i)"><span class="mc-img-w"><img [src]="api.getImageUrl(cat.image)" alt="" class="mc-img" /></span><span>{{cat.name}}</span></button></div>
        <div class="rp"><div class="bc" *ngIf="bc.length"><a *ngFor="let c of bc;let last=last" (click)="c.a()" [class.cur]="last">{{c.n}}<span class="material-icons-round" *ngIf="!last">chevron_right</span></a></div>
          <div class="si" *ngIf="items.length"><button *ngFor="let item of items" class="sib" (click)="sub(item)"><span class="sib-img-w"><img [src]="api.getImageUrl(item.image)" alt="" class="sib-img" /></span><span>{{item.name}}</span><span class="material-icons-round">chevron_right</span></button></div></div></div></div>
  `,
  styles: [`
    .cp{max-width:800px;margin:0 auto;height:calc(100vh - 56px);display:flex;flex-direction:column;background:white}.ch{display:flex;align-items:center;gap:10px;padding:12px 16px;border-bottom:1px solid #F0F0F0;flex-shrink:0}.cb{width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:10px;color:#555;cursor:pointer;transition:background .15s}.cb:hover{background:#F5F5F5}.ch h1{font-size:17px;font-weight:600}.bw{display:flex;flex:1;overflow:hidden}.lp{width:90px;flex-shrink:0;overflow-y:auto;background:#FAFAFA;padding:8px 0;-ms-overflow-style:none;scrollbar-width:none}.lp::-webkit-scrollbar{display:none}.mc{display:flex;flex-direction:column;align-items:center;gap:6px;width:100%;padding:14px 6px;border:none;background:transparent;cursor:pointer;transition:all .15s;font-family:inherit}.mc-img-w{width:36px;height:36px;border-radius:50%;overflow:hidden;background:#F0F0F0;transition:box-shadow .15s;flex-shrink:0}.mc.active .mc-img-w{box-shadow:0 0 0 2px #FF6B6B}.mc-img{width:100%;height:100%;object-fit:cover;display:block}.mc span:last-child{font-size:10px;font-weight:500;color:#999;text-align:center;line-height:1.2}.mc.active span:last-child{color:#0A0A1A;font-weight:600}.rp{flex:1;overflow-y:auto;padding:14px 16px;-ms-overflow-style:none;scrollbar-width:none}.rp::-webkit-scrollbar{display:none}.bc{display:flex;align-items:center;flex-wrap:wrap;gap:4px;margin-bottom:14px;font-size:12px}.bc a{display:flex;align-items:center;gap:2px;color:#999;cursor:pointer;font-weight:500}.bc a.cur{color:#FF6B6B;font-weight:600}.bc .material-icons-round{font-size:15px}.si{display:flex;flex-direction:column;gap:6px}.sib{display:flex;align-items:center;gap:12px;width:100%;padding:10px 12px;border:none;background:white;border-radius:10px;cursor:pointer;transition:all .15s;font-family:inherit}.sib:hover{background:#FAFAFA}.sib-img-w{width:32px;height:32px;border-radius:8px;overflow:hidden;background:#F5F5F5;flex-shrink:0}.sib-img{width:100%;height:100%;object-fit:cover;display:block}.sib span:nth-child(2){flex:1;font-size:13px;font-weight:500;color:#1A1A2E;text-align:left}.sib .material-icons-round:last-child{font-size:18px;color:#DDD}@media(min-width:768px){.lp{width:120px}.mc{padding:18px 10px}.mc-img-w{width:44px;height:44px}.si{display:grid;grid-template-columns:repeat(2,1fr);gap:8px}.sib{padding:12px;border:1px solid #F5F5F5}}
  `],
})
export class CategoryListComponent implements OnInit {
  tree: CategoryTree[] = []; ai = 0; bc: { n: string; a: () => void }[] = []; items: CategoryTree[] = []; stack: CategoryTree[][] = [];
  constructor(public api: ApiService, private router: Router) {}
  ngOnInit() { this.api.getCategoryTree().subscribe(res => { this.tree = res.data; if (this.tree.length) this.select(0); }); }
  select(i: number) { this.ai = i; const m = this.tree[i]; this.bc = [{ n: m.name, a: () => this.select(i) }]; this.items = m.children || []; this.stack = []; }
  sub(item: CategoryTree) { if (!item.children?.length) { this.router.navigate(['/category', item.slug]); return; } this.stack.push([...this.items]); this.bc.push({ n: item.name, a: () => { this.bc.pop(); this.items = this.stack.pop() || []; } }); this.items = item.children; }
}
