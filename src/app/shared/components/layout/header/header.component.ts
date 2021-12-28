import { Component, OnInit } from '@angular/core';

import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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

  private modalRef?: ModalRef;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private commonService: CommonService,
    private modalService: ModalService
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
}
