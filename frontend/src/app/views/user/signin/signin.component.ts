import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {LoginResponseType} from "../../../../types/login-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private _snackBar: MatSnackBar,private router:Router) { }

  signUpForm = this.fb.group({
    name:['',[Validators.required,Validators.pattern(/^([А-ЯЁ][а-яё]+)(\s[А-ЯЁ][а-яё]+)*$/)]],
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    acceptPolitics:[false,[Validators.requiredTrue]]
  })

  ngOnInit(): void {
  }

  signup():void {
    if (this.signUpForm.valid && this.signUpForm.value.email && this.signUpForm.value.name && this.signUpForm.value.password && this.signUpForm.value.acceptPolitics) {
      this.authService.signup(this.signUpForm.value.name, this.signUpForm.value.email, this.signUpForm.value.password)
        .subscribe({
          next: (data: DefaultResponseType | LoginResponseType):void => {
            let error = null;
            if ((data as DefaultResponseType).error !== undefined) {
              error = (data as DefaultResponseType).message
            }
            const loginResponse:LoginResponseType = data as LoginResponseType;
            if (!loginResponse.accessToken || !loginResponse.refreshToken || !loginResponse.userId) {
              error = 'Ошибка регистрации';
            }
            if (error) {
              this._snackBar.open(error);
              throw new Error(error);
            }
            this.authService.setTokens(loginResponse.accessToken, loginResponse.refreshToken);
            this.authService.userId = loginResponse.userId;
            this._snackBar.open('Вы успешно зарегистрировались');
            this.router.navigate(['/']);
          },
          error: (errorResponse: HttpErrorResponse):void => {
            if (errorResponse.error && errorResponse.error.message) {
              this._snackBar.open(errorResponse.error.message);
            } else {
              this._snackBar.open('Ошибка регистрации');
            }
          }
        })
    }
  }
}
