import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

import { TranslateService } from '@ngx-translate/core';

import { AppRoute, Breakpoint, HeaderModel } from '@shared/models';
import { MobileMenuComponent } from '@shared/components';
import { CommonService, ModalRef, ModalService } from '@shared/services';

import * as AppGlobals from '@app/app.globals';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  public route: AppRoute = AppGlobals.route;

  public header: HeaderModel = this.commonService.layout!.header;
  public langs: string[] = this.commonService.config.langs;

  selectedLang = this.translateService.currentLang;

  private modalRef?: ModalRef;

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

  changeLang() {
    localStorage.setItem('Lang', this.selectedLang);
    this.translateService.use(this.selectedLang);
  }
}
