import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

import { HomeModel } from '@shared/models';
import { StaticPage } from '@shared/resolvers';

import * as AppGlobals from '@app/app.globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent extends StaticPage<HomeModel> {
  constructor(private title: Title, route: ActivatedRoute) {
    super(route);
    title.setTitle(`${AppGlobals.appTitle} | HOME`);
  }
}
