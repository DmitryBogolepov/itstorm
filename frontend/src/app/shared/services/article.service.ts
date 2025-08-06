import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ArticlePopularType} from "../../../types/article-popular.type";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http:HttpClient) {

  }

  getPopularArticle() : Observable<ArticlePopularType[]> {
    return this.http.get<ArticlePopularType[]>(environment.api + 'articles/top')
  }
}
