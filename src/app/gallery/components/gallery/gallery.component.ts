import { Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Optional, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import * as GalleryActions from '@gallery/+state/gallery.actions';
import * as GallerySelectors from '@gallery/+state/gallery.selectors';

// Services
import { CommonService, ModalRef, MODAL_DATA } from '@shared/services';
import { GalleryService } from '@gallery/services';

// Models
import { GalleryModal, SelectedImage } from '@gallery/models';
import { KeyValue } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() selectMultiple = false;
  private get _selectMultiple(): boolean {
    return this.data?.selectMultiple ?? this.selectMultiple;
  }

  @Input() album?: string;
  get _album(): string | undefined | null {
    return this.data?.album ?? this.album;
  }

  @Output() selectedImages = new EventEmitter<{ selectedImages: SelectedImage[] }>();
  selected: SelectedImage[] = [...(this.data?.selectedImages ?? [])] ?? [];

  gallery$ = this.store.select(GallerySelectors.selectAlbums);
  imageUrl = `${this.commonService.config.apiEndpoint}gallery/`;

  openedAsModal = false;

  constructor(
    private readonly store: Store,
    private readonly commonService: CommonService,
    private readonly galleryService: GalleryService,
    @Optional() private readonly dialogRef?: MatDialogRef<GalleryComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public readonly data?: Partial<GalleryModal>
  ) {
    this.openedAsModal = !!this.dialogRef;
  }

  /**
   * OnInit lifecycle hook.
   */
  ngOnInit(): void {
    this.store.dispatch(GalleryActions.getGallery());
  }

  /**
   * It track album array by album name,
   *
   * @author Dragomir Urdov
   * @param index Item index.
   * @param album Album data.
   * @returns Album name.
   */
  trackByAlbumName(index: number, album: KeyValue<string, string[]>) {
    return album.key;
  }

  /**
   * It track images array by image name,
   *
   * @author Dragomir Urdov
   * @param index Item index.
   * @param image Image data.
   * @returns Image name.
   */
  trackByImageName(index: number, image: string) {
    return image;
  }

  /**
   * It selects image.
   *
   * @author Dragomir Urdov
   * @param album Album name.
   * @param image Selected image.
   */
  selectImage(album: string, image: string) {
    if (!this._selectMultiple) {
      this.selected[0] = [album, image];
    } else {
      const index = this.selected.findIndex((item) => item[0] === album && item[1] === image);
      if (index !== -1) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push([album, image]);
      }
    }
  }

  /**
   * It selects images.
   *
   * @author Dragomir Urdov
   */
  select() {
    this.emitData();
    this.closeModal();
  }

  /**
   * It emits selected images.
   *
   * @author Dragomir Urdov
   */
  private emitData() {
    this.dialogRef
      ? this.dialogRef.close({ selectedImages: [...this.selected] })
      : this.selectedImages.emit({ selectedImages: [...this.selected] });
  }

  /**
   * It checks is image selected.
   *
   * @author Dragomir Urdov
   * @param album Album name.
   * @param image Image name.
   * @returns Is image selected.
   */
  isSelected(album: string, image: string): boolean {
    return !!this.selected.find((item) => item[0] === album && item[1] === image);
  }

  /**
   * It closes modal.
   *
   * @author Dragomir Urdov
   */
  closeModal() {
    this.dialogRef?.close({ selectedImages: [...this.selected] });
  }

  addNewImage(album: string) {
    this.galleryService.openGalleryAddModal({ album });
  }
}
