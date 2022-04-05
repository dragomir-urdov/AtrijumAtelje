import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

// Services
import { CommonService } from '@shared/services';

// Models
import { Collection } from '@shared/models';

@Injectable({ providedIn: 'root' })
export class ProductService {
  constructor(private readonly http: HttpClient, private readonly commonService: CommonService) {}

  getCollections(): Observable<Collection[]> {
    const url = `${this.commonService.config.apiEndpoint}collection`;
    return this.http.get<Collection[]>(url);
  }

  getCollection(id: number): Observable<Collection> {
    const url = `${this.commonService.config.apiEndpoint}collection/${id}`;
    return this.http.get<Collection>(url);
  }
}
