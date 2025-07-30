import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  loginForm = this.fb.group({
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required]],
    rememberMe:[false]
  })

  ngOnInit(): void {
  }

  login() {

  }
}
