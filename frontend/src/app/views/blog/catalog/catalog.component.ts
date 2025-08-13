import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlesType} from "../../../../types/articles.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {Router} from "@angular/router";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";

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
  currentPage = 1;
  totalPages = 1;
  constructor(private articleService:ArticleService ,private router:Router,private categoryService:CategoryService) { }
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
      });
    this.categoryService.getCategories().subscribe((data:CategoryType[]) => {
      this.categories = data;
    })

  }

  openNextPage() {
    if ( this.articles && !this.articles.pages) {
      this.articles.pages = 2;
      this.router.navigate(['/blog'], {
        queryParams: this.articles
      });
    } else if (this.articles && this.articles.pages && this.articles.pages < this.pages.length) {
      this.articles.pages++;
      this.router.navigate(['/blog'], {
        queryParams: this.articles
      });
    }
  }
  openPage(page: number) {
    if (this.articles && this.articles.pages) {
      this.articles.pages = page;
      this.router.navigate(['/blog'], {
        queryParams: this.articles
      })
    }
    }
  openPrevPage() {
    if (this.articles && this.articles.pages && this.articles.pages > 1) {
      this.articles.pages--;
      this.router.navigate(['/blog'], {
        queryParams: this.articles
      });
    }
  }
  toggleSorting() {
    return this.sortingOpen = !this.sortingOpen;
  }
}
