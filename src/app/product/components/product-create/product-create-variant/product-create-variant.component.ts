import { Component, EventEmitter, Output, ViewChild } from '@angular/core';

import { Subscription } from 'rxjs';

import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// Services
import { CommonService } from '@shared/services';
import { GalleryService } from '@gallery/services';

// Models
import { Variant } from '@shared/models';
import { SelectedImage } from '@gallery/models';

@Component({
  selector: 'app-product-create-variant',
  templateUrl: './product-create-variant.component.html',
})
export class ProductCreateVariantComponent {
  @Output() addVariant = new EventEmitter<Variant>();

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  config: SwiperOptions = {
    pagination: false,
    autoplay: true,
    keyboard: true,
    mousewheel: true,
    loop: false,
    freeMode: true,
    slidesPerView: 'auto',
    spaceBetween: 8,
  };

  imageEndpoint = `${this.commonService.config.apiEndpoint}gallery/`;
  selectedImages?: SelectedImage[];

  private subscriptions = new Subscription();

  constructor(private readonly commonService: CommonService, private readonly galleryService: GalleryService) {}

  /**
   * It opens modal and save selected images.
   *
   * @author Dragomir Urdov
   */
  selectImage() {
    const modalRef = this.galleryService.openGalleryModal({
      album: 'products',
      selectMultiple: true,
      selectedImages: this.selectedImages,
    });
    this.subscriptions.add(
      modalRef.data.subscribe(({ selectedImages }) => {
        this.selectedImages = selectedImages;
        this.swiper?.swiperRef.slideTo(0);
      })
    );
  }
}
