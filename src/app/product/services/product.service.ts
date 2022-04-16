import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Services
import { CommonService } from '@shared/services';

// Models
import { ProductQueryParams, ProductRes } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private readonly http: HttpClient, private readonly commonService: CommonService) {}

  getProducts(params?: ProductQueryParams): Observable<ProductRes> {
    const url = `${this.commonService.config.apiEndpoint}product`;
    return this.http.get<ProductRes>(url, { params: { ...params } });
  }
}
