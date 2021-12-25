import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as AppGlobals from '@app/app.globals';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent {
  constructor(private title: Title) {
    title.setTitle(`${AppGlobals.appTitle} | NOT FOUND`);
  }
}
