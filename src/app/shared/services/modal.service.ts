import { Injectable, InjectionToken, Injector } from '@angular/core';

import { Observable, Subject, Subscription, take } from 'rxjs';

import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  public open<COMPONENT, CONFIG>(component: ComponentType<COMPONENT>, config?: ModalConfig<CONFIG>): ModalRef {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

    const overlayRef = this.overlay.create({
      positionStrategy,
      hasBackdrop: true,
      backdropClass: config?.backdropClass,
      panelClass: config?.panelClass,
    });

    const modalRef = new ModalRef(overlayRef);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        { provide: ModalRef, useValue: modalRef },
        { provide: MODAL_DATA, useValue: config?.data },
      ],
    });

    const portal = new ComponentPortal(component, null, injector);
    overlayRef.attach(portal);

    return modalRef;
  }
}

export class ModalRef {
  private _afterClose = new Subject<any>();
  public get afterClose(): Observable<any> {
    return this._afterClose.asObservable();
  }

  constructor(private overlayRef: OverlayRef) {}

  public close(result?: any) {
    this.overlayRef.dispose();
    this._afterClose.next(result);
    this._afterClose.complete();
  }
}

export const MODAL_DATA = new InjectionToken<any>('DIALOG_DATA');

export interface ModalConfig<T> {
  data?: T;
  backdropClass?: string | string[];
  panelClass?: string | string[];
}
