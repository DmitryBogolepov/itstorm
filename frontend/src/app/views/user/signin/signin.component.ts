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
    name:['',[Validators.required,Validators.pattern(/^([А-ЯЁ][а-яё]+)(\s[А-ЯЁ][а-яё]+)*$/)]],
    email:['',[Validators.email,Validators.required]],
    password:['',[Validators.required,Validators.pattern(/^(?=.*[A-Z])(?=.*\d).{8,}$/)]],
    acceptPolitics:[false,[Validators.requiredTrue]]
  })

  ngOnInit(): void {
  }



  signup() {
    if (this.signUpForm.valid && this.signUpForm.value.email && this.signUpForm.value.name && this.signUpForm.value.password && this.signUpForm.value.acceptPolitics) {

    }

  }
}
