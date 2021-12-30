import { ComponentRef, EventEmitter, Injectable, InjectionToken, Injector } from '@angular/core';

import { filter, Observable, Subject, take } from 'rxjs';

import { ComponentType, Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { AnimationEvent } from '@angular/animations';

const DEFAULT_CONFIG: OverlayConfig = {
  hasBackdrop: false,
};

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private overlay: Overlay, private injector: Injector) {}

  /**
   * It opens modal.
   *
   * @author Dragomir Urdov
   * @param component Component
   * @param data Component data
   * @param config Overlay configuration
   * @returns Modal reference
   */
  open<D>(component: ComponentType<any>, data?: D, config?: OverlayConfig): ModalRef {
    const overlayConfig = { ...DEFAULT_CONFIG, ...config };

    const overlayRef = this.createOverlay(overlayConfig);

    const modalRef = new ModalRef(overlayRef);

    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: ModalRef,
          useValue: modalRef,
        },
        {
          provide: MODAL_DATA,
          useValue: data,
        },
      ],
    });

    const portal = new ComponentPortal(component, null, injector);
    const componentRef = overlayRef.attach(portal);

    modalRef.componentRef = componentRef;

    return modalRef;
  }

  /**
   * It creates overlay instance.
   *
   * @author Dragomir Urdov
   * @param config Overlay config.
   * @returns Overlay reference.
   */
  private createOverlay(config: OverlayConfig): OverlayRef {
    const overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  }

  /**
   * It gets overlay configuration.
   *
   * @author Dragomir Urdov
   * @param config Overlay Configuration.
   * @returns Overlay Configuration.
   */
  private getOverlayConfig(config: OverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

    const overlayConfig = new OverlayConfig({
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy,
      ...config,
    });

    return overlayConfig;
  }
}

export class ModalRef {
  private _beforeClose = new Subject<void>();
  public get beforeClose(): Observable<void> {
    return this._beforeClose.asObservable();
  }

  private _afterClose = new Subject<void>();
  public get afterClose(): Observable<void> {
    return this._afterClose.asObservable();
  }

  /**
   * Component reference
   */
  componentRef?: ComponentRef<any>;

  constructor(private overlayRef: OverlayRef) {}

  /**
   * It close modal.
   *
   * @author Dragomir Urdov
   */
  public close() {
    if (this.componentRef?.instance?.animationStateChanged) {
      this.componentRef?.instance?.animationStateChanged
        .pipe(
          filter((event: AnimationEvent) => event.phaseName === 'start'),
          take(1)
        )
        .subscribe(() => {
          this._beforeClose.next();
          this._beforeClose.complete();
          this.overlayRef.detachBackdrop();
        });

      this.componentRef?.instance?.animationStateChanged
        .pipe(
          filter((event: AnimationEvent) => event.phaseName === 'done' && event.toState === 'leave'),
          take(1)
        )
        .subscribe(() => {
          this.overlayRef.dispose();
          this._afterClose.next();
          this._afterClose.complete();

          this.componentRef = undefined;
        });

      this.componentRef?.instance?.startExitAnimation();
      return;
    }

    this.overlayRef.detachBackdrop();
    this.overlayRef.dispose();
    this._afterClose.next();
    this._afterClose.complete();

    this.componentRef = undefined;
  }
}

/**
 * Modal injection token.
 */
export const MODAL_DATA = new InjectionToken<any>('MODAL_DATA');

export class AnimatedModalComponent {
  animationState: 'void' | 'enter' | 'leave' = 'enter';

  animationStateChanged = new EventEmitter<AnimationEvent>();

  /**
   * Start exit animation witch will trigger modal close.
   */
  startExitAnimation() {
    this.animationState = 'leave';
  }

  /**
   * It triggers animation state changes.
   * @param event Animation event
   */
  triggerAnimation(event: AnimationEvent) {
    this.animationStateChanged.next(event);
  }
}
