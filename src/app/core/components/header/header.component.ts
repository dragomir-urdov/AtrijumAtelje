import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { TranslateService } from '@ngx-translate/core';

// Models
import { AppRoute, Breakpoint, HeaderModel } from '@shared/models';

// Components
import { MobileMenuComponent } from '@core/components';

// Services
import { CommonService, ModalRef, ModalService } from '@shared/services';

// Environment
import * as AppGlobals from '@app/app.globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  private modalRef?: ModalRef;

  public route: AppRoute = AppGlobals.route;
  public header: HeaderModel = this.commonService.layout!.header;

  public langs = AppGlobals.languages;
  public selectedLang = this.langs.find((lang) => lang.short == this.translateService.currentLang);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private commonService: CommonService,
    private modalService: ModalService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoint.lg).subscribe((match: BreakpointState) => {
      if (this.modalRef && match.matches) {
        this.modalRef.close();
      }
    });
  }

  openSideMenu() {
    this.modalRef = this.modalService.open(MobileMenuComponent, this.header, {
      panelClass: ['w-full', 'h-full', 'd-flex'],
    });
  }

  changeLang(lang: any) {
    this.selectedLang = lang;

    const language = this.selectedLang?.short ?? this.commonService.config.defaultLanguage;

    localStorage.setItem('Lang', language);
    this.translateService.use(language);
  }
}
