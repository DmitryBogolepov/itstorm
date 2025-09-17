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
import {HttpClientModule} from "@angular/common/http";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatMenuModule} from '@angular/material/menu';
import {TextLengthPipe} from "./pipes/textLength.pipe";
import { FilterComponent } from './components/filter/filter.component';



@NgModule({
  declarations: [
    LayoutComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent,
    ArticleComponent,
    CommentComponent,
    TextLengthPipe,
    FilterComponent
  ],
    exports: [
        LoaderComponent,
        ArticleComponent,
        CommentComponent,
        FilterComponent
    ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ]
})
export class SharedModule { }
