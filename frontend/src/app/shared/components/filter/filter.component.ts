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
  }

  updateFilter(url: string) {
    this.isActive = !this.isActive;

    const queryParams = { ...this.activatedRoute.snapshot.queryParams };
    let categories: string[] = [];

    if (queryParams['categories']) {
      categories = queryParams['categories'].split(',');
    }

    if (this.isActive) {
      if (!categories.includes(url)) {
        categories.push(url);
      }
    } else {
      categories = categories.filter(item => item !== url);
    }

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        ...queryParams,
        categories: categories.length ? categories.join(',') : null
      },
      queryParamsHandling: 'merge'
    });
  }
}
