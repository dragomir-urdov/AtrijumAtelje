import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { switchMap } from 'rxjs';

import { Store } from '@ngrx/store';
import * as CoreSelectors from '@core/state/core.selectors';
import * as AuthSelectors from '@auth/state/auth.selectors';
import * as RouterSelectors from '@core/state/router.selectors';

// Services
import { CommonService, ModalService, ProductService } from '@shared/services';

// Components
import { ProductCreateComponent } from '@shared/components';

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
    private readonly modalService: ModalService
  ) {}

  openModal() {
    this.modalService.open(ProductCreateComponent, null, { hasBackdrop: true });
  }
}
