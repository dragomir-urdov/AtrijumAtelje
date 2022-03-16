import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

// Models
import { User, JwtToken } from '@auth/models';

// Environment
import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  /**
   * It logs in user.
   *
   * @author Dragomir Urdov
   * @param email User email address.
   * @param password User password.
   * @returns User data.
   */
  login(email: string, password: string): Observable<{ user: User; jwt: JwtToken }> {
    const uri = `${environment.apiEndpoint}auth/login`;
    return this.http.post<{ user: User; jwt: JwtToken }>(uri, { email, password });
  }
}
