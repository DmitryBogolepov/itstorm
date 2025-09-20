import {Component, Input, OnInit} from '@angular/core';
import {CommentType} from "../../../../types/comments.type";
import {ReactionsService} from "../../services/reactions.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment!: CommentType;

  constructor(private reactionsService: ReactionsService, private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  like() {
    this.reactionsService.like(this.comment.id).subscribe({
      next: (data: DefaultResponseType) => {
        if (!data.error) {
          this._snackBar.open('Ваш голос учтен')
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
          this._snackBar.open('Ваш голос учтен')
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
