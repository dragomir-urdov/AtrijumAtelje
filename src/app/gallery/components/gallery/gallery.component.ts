import { Component, EventEmitter, Inject, Input, OnInit, Optional, Output } from '@angular/core';

import { Store } from '@ngrx/store';
import * as GalleryActions from '@gallery/+state/gallery.actions';
import * as GallerySelectors from '@gallery/+state/gallery.selectors';

// Services
import { CommonService, ModalRef, ModalService, MODAL_DATA } from '@shared/services';

// Components
import { GalleryAddComponent } from '@gallery/components';

// Models
import { GalleryModal } from '@gallery/models';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() selectMultiple = false;
  private get _selectMultiple(): boolean {
    return this.modalData?.selectMultiple ?? this.selectMultiple;
  }

  @Input() album?: string;
  get _album(): string | undefined | null {
    return this.modalData?.album ?? this.album;
  }

  @Output() selectedImages = new EventEmitter<[album: string, image: string] | [album: string, image: string][]>();
  selected: [album: string, image: string][] = [];

  gallery$ = this.store.select(GallerySelectors.selectAlbums);
  imageUrl = `${this.commonService.config.apiEndpoint}gallery/`;

  openedAsModal = false;

  constructor(
    private readonly store: Store,
    private readonly commonService: CommonService,
    private readonly modalService: ModalService,
    @Optional() @Inject(ModalRef) private readonly modalRef?: ModalRef,
    @Optional() @Inject(MODAL_DATA) private readonly modalData?: GalleryModal
  ) {
    this.openedAsModal = !!modalRef;
  }

  /**
   * OnInit lifecycle hook.
   */
  ngOnInit(): void {
    this.store.dispatch(GalleryActions.getGallery());
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

    this.selectedImages.emit(this._selectMultiple ? this.selected : this.selected[0]);
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
    this.modalRef?.close();
  }

  addNewImage(album: string) {
    this.modalService.open<{ album: string }>(GalleryAddComponent, { album }, { hasBackdrop: true });
  }
}
