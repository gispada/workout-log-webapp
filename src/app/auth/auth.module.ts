import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'

import { SharedModule } from '@shared/shared.module'
import { LoginComponent, AuthContainerComponent } from './components'

@NgModule({
  declarations: [LoginComponent, AuthContainerComponent],
  imports: [CommonModule, SharedModule],
  exports: [LoginComponent]
})
export class AuthModule {}
