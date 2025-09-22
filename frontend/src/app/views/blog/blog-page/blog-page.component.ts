import {Component, OnInit} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../../core/auth/auth.service";
import {ActivatedRoute} from "@angular/router";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {ArticleService} from "../../../shared/services/article.service";
import {Article, ArticleType} from "../../../../types/articles.type";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {CommentsService} from "../../../shared/services/comments.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CommentsType} from "../../../../types/comments.type";
import {CommentAction} from "../../../../types/commentAction";

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  isLogged = false;

  constructor(private _snackBar:MatSnackBar,private commentsService:CommentsService,private fb:FormBuilder,private authService:AuthService,private activatedRoute:ActivatedRoute,private articlesService:ArticleService,private sanitizer: DomSanitizer) { }
  articleUrl!:string;
  isLoadingMore = false;
  commentForm = this.fb.group({
    message:[''],
    article:['']
  })
  safeText!: SafeHtml;
  comments:CommentsType = {
    allCount:0,
    comments:[]
  }
  userActions: CommentAction[] = [];
  article:ArticleType | null= null;
  relatedArticles:Article[] | null = null;
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.articleUrl = params['url'];

      this.articlesService.getArticle(this.articleUrl).subscribe((data: ArticleType) => {
        this.article = data;
        this.comments.allCount = data.commentsCount;
        this.comments.comments = data.comments;

        if (this.article?.text) {
          this.safeText = this.sanitizer.bypassSecurityTrustHtml(this.article.text);
        }
        this.commentsService.getUserActions(this.article?.id).subscribe(res => {
          this.userActions = res;
        });
      });

      this.articlesService.getRelatedArticles(this.articleUrl).subscribe((data: Article[]) => {
        this.relatedArticles = data;
      });
    });

    this.isLogged = this.authService.getIsLoggedIn();
    if (this.isLogged) {
      this.authService.getUserData().subscribe();
    }
  }

  getUserAction(commentId: string): CommentAction | undefined {
    return this.userActions.find(action => action.comment === commentId);
  }
  showMore() {
    if (this.article) {
      const offset = this.comments.comments.length;
      this.commentsService.getComments(this.article.id,offset).subscribe(data => {
        this.comments.comments = [...this.comments.comments, ...data.comments];
      })
      this.isLoadingMore = false;
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
          this.commentForm.clearValidators();
        })
      }
  }

  updateUserActions(articleId: string) {
    this.commentsService.getUserActions(articleId).subscribe(res => {
      this.userActions = res;
    });
  }
}


