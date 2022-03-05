import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { SettingsComponent } from './settings.component'
import {
  ExerciseDetailComponent,
  ExercisesComponent,
  SettingsTabsComponent,
  TagsComponent,
  PrEntryComponent
} from './components'
import { SettingsRoutingModule } from './settings-routing.module'

@NgModule({
  declarations: [
    SettingsComponent,
    SettingsTabsComponent,
    ExercisesComponent,
    ExerciseDetailComponent,
    TagsComponent,
    PrEntryComponent
  ],
  imports: [CommonModule, SharedModule, SettingsRoutingModule, FormsModule],
  exports: []
})
export class SettingsModule {}
