import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription } from 'rxjs';

import { SwiperOptions } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

import { Store } from '@ngrx/store';
import * as CoreSelectors from '@core/+state/core.selectors';

// Services
import { CommonService } from '@shared/services';
import { GalleryService } from '@gallery/services';

// Models
import { SelectedImage } from '@gallery/models';

@Component({
  selector: 'app-product-create-variant',
  templateUrl: './product-create-variant.component.html',
})
export class ProductCreateVariantComponent implements OnInit, OnDestroy {
  @Input() variant?: any;

  @Output() addVariant = new EventEmitter<any>();
  @Output() updateVariant = new EventEmitter<any>();

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  private subscriptions = new Subscription();

  readonly imageEndpoint = `${this.commonService.config.apiEndpoint}gallery/`;
  readonly config: SwiperOptions = {
    pagination: false,
    autoplay: true,
    keyboard: true,
    mousewheel: true,
    loop: false,
    freeMode: true,
    slidesPerView: 'auto',
    spaceBetween: 8,
  };

  form!: FormGroup;
  public get images(): AbstractControl | null {
    return this.form.get('images');
  }

  readonly variants$ = this.store.select(CoreSelectors.selectVariants);

  constructor(
    private readonly commonService: CommonService,
    private readonly galleryService: GalleryService,
    private readonly formBuilder: FormBuilder,
    private readonly store: Store
  ) {}

  /**
   * OnInit lifecycle hook.
   */
  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      price: new FormControl(this.variant?.price, [Validators.required, Validators.min(0)]),
      images: new FormControl(this.variant?.images),
      stone: new FormGroup({
        id: new FormControl(this.variant?.stone.id, Validators.required),
        size: new FormControl(this.variant?.stone.size, [Validators.required, Validators.min(0)]),
      }),
      metal: new FormGroup({
        id: new FormControl(this.variant?.metal.id, Validators.required),
        quality: new FormControl(this.variant?.metal.quality, [Validators.required, Validators.min(0)]),
        color: new FormControl(this.variant?.metal.color, Validators.required),
      }),
      shape: new FormControl(this.variant?.shape),
      style: new FormControl(this.variant?.style),
    });
  }

  /**
   * It opens modal and save selected images.
   *
   * @author Dragomir Urdov
   */
  selectImage() {
    const dialogRef = this.galleryService.openGalleryModal({
      album: 'products',
      selectMultiple: true,
      selectedImages: this.form.value.images,
    });

    this.subscriptions.add(
      dialogRef.afterClosed().subscribe((data) => {
        this.form.controls['images'].setValue(data?.selectedImages);
        this.swiper?.swiperRef.slideTo(0);
      })
    );
  }

  /**
   * It submits form (add new variant or update existing one).
   *
   * @author Dragomir Urdov
   */
  onSubmit() {
    if (this.form.invalid) return;

    if (this.variant) {
      // Update
      this.updateVariant.emit({ ...this.form.value });
    } else {
      // Add new
      this.addVariant.emit({ ...this.form.value });
      this.form.reset();
    }
  }

  /**
   * It sets all form values to initial value.
   *
   * @author Dragomir Urdov
   */
  onClear() {
    this.form.reset();
  }

  /**
   * OnDestroy lifecycle hook.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
