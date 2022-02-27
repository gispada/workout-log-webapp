import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { SharedModule } from '@shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'
import {
  LoginComponent,
  AuthContainerComponent,
  ConfirmUserComponent,
  GoogleRedirectComponent
} from './components'

@NgModule({
  declarations: [
    LoginComponent,
    AuthContainerComponent,
    ConfirmUserComponent,
    GoogleRedirectComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports: []
})
export class AuthModule {}
