import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzIconModule } from 'ng-zorro-antd/icon'

import { HeaderComponent } from './components/header/header.component'
import { ShellComponent } from './components/shell/shell.component'
import { RouterModule } from '@angular/router'

@NgModule({
  declarations: [ShellComponent, HeaderComponent],
  imports: [CommonModule, NzLayoutModule, NzAvatarModule, NzIconModule, RouterModule],
  exports: [ShellComponent]
})
export class SharedModule {}
