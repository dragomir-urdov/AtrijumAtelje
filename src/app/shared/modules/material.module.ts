import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

const material: any[] = [
  MatIconModule,
  MatButtonModule,
  MatTabsModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
];

@NgModule({
  imports: [CommonModule, material],
  exports: [material],
})
export class MaterialModule {}
