import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { interval, Observable, take } from 'rxjs';

import { Store } from '@ngrx/store';
import * as authActions from '@app/auth/+state/auth.actions';

// Services
import { CommonService } from '@shared/services';

// Models
import { User, JwtToken, Signup } from '@auth/models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly commonService: CommonService,
    private readonly http: HttpClient,
    private readonly store: Store,
    private readonly zone: NgZone
  ) {}

  /**
   * It initialize scheduler for refresh token.
   *
   * @author Dragomir Urdov
   * @param expiresAt Expiration date.
   */
  initExpirationSchedule(expiresAt: number) {
    const expiresIn = expiresAt - Date.now() - 10000;

    if (expiresIn < 0) {
      // Already expired!
      this.store.dispatch(authActions.logout());
    } else {
      this.zone.runOutsideAngular(() => {
        interval(expiresIn)
          .pipe(take(1))
          .subscribe(() => this.store.dispatch(authActions.refreshToken()));
      });
    }
  }

  /**
   * It signup user.
   *
   * @author Dragomir Urdov
   * @param payload Signup credentials.
   * @returns User data.
   */
  signup(payload: Signup): Observable<{ user: User; jwt: JwtToken }> {
    const url = `${this.commonService.config.apiEndpoint}auth/signup`;
    return this.http.post<{ user: User; jwt: JwtToken }>(url, payload);
  }

  /**
   * It logs in user.
   *
   * @author Dragomir Urdov
   * @param email User email address.
   * @param password User password.
   * @returns User data.
   */
  login(email: string, password: string): Observable<{ user: User; jwt: JwtToken }> {
    const url = `${this.commonService.config.apiEndpoint}auth/login`;
    return this.http.post<{ user: User; jwt: JwtToken }>(url, { email, password });
  }

  refreshToken(): Observable<{ user: User; jwt: JwtToken }> {
    const url = `${this.commonService.config.apiEndpoint}auth/refresh-token`;
    return this.http.post<{ user: User; jwt: JwtToken }>(url, null);
  }

  /**
   * It logs out user.
   *
   * @author Dragomir Urdov
   * @returns Success status.
   */
  logout(): Observable<any> {
    const url = `${this.commonService.config.apiEndpoint}auth/logout`;
    return this.http.post(url, null);
  }
}
