import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import {RouterModule, RouterOutlet} from "@angular/router";
import { ArticleComponent } from './components/article/article.component';
import { CommentComponent } from './components/comment/comment.component';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    LayoutComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    CommentComponent
  ],
  exports: [
    LoaderComponent,
    ArticleComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
