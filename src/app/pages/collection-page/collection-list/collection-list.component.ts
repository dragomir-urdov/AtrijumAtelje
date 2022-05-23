import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Collection } from '@shared/models';

import { Store } from '@ngrx/store';
import * as AuthSelectors from '@app/auth/+state/auth.selectors';
import * as CoreSelectors from '@app/core/+state/core.selectors';

import { CommonService, ModalService } from '@shared/services';

import { CollectionCreateComponent } from '../collection-create/collection-create.component';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-collection-list',
  templateUrl: './collection-list.component.html',
})
export class CollectionListComponent {
  imageEndpoint = `${this.commonService.config.apiEndpoint}gallery/collections/`;

  isAuthenticated$ = this.store.select(AuthSelectors.selectIsAuthenticated);
  collections$ = this.store.select(CoreSelectors.selectCollections);

  constructor(
    private readonly store: Store,
    private readonly commonService: CommonService,
    private readonly dialog: MatDialog
  ) {}

  openModal() {
    this.dialog.open(CollectionCreateComponent);
  }
}
