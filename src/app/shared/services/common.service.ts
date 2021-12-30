import { Injectable } from '@angular/core';

import { EnvConfig, HeaderModel } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  /**
   * Application configuration.
   */
  public config!: EnvConfig;

  /**
   * Layout configuration.
   */
  public layout?: {
    header: HeaderModel;
  };

  public fatalError = false;

  constructor() {}

  /**
   * It checks is object empty.
   *
   * @author Dragomir Urdov
   * @param obj Object to be checked.
   * @returns Is object empty.
   */
  public isObjectEmpty(obj: object): boolean {
    return Object.keys(obj).length === 0;
  }
}
