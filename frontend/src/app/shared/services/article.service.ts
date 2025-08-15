import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticlePopularType} from "../../../types/article-popular.type";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {ArticlesType, ArticleType} from "../../../types/articles.type";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) {

  }

  getPopularArticle() : Observable<ArticlePopularType[]> {
    return this.http.get<ArticlePopularType[]>(environment.api + 'articles/top')
  }


  getAllArticles():Observable<ArticlesType> {
    return this.http.get<ArticlesType>(environment.api + 'articles')
  }
  getArticle(url:string):Observable<ArticleType> {
    return this.http.get<ArticleType>(environment.api + 'articles/' + url)
  }
}
