import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as AppGlobals from '@app/app.globals';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  constructor(private title: Title) {
    title.setTitle(`${AppGlobals.appTitle} | HOME`);
  }
}
