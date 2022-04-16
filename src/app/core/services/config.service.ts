import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { lastValueFrom, take } from 'rxjs';

import { Store } from '@ngrx/store';
import * as CoreActions from '@app/core/+state/core.actions';

import { TranslateService } from '@ngx-translate/core';

import { EnvConfig, HeaderModel } from '@shared/models';
import { CommonService } from '@shared/services';

import { environment } from '@environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly store: Store,
    private readonly translateService: TranslateService,
    private readonly commonService: CommonService
  ) {}

  /**
   * Config file path.
   */
  private get configFilePath(): string {
    const currentTs = new Date().getTime();
    return `/assets/config/${this.configFileName}?format=json&ts=${currentTs}`;
  }

  /**
   * Config file name.
   */
  private get configFileName(): string {
    return environment.production ? 'config.production.json' : 'config.development.json';
  }

  /**
   * It initialize application and set all configuration data.
   *
   * @author Dragomir Urdov
   * @returns Configuration data as promise.
   */
  public async init() {
    const config = await this.getAppConfig();
    if (!config || this.commonService.isObjectEmpty(config) || config instanceof HttpErrorResponse) {
      this.handleError();
      return;
    }

    const header = await this.getLayoutData();
    if (!header || this.commonService.isObjectEmpty(header) || header instanceof HttpErrorResponse) {
      this.handleError();
      return;
    }

    this.commonService.config = config as EnvConfig;
    this.commonService.layout = {
      header: header as HeaderModel,
    };

    this.setLang(config as EnvConfig);

    this.store.dispatch(CoreActions.getCoreData());

    return config;
  }

  /**
   * It retrieve application configuration.
   *
   * @author Dragomir Urdov
   * @returns Configuration data.
   */
  private async getAppConfig(): Promise<EnvConfig | Error> {
    try {
      const source$ = this.http.get<EnvConfig>(this.configFilePath).pipe(take(1));
      const config = await lastValueFrom(source$);
      return config;
    } catch (error) {
      return error as Error;
    }
  }

  /**
   * It retrieve header data.
   *
   * @author Dragomir Urdov
   * @returns Header data.
   */
  private async getLayoutData(): Promise<HeaderModel | Error> {
    try {
      const source$ = this.http.get<HeaderModel>('/assets/data/header.json').pipe(take(1));
      const header = await lastValueFrom(source$);
      return header;
    } catch (error) {
      return error as Error;
    }
  }

  /**
   * It initialize translation service.
   *
   * @author Dragomir Urdov
   * @param config Application configuration.
   */
  private setLang(config?: EnvConfig) {
    const supportedLang = config?.langs ?? ['en', 'sr'];
    let lang: string;

    const browserLang = this.translateService.getBrowserLang();
    const userLanguageCode = localStorage.getItem('Lang');

    if (userLanguageCode && supportedLang.includes(userLanguageCode)) {
      lang = userLanguageCode;
    } else if (browserLang && supportedLang.includes(browserLang)) {
      lang = browserLang;
    } else {
      lang = config?.selectedLanguage ?? 'en';
    }

    this.translateService.addLangs(supportedLang);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  /**
   * It handle initialization errors.
   *
   * @author Dragomir Urdov
   */
  private handleError() {
    this.setLang();
    this.commonService.fatalError = true;
    this.router.navigate(['error']);
  }
}
