import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SelectedImage } from '@app/gallery/models';

// services
import { GalleryService } from '@gallery/services';
import { CommonService, ModalRef } from '@shared/services';
import { Subscription } from 'rxjs';
import { SwiperOptions } from 'swiper';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
})
export class ProductCreateComponent implements OnDestroy {
  openedAsModal = false;

  form!: FormGroup;
  selectedImages?: SelectedImage[];
  imageEndpoint = `${this.commonService.config.apiEndpoint}gallery/`;

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

  subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly commonService: CommonService,
    private readonly galleryService: GalleryService,
    @Optional() @Inject(ModalRef) private readonly modalRef?: ModalRef
  ) {
    this.initForm();
    this.openedAsModal = !!modalRef;
  }

  /**
   * It inits product creation dorm.
   *
   * @author Dragomir Urdov
   */
  private initForm() {
    this.form = this.formBuilder.group({
      title: new FormControl(),
      description: new FormControl(),
      details: new FormControl(),
    });
  }

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
      })
    );
  }

  /**
   * It closes modal.
   *
   * @author Dragomir Urdov
   */
  closeModal() {
    this.modalRef?.close();
  }

  /**
   * OnDestroy lifecycle hook.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
