import { Component, Inject, Input, OnDestroy, Optional } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { Subscription, take, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as GalleryActions from '@gallery/+state/gallery.actions';

// Services
import { GalleryService } from '@gallery/services';
import { ModalRef, MODAL_DATA } from '@shared/services';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
})
export class GalleryAddComponent implements OnDestroy {
  @Input() album?: string;
  get _album(): string | undefined {
    return this.modalData?.album ?? this.album;
  }

  openedAsModal = false;
  imagePaths: string[] = [];

  form!: FormGroup;
  subscriptions = new Subscription();

  constructor(
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly galleryService: GalleryService,
    @Optional() @Inject(ModalRef) private readonly modalRef: ModalRef,
    @Optional() @Inject(MODAL_DATA) private readonly modalData?: { album: string }
  ) {
    this.openedAsModal = !!this.modalRef;
    this.initForm();
    this.connectSuccessUpload();
  }

  /**
   * It initializes new form.
   *
   * @author Dragomir Urdov
   */
  private initForm() {
    this.form = new FormGroup({
      files: new FormControl([]),
    });
  }

  /**
   * It closes modal after successful upload images.
   *
   * @author Dragomir Urdov
   */
  private connectSuccessUpload() {
    this.subscriptions.add(
      this.actions$
        .pipe(
          ofType(GalleryActions.uploadImagesSuccess),
          take(1),
          tap(() => {
            this.closeModal();
          })
        )
        .subscribe()
    );
  }

  /**
   * It displays uploaded images as preview.
   *
   * @author Dragomir Urdov
   * @param event Image selection event.
   */
  async imagePreview(event: Event) {
    const target = event?.target as HTMLInputElement;
    if (!target || !target.files) return;

    const files = target.files;
    if (files.length <= 0) {
      return;
    }

    this.form.controls['files'].setValue(files);

    let paths$ = Array.from(files).map((file) => {
      let reader = new FileReader();
      return new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    this.imagePaths = await Promise.all(paths$);
  }

  /**
   * It submits form to upload images.
   *
   * @author Dragomir Urdov
   */
  submit() {
    if (!this._album) {
      return;
    }

    const formData = new FormData();
    Object.values<File>(this.form.value.files).forEach((file) => {
      formData.append('images', file);
    });

    this.store.dispatch(GalleryActions.uploadImages({ album: this._album, images: formData }));
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
