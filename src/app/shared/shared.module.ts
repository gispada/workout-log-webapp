import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzInputModule } from 'ng-zorro-antd/input'

import { HeaderComponent } from './components/header/header.component'
import { ShellComponent } from './components/shell/shell.component'
import { SelectComponent } from './components/select/select.component'

@NgModule({
  declarations: [ShellComponent, HeaderComponent, SelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzAvatarModule,
    NzIconModule,
    RouterModule,
    NzMenuModule,
    NzSelectModule,
    FontAwesomeModule
  ],
  exports: [ShellComponent, SelectComponent, NzInputModule]
})
export class SharedModule {}
