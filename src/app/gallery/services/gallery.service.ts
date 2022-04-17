import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// Services
import { CommonService, ModalRef, ModalService } from '@shared/services';

// Components
import { GalleryComponent, GalleryAddComponent } from '@gallery/components';

// Models
import { Gallery, GalleryModal, UploadImageRes } from '@gallery/models';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(
    private readonly http: HttpClient,
    private readonly commonService: CommonService,
    private readonly modalService: ModalService
  ) {}

  /**
   * It opens gallery modal.
   *
   * @author Dragomir Urdov
   * @param data Gallery modal data.
   * @returns Modal reference.
   */
  openGalleryModal(data?: Partial<GalleryModal>): ModalRef {
    return this.modalService.open<Partial<GalleryModal>>(GalleryComponent, data, { hasBackdrop: true });
  }

  /**
   * It opens modal to add new image(s) to gallery.
   *
   * @author Dragomir Urdov
   * @param data Gallery modal data.
   * @returns Modal reference.
   */
  openGalleryAddModal(data?: Partial<GalleryModal>): ModalRef {
    return this.modalService.open<Partial<GalleryModal>>(GalleryAddComponent, data, { hasBackdrop: true });
  }

  /**
   * It retrieves all gallery images.
   *
   * @author Dragomir Urdov
   * @returns All gallery images.
   */
  getAlbums(): Observable<Gallery> {
    const url = `${this.commonService.config.apiEndpoint}gallery`;
    return this.http.get<Gallery>(url);
  }

  /**
   * It retrieves all images from selected album.
   *
   * @author Dragomir Urdov
   * @param album Album name.
   * @returns All images from selected album.
   */
  getAlbumImages(album: string): Observable<string[]> {
    const url = `${this.commonService.config.apiEndpoint}gallery/${album}`;
    return this.http.get<string[]>(url);
  }

  /**
   * It retrieves image.
   *
   * @author Dragomir Urdov
   * @param album Album name.
   * @param image Image name.
   * @returns Image
   */
  getImage(album: string, image: string): Observable<string> {
    const url = `${this.commonService.config.apiEndpoint}/gallery/${album}/${image}`;
    return this.http.get<string>(url);
  }

  /**
   * It uploads new image to selected album.
   *
   * @author Dragomir Urdov
   * @param album Album name.
   * @param image Image.
   * @returns
   */
  uploadImages(album: string, data: FormData): Observable<UploadImageRes> {
    const url = `${this.commonService.config.apiEndpoint}gallery/${album}`;
    return this.http.post<UploadImageRes>(url, data);
  }
}
