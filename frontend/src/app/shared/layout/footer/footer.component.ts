import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private fb:FormBuilder) { }
  showSuccess = false;
  isShowed = false;

  footerOrderForm = this.fb.group({
    name:['',[Validators.required]],
    number:['',[Validators.required]]
  })

  ngOnInit(): void {
  }

  modalShow() {
    this.isShowed = !this.isShowed;
  }

  submitOrder() {
    this.showSuccess =  !this.showSuccess;
  }
}
