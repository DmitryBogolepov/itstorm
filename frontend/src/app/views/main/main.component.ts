import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ArticleService} from "../../shared/services/article.service";
import {ArticlePopularType} from "../../../types/article-popular.type";
import {RequestService} from "../../shared/services/request.service";
import {RequestType} from "../../../types/request.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  articles:ArticlePopularType[] = [];
  constructor(private fb:FormBuilder,private _snackBar: MatSnackBar ,private articleService:ArticleService,private requestService:RequestService) { }
  showSuccess:boolean = false;
  isShowed:boolean = false;
  isOpen:boolean = false;
  reviews = [
    {
      name: 'Станислав',
      photo: 'assets/images/main-page/user1.jpg',
      text: 'Спасибо огромное АйтиШторму за прекрасный блог с полезными статьями! Именно они и побудили меня углубиться в тему SMM и начать свою карьеру.'
    },
    {
      name: 'Алёна',
      photo: 'assets/images/main-page/user2.jpg',
      text: 'Обратилась в АйтиШторм за помощью копирайтера. Ни разу ещё не пожалела! Ребята действительно вкладывают душу в то, что делают, и каждый текст, который я получаю, с нетерпением хочется выложить в сеть.'
    },
    {
      name: 'Мария',
      photo: 'assets/images/main-page/user3.jpg',
      text: 'Команда АйтиШторма за такой короткий промежуток времени сделала невозможное: от простой фирмы по услуге продвижения выросла в мощный блог о важности личного бренда. Класс!'
    }
  ];
  bannerCarouselOptions = {
    items: 1,
    loop: true,
    nav: false,
    dots: false,
    autoplay: false,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    navText: ['', ''],
  };

  carouselOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    margin: 12.5,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 2.5 }
    },
    nav: false,
  };
  modalOrderForm = this.fb.group({
    service:['',[Validators.required]],
    name:['',[Validators.required]],
    phone:['',[Validators.required]]
  })
  ngOnInit(): void {
    this.articleService.getPopularArticle().subscribe((data:ArticlePopularType[]) => {
      this.articles = data;
    });
  }
  modalShow():void {
    this.isShowed = !this.isShowed;
  }
  modalShowWithService(service:string):void {
    this.isShowed = !this.isShowed;
    this.modalOrderForm.get('service')?.setValue(service)
  }

  submitOrder():void {
    if (this.modalOrderForm.valid && this.modalOrderForm.value.service && this.modalOrderForm.value.name && this.modalOrderForm.value.phone) {
      const requestObject:RequestType = {
        name: this.modalOrderForm.value.name,
        phone:this.modalOrderForm.value.phone,
        type:'order',
        service:this.modalOrderForm.value.service
      }
      this.requestService.sendRequest(requestObject)
        .subscribe( {
          next:(data:DefaultResponseType):void => {
            if (!data.error) {
              this.showSuccess = true;
            }
          },
          error: (err):void => {
            this._snackBar.open('Произошла ошибка при отправке запроса');
          }
        })

    }
  }
  toggleDropdown():void {
    this.isOpen = !this.isOpen;
  }
  selectOption(value: string, event: Event):void {
    event.stopPropagation();
    this.modalOrderForm.get('service')?.setValue(value);
    this.isOpen = false;
  }
}
