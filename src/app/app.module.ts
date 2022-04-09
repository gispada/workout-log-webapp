import { NgModule } from '@angular/core'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { FaIconLibrary } from '@fortawesome/angular-fontawesome'

import { CoreModule } from '@core/core.module'
import { AuthModule } from '@auth/auth.module'
import { DashboardModule } from '@dashboard/dashboard.module'
import { SettingsModule } from '@settings/settings.module'
import { ExercisesModule } from '@exercises/exercises.module'
import { WorkoutsModule } from '@workouts/workouts.module'
import { appConfig, APP_CONFIG } from '@config/app'
import { icons } from '@config/icons'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { effects, reducers } from './state'
import { extModules } from './build-specifics'

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http)
}

const featureModules = [
  CoreModule,
  AuthModule,
  DashboardModule,
  ExercisesModule,
  WorkoutsModule,
  SettingsModule
]

const storeModules = [
  StoreModule.forRoot(reducers),
  EffectsModule.forRoot(effects),
  StoreRouterConnectingModule.forRoot()
]

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ...featureModules,
    ...storeModules,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ...extModules
  ],
  providers: [{ provide: APP_CONFIG, useValue: appConfig }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(...icons)
  }
}
