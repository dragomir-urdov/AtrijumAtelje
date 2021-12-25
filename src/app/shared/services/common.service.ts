import { Injectable } from '@angular/core';

import { EnvConfig, HeaderModel } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public config!: EnvConfig;

  public layout?: {
    header: HeaderModel;
  };

  public fatalError = false;

  constructor() {}

  isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
}
