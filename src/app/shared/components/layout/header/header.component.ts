import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppRoute, HeaderItem } from '@shared/models';

import * as AppGlobals from '@app/app.globals';
import { CommonService } from '@app/shared/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  public route: AppRoute = AppGlobals.route;

  public headerItems?: HeaderItem[] = this.commonService.layout?.header;

  constructor(private http: HttpClient, private commonService: CommonService) {}
}
