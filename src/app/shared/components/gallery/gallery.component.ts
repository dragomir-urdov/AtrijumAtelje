import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as CoreActions from '@core/state/core.actions';
import * as CoreSelectors from '@core/state/core.selectors';

// Services
import { CommonService } from '@shared/services';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  gallery$ = this.store.select(CoreSelectors.selectGallery);

  imageUrl = `${this.commonService.config.apiEndpoint}gallery/`;
  selected?: string;

  constructor(private readonly store: Store, private readonly commonService: CommonService) {}

  ngOnInit(): void {
    this.store.dispatch(CoreActions.getGallery());
  }

  selectImage(album: string, image: string) {
    this.selected = `${album}.${image}`;
  }
}
