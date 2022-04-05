import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// Services
import { CommonService } from '@shared/services';

@Injectable({ providedIn: 'root' })
export class CollectionService {
  constructor(private readonly http: HttpClient, private readonly commonService: CommonService) {}

  public getCollections(): Observable<any[]> {
    const url = `${this.commonService.config.apiEndpoint}collection`;
    return this.http.get<any[]>(url);
  }

  public createCollection(collection: FormData): Observable<any> {
    const url = `${this.commonService.config.apiEndpoint}collection`;
    return this.http.post(url, collection);
  }
}
