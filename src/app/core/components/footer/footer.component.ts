import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as AuthSelectors from '@auth/state/auth.selectors';

//Services
import { ModalService } from '@shared/services';

// Components
import { AuthComponent } from '@auth/components';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  isAuth = this.store.select(AuthSelectors.isAuthenticated);

  constructor(private readonly store: Store, private readonly modalService: ModalService) {}

  openAdminModal() {
    this.modalService.open(AuthComponent, null, { hasBackdrop: true, panelClass: 'p-2' });
  }
}
