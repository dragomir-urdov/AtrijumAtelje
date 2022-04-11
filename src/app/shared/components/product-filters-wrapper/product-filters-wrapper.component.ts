import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-product-filters-wrapper',
  templateUrl: './product-filters-wrapper.component.html',
})
export class ProductFiltersWrapperComponent {
  constructor(private readonly store: Store) {}
}
