import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';
import { SwiperModule } from 'swiper/angular';

// Modules
import { CdkModule, MaterialModule } from '@shared/modules';

// Components
import { NotificationComponent, SelectComponent } from '@shared/components';

// Directives
import { ClickOutsideDirective, AutofocusDirective, DragAndDropFileDirective } from '@shared/directives';

const components: any[] = [NotificationComponent, SelectComponent];

const directives: any[] = [ClickOutsideDirective, AutofocusDirective, DragAndDropFileDirective];

@NgModule({
  declarations: [components, directives],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CdkModule,
    MaterialModule,
    SwiperModule,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CdkModule,
    MaterialModule,
    SwiperModule,
    components,
    directives,
  ],
})
export class SharedModule {}
