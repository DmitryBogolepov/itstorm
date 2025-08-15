import {CommentType} from "./comments.type";

export interface ArticlesType {
  count:number,
  pages:number,
  items: Article[]
}

export interface Article {
  "id": string,
  "title": string,
  "description": string,
  "image": string,
  "date": string,
  "category": string,
  "url": string
}

export interface ArticleType {
  text:string
  comments:CommentType[],
  commentsCount:number,
  id:string,
  title:string,
  description:string,
  image:string,
  date:string,
  category:string,
  url:string
}
