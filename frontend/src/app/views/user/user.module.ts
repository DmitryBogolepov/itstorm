import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SigninComponent } from './signin/signin.component';
import { LoginComponent } from './login/login.component';
import {Router, RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    SigninComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UserModule { }
