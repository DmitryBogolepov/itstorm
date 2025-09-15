import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {Router} from "@angular/router";
import {LoginResponseType} from "../../../../types/login-response.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HttpErrorResponse} from "@angular/common/http";
import {UserType} from "../../../../types/user.type";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private router:Router,private _snackBar: MatSnackBar) { }

  loginForm = this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required]],
    rememberMe:[false]
  })

  ngOnInit(): void {
  }

  login() {
    if (this.loginForm.valid && this.loginForm.value.email && this.loginForm.value.password) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password,!!this.loginForm.value.rememberMe)
        .subscribe({
          next:(data:LoginResponseType | DefaultResponseType) => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined){
              error = (data as DefaultResponseType).message
            }
            const loginResponse = data as LoginResponseType;
            if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId){
              error = 'Ошибка авторизации';
            }
            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }
            this.authService.setTokens(loginResponse.accessToken,loginResponse.refreshToken);
            this.authService.userId = loginResponse.userId;
            this.authService.getUserData().subscribe({
              next: (userData: UserType | DefaultResponseType) => {
                if (!('error' in userData)) {
                  this.authService.user$.next(userData as UserType); //
                }
              }
            });
            this._snackBar.open('Вы успешно авторизовались');
            this.router.navigate(['/']);
          },
          error: (errorResponse:HttpErrorResponse) => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка авторизации')
            }
          }
        })
    }
  }
}
