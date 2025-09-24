import {Component, Input, OnInit} from '@angular/core';
import {ArticlePopularType} from "../../../../types/article-popular.type";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  @Input() article!:ArticlePopularType;
  constructor() { }
  serverStaticPath:string = environment.serverStaticPath;

  ngOnInit(): void {}
}
