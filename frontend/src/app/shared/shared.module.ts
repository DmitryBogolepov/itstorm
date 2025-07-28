import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LoaderComponent } from './components/loader/loader.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import {RouterModule, RouterOutlet} from "@angular/router";



@NgModule({
  declarations: [
    LayoutComponent,
    LoaderComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule
  ]
})
export class SharedModule { }
