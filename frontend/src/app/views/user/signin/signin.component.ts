import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  signUpForm = this.fb.group({
    name:['',[Validators.required,Validators.pattern('^(?:[А-ЯЁ][а-яё]*\\s?)+$')]],
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*\\d).{8,}$')]],
    acceptPolitics:[false,[Validators.required]]
  })

  ngOnInit(): void {
  }



  signup() {

  }
}
