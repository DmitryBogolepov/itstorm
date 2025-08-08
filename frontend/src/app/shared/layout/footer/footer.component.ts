import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {RequestService} from "../../services/request.service";
import {RequestType} from "../../../../types/request.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private fb:FormBuilder,private _snackBar: MatSnackBar,private requestService:RequestService) { }
  showSuccess = false;
  isShowed = false;

  footerOrderForm = this.fb.group({
    name:['',[Validators.required]],
    phone:['',[Validators.required]]
  })

  ngOnInit(): void {
  }

  modalShow() {
    this.isShowed = !this.isShowed;
  }

  submitOrder() {
    if (this.footerOrderForm.valid && this.footerOrderForm.value.name && this.footerOrderForm.value.phone) {
      const requestObject:RequestType = {
        name: this.footerOrderForm.value.name,
        phone:this.footerOrderForm.value.phone,
        type:'consultation',
      }
      this.requestService.sendRequest(requestObject)
        .subscribe({
          next:(data:DefaultResponseType) => {
            if (!data.error) {
              this.showSuccess = true;
            }
          },
          error:(err) => {
            this._snackBar.open('Произошла ошибка при отправке запроса')
          }
        })
      this.showSuccess =  !this.showSuccess;
    }
  }
}
