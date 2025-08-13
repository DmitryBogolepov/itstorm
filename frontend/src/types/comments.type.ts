export interface CommentsType {
  allCount:number,
  comments:CommentType[]
}

export interface CommentType {
  id:string,
  text:string,
  date:string,
  likesCount:number,
  dislikesCount:number,
  user: {
    id:string,
    name:string
  }
}
