import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as AuthSelectors from '@app/auth/+state/auth.selectors';
import * as AuthActions from '@app/auth/+state/auth.actions';

//Services
import { ModalService } from '@shared/services';

// Components
import { AuthComponent } from '@auth/components';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  isAuth = this.store.select(AuthSelectors.selectIsAuthenticated);

  constructor(private readonly store: Store, private readonly modalService: ModalService) {}

  openAdminModal() {
    this.modalService.open(AuthComponent, null, { hasBackdrop: true, panelClass: 'p-2' });
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
