import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  constructor(private fb:FormBuilder) { }

  commentForm = this.fb.group({
    text:[''],
    article:['']
  })
  ngOnInit(): void {
  }

}
