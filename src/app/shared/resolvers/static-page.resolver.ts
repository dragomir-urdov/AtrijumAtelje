import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import { map, Observable } from 'rxjs';

import { HomeModel } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class StaticPageResolver implements Resolve<HomeModel> {
  constructor(private http: HttpClient) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<HomeModel> {
    const json = route.url;
    return this.http.get<HomeModel>(`/assets/data/${json[0] ?? 'home'}.json`);
  }
}

export class StaticPage<T> {
  static$ = this.route.data.pipe(map((data) => data['static'] as T));

  constructor(public route: ActivatedRoute) {}
}
