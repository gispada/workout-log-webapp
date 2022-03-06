import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { SettingsRoutingModule } from './exercises-routing.module'
import { AppExercisesComponent } from './exercises.component'
import {
  ExerciseDetailComponent,
  ExercisesListComponent,
  PersonalRecordEntryComponent,
  PersonalRecordsComponent
} from './components'

@NgModule({
  declarations: [
    AppExercisesComponent,
    ExercisesListComponent,
    ExerciseDetailComponent,
    PersonalRecordsComponent,
    PersonalRecordEntryComponent
  ],
  imports: [CommonModule, SharedModule, SettingsRoutingModule, FormsModule],
  exports: []
})
export class ExercisesModule {}
