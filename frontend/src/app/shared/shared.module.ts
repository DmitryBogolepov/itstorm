import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { ArticleComponent } from './components/article/article.component';



@NgModule({
  declarations: [
    LayoutComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    ArticleComponent
  ],
  exports: [
    LoaderComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ]
})
export class SharedModule { }
