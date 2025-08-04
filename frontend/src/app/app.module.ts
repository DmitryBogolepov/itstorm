import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import { MainComponent } from './views/main/main.component';
import { PoliticComponent } from './views/politic/politic.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CarouselModule} from "ngx-owl-carousel-o";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PoliticComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CarouselModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
