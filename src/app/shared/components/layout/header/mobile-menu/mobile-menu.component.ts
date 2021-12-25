import { Component, Inject, Input } from '@angular/core';

import { ModalRef, MODAL_DATA } from '@shared/services';
import { HeaderItem, HeaderModel } from '@shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
})
export class MobileMenuComponent {
  @Input() headerMenu!: HeaderModel;

  currentItem = -1;

  constructor(private router: Router, private modalRef: ModalRef, @Inject(MODAL_DATA) public data: HeaderModel) {}

  /**
   * It closes mobile menu.
   */
  closeMobileMenu() {
    this.modalRef.close();
  }

  /**
   * It open selected accordion or navigate to specified page if there is no subitems.
   *
   * @author Dragomir Urdov
   * @param item Header item.
   * @param index Item index.
   */
  selectItem(data: { navItem: HeaderItem; index: number }) {
    this.currentItem = this.currentItem === data.index ? -1 : data.index;

    if (!data.navItem.items?.length) {
      this.navigate(data.navItem.url);
    }
  }

  /**
   * It navigates to specified url.
   *
   * @author Dragomir Urdov
   * @param url Page url.
   */
  navigate(url: string) {
    this.closeMobileMenu();
    this.router.navigate([url]);
  }
}
