import { APP_INITIALIZER, ErrorHandler, NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

// Translations
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Store
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers, effects } from '@app/core/+state';

// Routing
import { CoreRoutingModule } from '@core/core-routing.module';

// Modules
import { AuthModule } from '@auth/auth.module';
import { SharedModule } from '@shared/shared.module';

// Components
import {
  FooterComponent,
  HeaderComponent,
  HeaderItemComponent,
  MainComponent,
  MobileMenuComponent,
  MobileMenuItemsComponent,
} from '@core/components';

// Services
import { ConfigService } from '@core/services';

// Interceptors
import { AppInterceptor, ErrorInterceptor } from '@core/interceptors';

// Environment
import { environment } from '@environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

function initializeApp(configService: ConfigService): Function {
  return () => configService.init();
}

function translateLoader(http: HttpClient): any {
  const currentTs = new Date().getTime();
  return new TranslateHttpLoader(http, '/assets/lang/', '.json?ts=' + currentTs);
}

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    SharedModule,

    // Routing -----------------------------------------------------------------
    CoreRoutingModule,

    // Translations ------------------------------------------------------------
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: translateLoader,
        deps: [HttpClient],
      },
    }),

    // Store -------------------------------------------------------------------
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot(effects),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      deps: [ConfigService],
      useFactory: initializeApp,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
    },
    {
      provide: ErrorHandler,
      useClass: ErrorInterceptor,
    },
  ],
  declarations: [
    HeaderComponent,
    MobileMenuComponent,
    MobileMenuItemsComponent,
    HeaderItemComponent,
    MainComponent,
    FooterComponent,
  ],
  exports: [CoreRoutingModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    // Import guard
    if (parentModule) {
      throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
    }
  }
}
