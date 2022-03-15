import { NgModule } from '@angular/core';

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { CoreModule } from '@core/core.module';

// Components
import { AppComponent } from '@app/app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, CoreModule],

  bootstrap: [AppComponent],
})
export class AppModule {}
