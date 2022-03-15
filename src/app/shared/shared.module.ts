import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

// Modules
import { CdkModule } from '@shared/modules';

// Components
import { NotificationComponent, SelectComponent } from '@shared/components';

// Directives
import { ClickOutsideDirective } from '@shared/directives';

const components: any[] = [NotificationComponent, SelectComponent];

const directives: any[] = [ClickOutsideDirective];

@NgModule({
  declarations: [components, directives],
  imports: [RouterModule, CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, CdkModule],
  exports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, CdkModule, components, directives],
})
export class SharedModule {}
