import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentsType} from "../../../types/comments.type";
import {environment} from "../../../environments/environment";
import {DefaultResponseType} from "../../../types/default-response.type";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient) { }


  getComments(id:string,offset:number):Observable<CommentsType> {
    return this.http.get<CommentsType>(environment.api + 'comments', {
      params: {
        offset:offset,
        article:id
      }
    })
  }

  sendComment(text:string,article:string):Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + 'comments', {
      text:text,
      article:article
    })
  }
}
