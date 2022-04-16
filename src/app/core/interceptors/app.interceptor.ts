import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';

import { first, mergeMap, Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import * as authSelectors from '@app/auth/+state/auth.selectors';

import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(private readonly store: Store, private translateService: TranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/assets/')) {
      // Set language.
      request = this.setLangHeader(request);

      // Set auth header.
      return this.store.select(authSelectors.selectJwt).pipe(
        first(),
        mergeMap((jwt) => {
          const authReq = !!jwt
            ? request.clone({
                setHeaders: { Authorization: 'Bearer ' + jwt.token },
              })
            : request;

          return next.handle(authReq);
        })
      );
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
