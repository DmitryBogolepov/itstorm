import {Component, Input, OnInit, Output,EventEmitter} from '@angular/core';
import {CommentsType, CommentType} from "../../../../types/comments.type";
import {ReactionsService} from "../../services/reactions.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {CommentAction} from "../../../../types/commentAction";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentType;
  @Input() userAction?: CommentAction;

  comments: CommentsType = {allCount:0,comments:[]};
  constructor(private reactionsService: ReactionsService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

  }
  @Output() actionChanged: EventEmitter<void> = new EventEmitter<void>();
  like() {
    this.reactionsService.like(this.comment.id).subscribe({
      next: (data: DefaultResponseType) => {
        if (!data.error) {
          this._snackBar.open('Ваш голос учтен');
          this.actionChanged.emit();
        }
      },
      error: (err) => {
        this._snackBar.open('Необходимо войти в аккаунт')
      }
    });
  }

  dislike() {
    this.reactionsService.dislike(this.comment.id).subscribe({
      next: (data: DefaultResponseType) => {
        if (!data.error) {
          this._snackBar.open('Ваш голос учтен');
          this.actionChanged.emit();
        }
      },
      error: (err) => {
        this._snackBar.open('Необходимо войти в аккаунт')
      }
    });
  }

  violate() {
    this.reactionsService.violate(this.comment.id).subscribe({
      next: (data: DefaultResponseType) => {
        if (!data.error) {
          this._snackBar.open('Жалоба отправлена')
        }

      },
      error: (err) => {
        if (err.error?.message === 'Это действие уже применено к комментарию') {
          this._snackBar.open('Жалоба уже отправлена');
        } else {
          this._snackBar.open('Необходимо войти в аккаунт');
        }
      }
    });
  }


}
