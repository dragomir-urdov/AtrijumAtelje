import { Component, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import SwiperCore, { Autoplay, Navigation, Pagination, SwiperOptions } from 'swiper';

import { SwiperModel } from '@shared/models';

SwiperCore.use([Pagination, Autoplay, Navigation]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
})
export class CarouselComponent {
  @Input() items!: SwiperModel[];

  config: SwiperOptions = {
    pagination: true,
    autoplay: true,
    keyboard: true,
    mousewheel: true,
    loop: true,
  };
  disableNavigation = 'ontouchstart' in this.document.documentElement;

  constructor(@Inject(DOCUMENT) private document: Document) {}
}
