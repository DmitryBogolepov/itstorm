import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UserType} from "../../../../types/user.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ArticleService} from "../../../shared/services/article.service";
import {Article, ArticleType} from "../../../../types/articles.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {CommentsService} from "../../../shared/services/comments.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentsType} from "../../../../types/comments.type";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {

  constructor(private _snackBar:MatSnackBar,private commentsService:CommentsService,private fb:FormBuilder,private authService:AuthService,private activatedRoute:ActivatedRoute,private articlesService:ArticleService,private sanitizer: DomSanitizer) { }
  isLogged = false;
  articleUrl!:string;
  commentForm = this.fb.group({
    message:[''],
    article:['']
  })
  safeText!: SafeHtml;
  comments:CommentsType = {
    allCount:0,
    comments:[]
  }
  article:ArticleType | null= null;
  relatedArticles:Article[] | null = null;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.articleUrl = params['url']
    })
    this.articlesService.getArticle(this.articleUrl ).subscribe((data:ArticleType) => {
      this.article = data;
      this.comments.allCount = data.commentsCount;
      this.comments.comments = data.comments;
      if (this.article?.text) {
        this.safeText = this.sanitizer.bypassSecurityTrustHtml(this.article.text);
      }
    });
    this.articlesService.getRelatedArticles(this.articleUrl ).subscribe((data:Article[]) => {
      this.relatedArticles = data;
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
      if (this.commentForm.valid && this.article) {
        this.commentsService.sendComment(this.commentForm.controls['message'].value!, this.article.id).subscribe((data:DefaultResponseType) => {
          if (data.error) {
            this._snackBar.open(data.message)
            throw new Error(data.message);
          } else {
            this._snackBar.open('Комментарий успешно отправлен!')
          }
          this.commentForm.clearValidators()
        })
      }
      if (this.article) {
        this.commentsService.getComments(this.article.id).subscribe(data => {
          this.comments = data;
        })
      }

  }
}
