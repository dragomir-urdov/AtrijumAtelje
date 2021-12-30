import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { Observable } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private translateService: TranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/assets/')) {
      request = this.setLangHeader(request);
    }

    return next.handle(request);
  }

  /**
   * It appends request header with language data.
   *
   * @author Dragomir Urdov
   * @param request Request
   * @returns Request clone.
   */
  private setLangHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let newReq = request;

    if (!request.headers.has('Content-Language')) {
      newReq = request.clone({
        headers: request.headers.set('Content-Language', this.translateService.currentLang),
      });
    }

    return newReq;
  }
}
