import { Component } from '@angular/core';
import { CommonService } from '@shared/services';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  fatalError = this.commonService.fatalError;

  constructor(private commonService: CommonService) {}
}
