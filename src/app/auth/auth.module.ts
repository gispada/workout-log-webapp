import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { SharedModule } from '@shared/shared.module'
import { AuthRoutingModule } from './auth-routing.module'
import {
  LoginComponent,
  AuthContainerComponent,
  ConfirmUserComponent
} from './components'

@NgModule({
  declarations: [LoginComponent, AuthContainerComponent, ConfirmUserComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule
  ],
  exports: [LoginComponent, ConfirmUserComponent]
})
export class AuthModule {}
