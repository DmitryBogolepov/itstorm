import {Component, Input, OnInit} from '@angular/core';
import {CategoryType} from "../../../../types/category.type";
import {ActivatedRoute, Router} from "@angular/router";
import {ActiveParamsType} from "../../../../types/activeParams.type";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() category!:CategoryType;
  isActive:boolean =false;
  activeParams:ActiveParamsType ={categories:[]}
  constructor(private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.activeParams.categories = params['categories']
        ? params['categories'].split(',')
        : [];

      this.activeParams.page = params['page']
        ? +params['page']
        : 1;

      this.isActive = this.activeParams.categories.includes(this.category.url);
    });
  }

  updateFilter(url: string) {
    this.isActive = !this.isActive;

    let categories = [...this.activeParams.categories];

    if (this.isActive) {
      if (!categories.includes(url)) {
        categories.push(url);
      }
    } else {
      categories = categories.filter(item => item !== url);
    }
    this.activeParams.categories = categories;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        categories: categories.length ? categories.join(',') : null,
        page: 1
      },
      queryParamsHandling: 'merge'
    });
  }
}
