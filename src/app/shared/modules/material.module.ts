import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

const material: any[] = [MatIconModule, MatTabsModule];

@NgModule({
  imports: [CommonModule, material],
  exports: [material],
})
export class MaterialModule {}
