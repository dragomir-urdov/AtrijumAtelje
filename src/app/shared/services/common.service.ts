import { Injectable } from '@angular/core';

import { EnvConfig, HeaderItem } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  public config!: EnvConfig;

  public layout?: {
    header: HeaderItem[];
  };

  public fatalError = false;

  constructor() {}

  isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
}
