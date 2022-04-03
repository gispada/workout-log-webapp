import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { SettingsRoutingModule } from './settings-routing.module'
import {
  ProfileComponent,
  SettingsTabsComponent,
  TagEditModalComponent,
  TagsComponent
} from './components'

@NgModule({
  declarations: [
    SettingsTabsComponent,
    TagsComponent,
    ProfileComponent,
    TagEditModalComponent
  ],
  imports: [CommonModule, SharedModule, SettingsRoutingModule, FormsModule],
  exports: []
})
export class SettingsModule {}
