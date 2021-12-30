import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';

import { catchError, EMPTY, map, Observable, of, take } from 'rxjs';

import { HomeModel } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class StaticPageResolver implements Resolve<StaticPageType> {
  constructor(private http: HttpClient, private router: Router) {}

  /**
   * It returns static page data.
   *
   * @author Dragomir Urdov
   * @param route Activated route snapshot
   * @param state Route state.
   * @returns Static page data.
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<StaticPageType> {
    const json = route.url;

    return this.http.get<StaticPageType>(`/assets/data/${json[0] ?? 'home'}.json`).pipe(
      take(1),
      catchError(() => {
        this.router.navigate(['error']);
        return of(EMPTY);
      })
    );
  }
}

export type StaticPageType = HomeModel | Observable<never>;

export class StaticPage<T> {
  /**
   * Static page data.
   */
  static$ = this.route.data.pipe(map((data) => data['static'] as T));

  constructor(public route: ActivatedRoute) {}
}
