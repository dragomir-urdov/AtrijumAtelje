import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { lastValueFrom, take } from 'rxjs';

import { TranslateService } from '@ngx-translate/core';

import { EnvConfig, HeaderItem, HeaderModel } from '@shared/models';

import { environment } from '@environment';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private translateService: TranslateService,
    private commonService: CommonService
  ) {}

  private get configFilePath(): string {
    const currentTs = new Date().getTime();
    return `/assets/config/${this.configFileName}?format=json&ts=${currentTs}`;
  }

  private get configFileName(): string {
    return environment.production
      ? 'config.production.json'
      : 'config.development.json';
  }

  public async init() {
    const config = await this.getAppConfig();
    const header = await this.getLayoutData();

    if (
      !config ||
      this.commonService.isObjectEmpty(config) ||
      config instanceof HttpErrorResponse
    ) {
      this.handleError();
      return;
    }

    this.commonService.config = config as EnvConfig;
    this.commonService.layout = {
      header: header as HeaderModel,
    };

    this.setLang(config as EnvConfig);

    return config;
  }

  private async getAppConfig(): Promise<EnvConfig | Error> {
    try {
      const source$ = this.http
        .get<EnvConfig>(this.configFilePath)
        .pipe(take(1));
      const config = await lastValueFrom(source$);
      return config;
    } catch (error) {
      return error as Error;
    }
  }

  private async getLayoutData(): Promise<HeaderModel | Error> {
    try {
      const source$ = this.http
        .get<HeaderModel>('/assets/data/header.json')
        .pipe(take(1));
      const header = await lastValueFrom(source$);
      return header;
    } catch (error) {
      return error as Error;
    }
  }

  private setLang(config?: EnvConfig) {
    const supportedLang = ['en', 'sr'];
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

    this.translateService.addLangs(['en', 'sr']);
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private handleError() {
    this.setLang();
    this.commonService.fatalError = true;
    this.router.navigate(['error']);
  }
}
