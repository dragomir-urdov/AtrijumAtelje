import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// Services
import { CommonService } from '@shared/services';

// Models
import { Collection, Variant, VariantRes } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  constructor(private readonly http: HttpClient, private readonly commonService: CommonService) {}

  public getCollections(): Observable<Collection[]> {
    const url = `${this.commonService.config.apiEndpoint}collection`;
    return this.http.get<Collection[]>(url);
  }

  public createCollection(collection: FormData): Observable<Collection> {
    const url = `${this.commonService.config.apiEndpoint}collection`;
    return this.http.post<Collection>(url, collection);
  }

  public getVariants(): Observable<VariantRes> {
    const url = `${this.commonService.config.apiEndpoint}variant`;
    return this.http.get<VariantRes>(url);
  }

  public createVariant(variant: Partial<Variant>, type: string) {
    const url = `${this.commonService.config.apiEndpoint}variant/${type}`;
    return this.http.post(url, variant);
  }
}
