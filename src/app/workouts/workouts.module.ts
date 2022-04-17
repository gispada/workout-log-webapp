import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { SharedModule } from '@shared/shared.module'
import { WorkoutsRoutingModule } from './workouts-routing.module'
import { AppWorkoutsComponent } from './workouts.component'
import {
  WorkoutsListComponent,
  WorkoutCardComponent,
  WorkoutDetailComponent,
  SetInfoComponent,
  ExerciseEntryComponent
} from './components'

@NgModule({
  declarations: [
    AppWorkoutsComponent,
    WorkoutsListComponent,
    WorkoutCardComponent,
    WorkoutDetailComponent,
    ExerciseEntryComponent,
    SetInfoComponent
  ],
  imports: [CommonModule, SharedModule, WorkoutsRoutingModule, FormsModule],
  exports: []
})
export class WorkoutsModule {}
