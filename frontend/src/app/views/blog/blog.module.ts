import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import {SharedModule} from "../../shared/shared.module";
import { BlogPageComponent } from './blog-page/blog-page.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    CatalogComponent,
    BlogPageComponent
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class BlogModule { }
