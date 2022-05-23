import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Store
import { Store } from '@ngrx/store';
import * as AuthSelectors from '@app/auth/+state/auth.selectors';
import * as AuthActions from '@app/auth/+state/auth.actions';

// Components
import { AuthComponent } from '@auth/components';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  isAuth = this.store.select(AuthSelectors.selectIsAuthenticated);

  constructor(private readonly store: Store, private readonly dialog: MatDialog) {}

  openAdminModal() {
    this.dialog.open(AuthComponent);
  }

  logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
