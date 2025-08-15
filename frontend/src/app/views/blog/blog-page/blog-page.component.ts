import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UserType} from "../../../../types/user.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ArticleService} from "../../../shared/services/article.service";
import {Article, ArticleType} from "../../../../types/articles.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  constructor(private fb:FormBuilder,private authService:AuthService,private activatedRoute:ActivatedRoute,private articlesService:ArticleService,private sanitizer: DomSanitizer) { }
  isLogged = false;
  commentForm = this.fb.group({
    text:[''],
    article:['']
  })
  safeText!: SafeHtml;
  article:ArticleType | null= null;
  relatedArticles:Article[] | null = null;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {

      this.articlesService.getArticle(params['url']).subscribe((data:ArticleType) => {
        this.article = data;
        if (this.article?.text) {
          this.safeText = this.sanitizer.bypassSecurityTrustHtml(this.article.text);
        }
      });
      this.articlesService.getRelatedArticles(params['url']).subscribe((data:Article[]) => {
        this.relatedArticles = data;
      })
    })



    this.authService.isLogged$.subscribe((isLogged: boolean) => {
      this.isLogged = isLogged;
    });

    if (this.isLogged) {
      this.authService.getUserData().subscribe({
        next: (data: UserType | DefaultResponseType) => {
          if ('error' in data) {
            const error = data.message;
            throw new Error(error);
          }
        }
      })
    }
  }



  sendComment() {

  }
}
