import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { NzLayoutModule } from 'ng-zorro-antd/layout'
import { NzAvatarModule } from 'ng-zorro-antd/avatar'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzMenuModule } from 'ng-zorro-antd/menu'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'

import {
  ShellComponent,
  HeaderComponent,
  SelectComponent,
  LanguageSwitcherComponent
} from './components'

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    SelectComponent,
    LanguageSwitcherComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    NzLayoutModule,
    NzAvatarModule,
    NzIconModule,
    RouterModule,
    NzMenuModule,
    NzSelectModule,
    FontAwesomeModule
  ],
  exports: [
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    TranslateModule,
    ShellComponent,
    SelectComponent,
    NzInputModule,
    NzInputNumberModule,
    HeaderComponent,
    LanguageSwitcherComponent,
    FontAwesomeModule,
    NzButtonModule
  ]
})
export class SharedModule {}
