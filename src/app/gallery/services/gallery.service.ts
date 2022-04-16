import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// Services
import { CommonService } from '@shared/services';

// Models
import { Gallery } from '@gallery/models';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  constructor(private readonly http: HttpClient, private readonly commonService: CommonService) {}

  getAlbums(): Observable<Gallery> {
    const url = `${this.commonService.config.apiEndpoint}gallery`;
    return this.http.get<Gallery>(url);
  }

  getAlbumImages(album: string): Observable<string[]> {
    const url = `${this.commonService.config.apiEndpoint}gallery/${album}`;
    return this.http.get<string[]>(url);
  }

  getImage(album: string, image: string): Observable<string> {
    const url = `${this.commonService.config.apiEndpoint}/gallery/${album}/${image}`;
    return this.http.get<string>(url);
  }

  uploadProductImages(album: string, data: any) {
    const url = `${this.commonService.config.apiEndpoint}/gallery/${album}`;
    return this.http.post(url, data);
  }
}
