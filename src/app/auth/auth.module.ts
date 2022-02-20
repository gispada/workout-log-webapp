import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { SharedModule } from '@shared/shared.module'
import { LoginComponent, AuthContainerComponent } from './components'

@NgModule({
  declarations: [LoginComponent, AuthContainerComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, SharedModule],
  exports: [LoginComponent]
})
export class AuthModule {}
