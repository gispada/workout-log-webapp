import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { FormsModule } from '@angular/forms'
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
import { NzSpinModule } from 'ng-zorro-antd/spin'
import { NzDropDownModule } from 'ng-zorro-antd/dropdown'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { NzGridModule } from 'ng-zorro-antd/grid'

import {
  ShellComponent,
  HeaderComponent,
  SelectComponent,
  LanguageSwitcherComponent,
  UserDropdownComponent,
  TableComponent,
  CardComponent,
  TagComponent,
  PageHeaderComponent,
  FormItemBlockComponent
} from './components'

@NgModule({
  declarations: [
    ShellComponent,
    HeaderComponent,
    SelectComponent,
    LanguageSwitcherComponent,
    UserDropdownComponent,
    TableComponent,
    CardComponent,
    TagComponent,
    PageHeaderComponent,
    FormItemBlockComponent
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
    FontAwesomeModule,
    NzSpinModule,
    NzDropDownModule,
    NzTableModule
  ],
  exports: [
    NzFormModule,
    TranslateModule,
    ShellComponent,
    SelectComponent,
    NzInputModule,
    NzInputNumberModule,
    HeaderComponent,
    LanguageSwitcherComponent,
    FontAwesomeModule,
    NzButtonModule,
    TableComponent,
    CardComponent,
    TagComponent,
    NzTabsModule,
    PageHeaderComponent,
    NzToolTipModule,
    NzGridModule,
    FormItemBlockComponent
  ]
})
export class SharedModule {}
