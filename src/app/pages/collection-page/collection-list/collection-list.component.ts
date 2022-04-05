import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Collection } from '@shared/models';

import { Store } from '@ngrx/store';
import * as AuthSelectors from '@auth/state/auth.selectors';
import * as CoreSelectors from '@core/state/core.selectors';

import { CommonService, ModalService } from '@shared/services';

import { CollectionCreateComponent } from '../collection-create/collection-create.component';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
})
export class CollectionListComponent {
  imageEndpoint = `${this.commonService.config.apiEndpoint}collections/`;

  isAuthenticated$ = this.store.select(AuthSelectors.isAuthenticated);

  collections$ = this.store.select(CoreSelectors.selectCollections);

  constructor(
    private readonly store: Store,
    private readonly route: ActivatedRoute,
    private readonly commonService: CommonService,
    private readonly modalService: ModalService
  ) {}

  openModal() {
    this.modalService.open(CollectionCreateComponent, null, { hasBackdrop: true });
  }
}
