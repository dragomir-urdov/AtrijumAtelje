import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';

import { Store } from '@ngrx/store';
import * as CoreSelectors from '@app/core/+state/core.selectors';
import * as AuthSelectors from '@app/auth/+state/auth.selectors';
import * as RouterSelectors from '@app/core/+state/router.selectors';

// Services
import { CommonService, ModalService } from '@shared/services';
import { ProductService } from '@product/services';

// Components
import { ProductCreateComponent } from '@product/components';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-collection-item',
  templateUrl: './collection-item.component.html',
})
export class CollectionItemComponent {
  imageEndpoint = `${this.commonService.config.apiEndpoint}gallery/collections/`;

  isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);

  collection$ = this.store.select(CoreSelectors.selectCollectionsById(+this.route.snapshot.paramMap.get('id')!));
  productRes$ = this.store
    .select(RouterSelectors.selectRouteParam('id'))
    .pipe(switchMap((id) => this.productService.getProducts({ collectionId: +id! })));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly commonService: CommonService,
    private readonly productService: ProductService,
    private readonly dialog: MatDialog
  ) {}

  openModal() {
    this.dialog.open(ProductCreateComponent, {
      panelClass: 'my-custom-class',
      maxHeight: '95vh',
    });
  }
}
