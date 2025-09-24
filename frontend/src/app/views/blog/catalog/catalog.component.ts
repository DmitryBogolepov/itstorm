import { Component, OnInit } from '@angular/core';
import {ArticleService} from "../../../shared/services/article.service";
import {ArticlesType} from "../../../../types/articles.type";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../../shared/services/category.service";
import {CategoryType} from "../../../../types/category.type";
import {ActiveParamsType} from "../../../../types/activeParams.type";
import {AppliedFilterType} from "../../../../types/applied-filter.type";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  sortingOpen:boolean = false;
  articles:ArticlesType | null = null;
  pages: number[] = [];
  categories:CategoryType[] = [];
  activeParams:ActiveParamsType = {categories:[]}
  appliedFilters: AppliedFilterType[] = [];
  constructor(private activatedRoute:ActivatedRoute,private articleService:ArticleService ,private router:Router,private categoryService:CategoryService) { }
  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data:CategoryType[]):void => {
      this.categories = data;
      this.activatedRoute.queryParams.subscribe(params => {
        this.updateActiveParams(params);
        this.loadArticles();
      });
    });
  }
  private updateActiveParams(params: any):void {
    this.activeParams.categories = params['categories']
      ? params['categories'].split(',')
      : [];
    this.activeParams.page = params['page'] ? +params['page'] : 1;
    this.appliedFilters = this.activeParams.categories
      .map(url => this.categories.find(type => type.url === url))
      .filter((foundType): foundType is CategoryType => !!foundType)
      .map(foundType => ({
        name: foundType.name,
        url: foundType.url
      }));
  }

  private loadArticles():void {
    this.articleService.getArticles(this.activeParams).subscribe((data: ArticlesType):void => {
      this.articles = data;
      this.updatePages();
    });
  }

  removeFilter(filter:AppliedFilterType):void {
    this.activeParams.categories = this.activeParams.categories.filter((item:string) => item !== filter.url);

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { ...this.activeParams }
    }).then(():void => {
      this.appliedFilters = this.activeParams.categories
        .map(url => this.categories.find((type:CategoryType) => type.url === url))
        .filter((foundType): foundType is CategoryType => !!foundType)
        .map(foundType => ({
          name: foundType.name,
          url: foundType.url
        }));
      this.loadArticles();
    });
  }

  private updatePages():void {
    this.pages = [];
    if (this.articles && this.articles.pages) {
      for (let i = 1; i <= this.articles.pages; i++) {
        this.pages.push(i);
      }
    }
  }

  openPage(page: number):void {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        page
      },
      queryParamsHandling: 'merge'
    });
  }

  openNextPage():void {
    if (this.activeParams.page && this.activeParams.page < this.pages.length) {
      this.openPage(this.activeParams.page + 1);
    }
  }

  openPrevPage():void {
    if (this.activeParams.page && this.activeParams.page > 1) {
      this.openPage(this.activeParams.page - 1);
    }
  }

  toggleSorting():boolean {
    return this.sortingOpen = !this.sortingOpen;
  }
}
