import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import * as AppGlobals from '@app/app.globals';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
})
export class AboutComponent {
  constructor(private title: Title) {
    title.setTitle(`${AppGlobals.appTitle} | ABOUT`);
  }
}
