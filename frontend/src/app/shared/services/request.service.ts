import { Injectable } from '@angular/core';
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {RequestType} from "../../../types/request.type";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http:HttpClient) { }

  sendRequest(params:RequestType):Observable<DefaultResponseType> {
    return this.http.post<DefaultResponseType>(environment.api + "requests", params)
  }

}
