import { ChangeDetectionStrategy, Component } from '@angular/core';
import { KeyValue } from '@angular/common';

import { Store } from '@ngrx/store';
import * as CoreSelectors from '@app/core/+state/core.selectors';
import * as CoreActions from '@app/core/+state/core.actions';
import * as AuthSelectors from '@auth/+state/auth.selectors';

// Models
import { Variant, VariantRes, VariantType } from '@shared/models';

import * as AppGlobals from '@app/app.globals';
import { MatDialog } from '@angular/material/dialog';
import { CreateVariantComponent } from '../create-variant/create-variant.component';

@Component({
  selector: 'app-product-filters-wrapper',
  templateUrl: './product-filters-wrapper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFiltersWrapperComponent {
  orders = AppGlobals.PRODUCT_ORDER_BY;

  variants$ = this.store.select(CoreSelectors.selectVariants);
  isAuthenticate$ = this.store.select(AuthSelectors.selectIsAuthenticated);

  constructor(private readonly store: Store, private readonly dialog: MatDialog) {}

  trackByKey(index: number, item: KeyValue<VariantType, Variant[]>) {
    return item.key;
  }

  trackById(index: number, item: Variant) {
    return item.id;
  }

  toggleVariant(variantType: VariantType, variantId: number) {
    this.store.dispatch(CoreActions.toggleVariant({ variantType, variantId }));
  }

  createVariant(variantType: string) {
    this.dialog.open(CreateVariantComponent, {
      data: {
        variantType: variantType,
      },
    });
  }
}
