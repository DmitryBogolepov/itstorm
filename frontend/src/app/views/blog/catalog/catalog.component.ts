import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlesType} from "../../../../types/articles.type";
import {DefaultResponseType} from "../../../../types/default-response.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  sortingOpen = false;
  articles:ArticlesType | null = null;
  pages: number[] = [];
  constructor(private articleService:ArticleService) { }
  // activeParams: ActiveParamsType = {types: []};
  ngOnInit(): void {
    this.articleService.getAllArticles()
      .subscribe((data:ArticlesType | DefaultResponseType) => {
        if ((data as DefaultResponseType).error !== undefined) {
          throw new Error((data as DefaultResponseType).message)
        }
        this.articles = data as ArticlesType;
        for(let i = 1; i <= this.articles.pages; i++) {
          this.pages.push(i);
        }
      })
  }

  // openNextPage() {
  //   if (!this.activeParams.page) {
  //     this.activeParams.page = 2;
  //     this.router.navigate(['/catalog'], {
  //       queryParams: this.activeParams
  //     });
  //   } else if (this.activeParams.page && this.activeParams.page < this.pages.length) {
  //     this.activeParams.page++;
  //     this.router.navigate(['/catalog'], {
  //       queryParams: this.activeParams
  //     });
  //   }
  // }
  // openPage(page: number) {
  //     this.activeParams.page = page;
  //     this.router.navigate(['/catalog'], {
  //       queryParams: this.activeParams
  //     })
  //   }
  // openPrevPage() {
  //   if (this.activeParams.page && this.activeParams.page > 1) {
  //     this.activeParams.page--;
  //     this.router.navigate(['/catalog'], {
  //       queryParams: this.activeParams
  //     });
  //   }
  // }
  toggleSorting() {
    this.sortingOpen = !this.sortingOpen;
  }
}
