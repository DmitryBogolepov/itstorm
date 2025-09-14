import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../core/auth/auth.service";
import {UserType} from "../../../../types/user.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLogged = false;
  userData: UserType | null = null;

  constructor(private authService: AuthService, private _snackBar: MatSnackBar, private router: Router,) {
    this.isLogged = this.authService.getIsLoggedIn();
  }

  ngOnInit(): void {
    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });
    if (this.isLogged) {
      this.authService.getUserData().subscribe({
        next: (data: UserType | DefaultResponseType) => {
          if ('error' in data) {
            const error = data.message;
            this._snackBar.open(error);
            throw new Error(error);
          } else {
            this.userData = data as UserType;
          }
        },
        error: (errorResponse: HttpErrorResponse) => {
          if (errorResponse.error && errorResponse.error.message) {
            // this._snackBar.open(errorResponse.error.message);
          }
        }
      })
    }
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.doLogout();
      },
      error: () => {
        this.doLogout();
      }
    });
  }

  doLogout(): void {
    this.authService.removeTokens();
    this.authService.userId = null;
    this._snackBar.open('Вы вышли из системы');
    this.router.navigate(['/'])
  }
}
