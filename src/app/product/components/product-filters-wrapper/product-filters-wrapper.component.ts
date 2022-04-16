import { Component } from '@angular/core';
import { KeyValue } from '@angular/common';

import { Store } from '@ngrx/store';
import * as CoreSelectors from '@app/core/+state/core.selectors';
import * as CoreActions from '@app/core/+state/core.actions';

// Models
import { Variant, VariantType } from '@shared/models';

import * as AppGlobals from '@app/app.globals';

@Component({
  selector: 'app-product-filters-wrapper',
  templateUrl: './product-filters-wrapper.component.html',
})
export class ProductFiltersWrapperComponent {
  orders = AppGlobals.PRODUCT_ORDER_BY;

  variants$ = this.store.select(CoreSelectors.selectVariants);

  constructor(private readonly store: Store) {}

  trackByKey(index: number, item: KeyValue<VariantType, Variant[]>) {
    return item.key;
  }

  trackById(index: number, item: Variant) {
    return item.id;
  }

  toggleVariant(variantType: VariantType, variantId: number) {
    this.store.dispatch(CoreActions.toggleVariant({ variantType, variantId }));
  }
}
