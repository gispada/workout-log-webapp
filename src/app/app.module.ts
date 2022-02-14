import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { SharedModule } from '@shared/shared.module'

import { NzIconModule } from 'ng-zorro-antd/icon'
import { icons } from '@config/icons'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NzIconModule.forRoot(icons)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
