import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import * as CoreSelectors from '@core/state/core.selectors';

import { CommonService } from '@shared/services';

@Component({
  selector: 'app-collection-item',
  templateUrl: './collection-item.component.html',
})
export class CollectionItemComponent {
  imageEndpoint = `${this.commonService.config.apiEndpoint}collections/`;

  collection$ = this.store.select(CoreSelectors.selectCollectionsById(+this.route.snapshot.paramMap.get('id')!));

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly commonService: CommonService
  ) {}
}
