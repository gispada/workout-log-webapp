import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SharedModule } from '@shared/shared.module'
import { SettingsRoutingModule } from './settings-routing.module'
import { SettingsTabsComponent, TagsComponent } from './components'

@NgModule({
  declarations: [SettingsTabsComponent, TagsComponent],
  imports: [CommonModule, SharedModule, SettingsRoutingModule],
  exports: []
})
export class SettingsModule {}
