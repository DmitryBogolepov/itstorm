import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CatalogComponent} from "./catalog/catalog.component";
import {BlogPageComponent} from "./blog-page/blog-page.component";

const routes: Routes = [
  {path:'blog',component:CatalogComponent},
  {path:'blog-page',component:BlogPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
