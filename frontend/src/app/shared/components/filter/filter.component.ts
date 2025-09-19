
import { Component, Input } from '@angular/core';
import { CategoryType } from "../../../../types/category.type";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  @Input() category!: CategoryType;
  @Input() activeCategories: string[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  get isActive(): boolean {
    return this.activeCategories.includes(this.category.url);
  }

  updateFilter(url: string) {
    // Берём актуальные категории из родителя
    let categories = [...this.activeCategories];

    if (categories.includes(url)) {
      categories = categories.filter((item: string) => item !== url);
    } else {
      categories.push(url);
    }

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
