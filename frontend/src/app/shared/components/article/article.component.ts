import {Component, Input, OnInit} from '@angular/core';
import {ArticlePopularType} from "../../../../types/article-popular.type";
import {environment} from "../../../../environments/environment";
import {ArticleService} from "../../services/article.service";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article!:ArticlePopularType;
  constructor(private articleService:ArticleService) { }
  serverStaticPath = environment.serverStaticPath;

  ngOnInit(): void {}

  getNewArticle(url:string) {
    this.articleService.getArticle(url).subscribe(data => {
      this.article = data;
    })
    console.log(this.article)
  }

}
