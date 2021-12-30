import { Component, Input } from '@angular/core';

import { FavoriteCollection } from '@shared/models';

@Component({
  selector: 'app-favorite-collections',
  templateUrl: './favorite-collections.component.html',
})
export class FavoriteCollectionsComponent {
  @Input() collections!: FavoriteCollection[];

  constructor() {}
}
