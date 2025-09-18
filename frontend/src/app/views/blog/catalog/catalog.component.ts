import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlesType} from "../../../../types/articles.type";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";
import {ActiveParamsType} from "../../../../types/activeParams.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  sortingOpen = false;
  articles:ArticlesType | null = null;
  pages: number[] = [];
  categories:CategoryType[] = [];
  activeParams:ActiveParamsType = {categories:[]}

  constructor(private activatedRoute:ActivatedRoute,private articleService:ArticleService ,private router:Router,private categoryService:CategoryService) { }
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.activeParams.categories = params['categories']
        ? params['categories'].split(',')
        : [];
      this.activeParams.page = params['page'] ? +params['page'] : 1;

      this.loadArticles();
    });
    this.categoryService.getCategories().subscribe((data:CategoryType[]) => {
      this.categories = data;
    })
  }

  private loadArticles() {
    this.articleService.getArticles(this.activeParams).subscribe((data: ArticlesType) => {
      this.articles = data;
      this.updatePages();
    });
  }

  private updatePages() {
    this.pages = [];
    if (this.articles && this.articles.pages) {
      for (let i = 1; i <= this.articles.pages; i++) {
        this.pages.push(i);
      }
    }
  }

  openPage(page: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        page
      },
      queryParamsHandling: 'merge'
    });
  }

  openNextPage() {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.openPage(this.activeParams.page + 1);
    }
  }

  openPrevPage() {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.openPage(this.activeParams.page - 1);
    }
  }

  toggleSorting() {
    return this.sortingOpen = !this.sortingOpen;
  }
}
