export interface CommentAction {
  comment: string;
  action:  'like' | 'dislike' | string;
}
