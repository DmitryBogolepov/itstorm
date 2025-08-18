import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DefaultResponseType} from "../../../types/default-response.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ReactionsService {

  constructor(private http:HttpClient) { }


  like(id:string) {
    return this.http.post<DefaultResponseType>(environment.api +'comments/' +id +'/apply-action', {
      action:'like'
    })
  }

  dislike(id:string) {
    return this.http.post<DefaultResponseType>(environment.api +'comments/' +id +'/apply-action', {
      action:'dislike'
    })
  }

  violate(id:string) {
    return this.http.post<DefaultResponseType>(environment.api +'comments/' +id +'/apply-action', {
      action:'violate'
    })
  }
}
